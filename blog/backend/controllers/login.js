const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const user = require("../models/user");
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });

  if (user) {
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response.status(303).json({
        error: "invalid username or password",
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } else {
    response.status(304).send({ error: "unknown user" });
  }
});

module.exports = loginRouter;
