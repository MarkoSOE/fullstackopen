import axios from "axios";
const baseUrl = "http://localhost:3003/api/login";

const login = async ({ username, password }) => {
	console.log("info", username, password);
	const request = await axios.post(baseUrl, { username, password });
	console.log(request.data);
	return request.data;
};

export default { login };
