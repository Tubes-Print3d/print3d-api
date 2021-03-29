const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// membaca env variabel
const SALT = Number(process.env.SALT);
const { JWT_KEY } = process.env;

const register = (Pengguna) => async (data) => {
  // generate password yang sudah di hash
  const hashedPassword = await bcrypt.hash(data.password, SALT).catch((err) => {
    console.error("bcrypt hash error: ", err);
  });

  // pengguna adalah entitas dari model Pengguna
  const pengguna = new Pengguna({
    ...data,
    password: hashedPassword,
  });

  // .save akan menyimpan data ke dalam database
  const penggunaBaru = await pengguna.save();

  // generate token untuk pengguna baru tersebut
  const token = jwt.sign(
    {
      // datanya kita ambil cuma id saja
      data: penggunaBaru._id,
      // token ini akan expired dalam waktu 60*15 detik = 15 menit
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
    },
    JWT_KEY
  );

  return token;
};

module.exports = (model) => ({
  register: register(model),
});
