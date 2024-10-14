const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  console.log('received a request to add a post')
  const body = request.body;

  const user = await helper.userExtractor(request);

  console.log("users", user);

  const blog = new Blog({
    title: body.title,
    user: user._id,
    url: body.url,
    likes: body.likes,
  });

  try {
    const savedBlog = await blog.save();
    console.log(savedBlog);
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.delete("/:id", async (request, response) => {
  console.log("got delete request");

  const user = await helper.userExtractor(request);
  console.log(user);

  const blog = await Blog.findById(request.params.id);
  console.log(blog);

  console.log("first", user._id.toString());
  console.log("second", blog.user.toString());

  if (user._id.toString() === blog.user.toString()) {
    console.log("it's a match!");
    const deletedBlog = await Blog.findByIdAndRemove(
      request.params.id
    ).populate("user", { username: 1, name: 1 });
    console.log(deletedBlog);
    response.status(200).json(deletedBlog);
  } else {
    response.status(402).json({
      error: "invalid attempt; logged in user does not have authorization",
    });
  }
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  console.log("req.body", request.body);
  console.log("req.params", request.params);
  const updatedLikes = {
    likes: request.body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedLikes
  ).populate("user", { username: 1, name: 1 });
  console.log(updatedBlog);
  response.status(204).json(updatedBlog);
});

module.exports = blogRouter;
