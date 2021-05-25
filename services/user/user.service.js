const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  penggunaBaru.alamatDefault = penggunaBaru.listAlamat[0]._id;
  penggunaBaru.lokasiPencetak = penggunaBaru.listAlamat[0]._id;
  await penggunaBaru.save();
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
    return Promise.reject("Wrong email or password");
  }
  const match = await bcrypt.compare(data.password, pengguna.password);
  if (!match) {
    return Promise.reject("Wrong email or password");
  }
  const profil = await getProfile(Pengguna)(pengguna._id);
  return { ...profil, token: createToken(pengguna) };
};

const getProfile = (Pengguna) => async (idPengguna) => {
  const pengguna = await Pengguna.findById(idPengguna, "-password").exec();
  return pengguna.toObject();
};

module.exports = (model) => ({
  register: register(model),
  login: login(model),
  getProfile: getProfile(model),
});
