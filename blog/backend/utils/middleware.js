const User = require("../models/user");
const logger = require("./logger");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request, response, next) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.startsWith("Bearer ")) {
		return authorization.replace("Bearer ", "");
	}
	return null;
};

const requestLogger = (request, response, next) => {
	logger.info("Method:", request.method);
	logger.info("Path:  ", request.path);
	logger.info("Body:  ", request.body);
	logger.info("---");
	next();
};

const userExtractor = async (request, response, next) => {
	const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
	console.log("decoded token", decodedToken);

	if (!decodedToken.id) {
		console.log("error encountered");
		return response.status(401).json({ error: "token invalid" });
	} else {
		console.log("this is fine");
		const user = await User.findById(decodedToken.id).populate("blogs");

		console.log("these is the returned user", user);
		return user;
	}
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
	logger.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	} else if (error.name === "JsonWebTokenError") {
		return response.status(401).json({ error: error.message });
	}

	next(error);
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	getTokenFrom,
	userExtractor,
};
