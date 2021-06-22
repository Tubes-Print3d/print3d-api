const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { ResError } = require("../../utils/responser");

// membaca env variabel
const SALT = Number(process.env.SALT);
const { JWT_KEY } = process.env;

const createToken = (pengguna) => {
  const token = jwt.sign(
    {
      // datanya kita ambil cuma id saja
      data: pengguna._id,
      // token ini akan expired dalam waktu 60*15 detik = 15 menit
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
    },
    JWT_KEY
  );
  return token;
};

const register = (Pengguna) => async (data) => {
  // generate password yang sudah di hash
  const hashedPassword = await bcrypt.hash(data.password, SALT).catch((err) => {
    console.error("bcrypt hash error: ", err);
  });

  // pengguna adalah entitas dari model Pengguna
  const pengguna = new Pengguna({
    ...data,
    listAlamat: [data.alamat],
    password: hashedPassword,
  });

  // .save akan menyimpan data ke dalam database
  const penggunaBaru = await pengguna.save();

  if (pengguna.roles.includes(["pencetak"])) {
    penggunaBaru.alamatDefault = penggunaBaru.listAlamat[0]._id;
    penggunaBaru.lokasiPencetak = penggunaBaru.listAlamat[0]._id;
    await penggunaBaru.save();
  }
  // generate token untuk pengguna baru tersebut
  const token = createToken(penggunaBaru);
  const profil = await getProfile(Pengguna)(pengguna._id);
  return { ...profil, token };
};

const login = (Pengguna) => async (data) => {
  const pengguna = await Pengguna.findOne(
    { email: data.email },
    "password _id"
  ).exec();
  if (!pengguna) {
    return Promise.reject("Email atau password salah");
  }
  const match = await bcrypt.compare(data.password, pengguna.password);
  if (!match) {
    return Promise.reject("Email atau password salah");
  }
  const profil = await getProfile(Pengguna)(pengguna._id);
  return { ...profil, token: createToken(pengguna) };
};

const getProfile = (Pengguna) => async (idPengguna) => {
  const pengguna = await Pengguna.findById(idPengguna, "-password").exec();
  return pengguna.toObject();
};

const addRole = (Pengguna) => async (id, newRole) => {
  const pengguna = await Pengguna.findById(id, "roles").exec();
  if (pengguna.roles === undefined || !Array.isArray(pengguna.roles)) {
    pengguna.roles = [];
  }
  if (pengguna.roles.includes(newRole)) {
    return Promise.reject(
      ResError(`User is already a ${newRole}`, StatusCodes.CONFLICT)
    );
  }
  pengguna.roles.push(newRole);
  await pengguna.save();
};

const listCarts = (Pengguna, Produk) => async (id) => {
  const pengguna = await Pengguna.findById(id, "keranjang")
    .populate("keranjang", "nama pemilik")
    .exec();

  await Pengguna.populate(pengguna, {
    path: "keranjang.pemilik",
    select: "nama",
  });

  return pengguna.keranjang;
};

const addToCart = (Pengguna, Produk) => async (idPengguna, idProduk) => {
  const produk = await Produk.findById(idProduk, "nama pemilik")
    .populate("pemilik", "nama")
    .exec();

  if (!produk)
    return Promise.reject({
      status: StatusCodes.BAD_REQUEST,
      error: "Produk tidak valid",
    });

  const pengguna = await Pengguna.findById(idPengguna, "keranjang");

  if (pengguna.keranjang.includes(idProduk))
    return Promise.reject({
      status: StatusCodes.BAD_REQUEST,
      error: "Produk sudah ada dalam keranjang",
    });

  pengguna.keranjang.push(idProduk);
  await pengguna.save();

  return produk;
};

const removeFromCart = (Pengguna) => async (idPengguna, idProduk) => {
  const pengguna = await Pengguna.findById(idPengguna, "keranjang");

  const produkIndex = pengguna.keranjang.findIndex((v) => v == idProduk);
  if (produkIndex === -1)
    return Promise.reject({
      status: StatusCodes.NOT_FOUND,
      error: "Produk tidak ada dalam keranjang",
    });

  pengguna.keranjang.splice(produkIndex, 1);
  await pengguna.save();

  return idProduk;
};

module.exports = (Pengguna, Produk) => ({
  register: register(Pengguna),
  login: login(Pengguna),
  getProfile: getProfile(Pengguna),
  addRole: addRole(Pengguna),
  listCarts: listCarts(Pengguna, Produk),
  addToCart: addToCart(Pengguna, Produk),
  removeFromCart: removeFromCart(Pengguna),
});
