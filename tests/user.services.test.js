require("dotenv").config();
const mockingoose = require("mockingoose");
const userServices = require("../services/user/user.service");
const User = require("../models/pengguna/pengguna.model");
const bcrypt = require("bcrypt");

const SALT = Number(process.env.SALT);

describe("checking few things in login", () => {
  const UserMock = mockingoose(User);
  const realPassword = "jdoe3333";
  const fakeUser = {
    email: "johndoe@gmail.com",
    password: realPassword,
  };
  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash(fakeUser.password, SALT);
    fakeUser.password = hashedPassword;
  });

  beforeEach(() => {
    mockingoose.resetAll();
  });

  test("should able to login", async () => {
    const fakeUser = {
      email: "johndoe@gmail.com",
      password: "jdoe3333",
    };
    const hashedPassword = await bcrypt.hash(fakeUser.password, SALT);
    fakeUser.password = hashedPassword;
    UserMock.toReturn(fakeUser, "findOne");
    const result = await userServices(User).login({
      email: fakeUser.email,
      password: realPassword,
    });
    expect(result).toMatchObject({
      email: fakeUser.email,
      token: expect.any(String),
    });
  });

  test("should fail if email doesn't exists", () => {
    // findOne returns undefined because docs doesn't exist
    UserMock.toReturn(undefined, "findOne");

    try {
      expect(
        userServices(User).login({
          email: fakeUser.email,
          password: realPassword,
        })
      ).rejects.toMatch("Wrong email or password");
    } catch (error) {}
  });

  test("should fail if password is incorrect", () => {
    UserMock.toReturn(fakeUser, "findOne");

    try {
      expect(
        userServices(User).login({
          email: fakeUser.email,
          password: "incorrect password",
        })
      ).rejects.toMatch("Wrong email or password");
    } catch (error) {}
  });
});
