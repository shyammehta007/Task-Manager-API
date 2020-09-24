const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../src/app");
const { User } = require("../src/models/user");
const jwt = require("jsonwebtoken");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "shyam",
  email: "shyammehta210@gmail.com",
  password: "delete",
  tokens: [
    {
      token: jwt.sign(
        {
          _id: userOneId,
        },
        process.env.JWT_SECRET
      ),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Shoud sign up new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "shyam",
      email: "shyammeht@gmail.com",
      password: "Mypass",
    })
    .expect(201);
});

test("should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("should get profile data", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should delete account", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not delete account", async () => {
  await request(app).delete("/users/me").send().expect(401);
});
