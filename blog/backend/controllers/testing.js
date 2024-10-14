const testingRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

testingRouter.post("/reset", async (request, response) => {
	await Blog.deleteMany({});
	await User.deleteMany({});

	response.status(204).end();
});

testingRouter.delete("/:id", async (request, response) => {
	const user = await helper.userExtractor(request);

	const blog = await Blog.findById(request.params.id);

	if (user._id.toString() === blog.user.toString()) {
		console.log("it's a match!");
		const deletedBlog = await Blog.findByIdAndRemove(
			request.params.id
		).populate("user", { username: 1, name: 1 });
		console.log(deletedBlog);
		response.status(200).json(deletedBlog);
	} else {
		response.status(400).json({
			error: "invalid attempt; logged in user does not have authorization",
		});
	}
	response.status(204).end();
});

module.exports = testingRouter;
