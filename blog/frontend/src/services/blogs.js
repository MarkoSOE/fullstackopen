import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";
let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const getAll = async () => {
	const request = await axios.get(baseUrl);
	return request.data;
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.post(baseUrl, newObject, config);

	return response.data;
};

const update = async (blogid, updateObject) => {
	const response = await axios.put(`${baseUrl}/${blogid}`, updateObject);
	return response.data;
};

const deleteBlog = async (blogid) => {
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.delete(`${baseUrl}/${blogid}`, config);
	return response.data;
};

export default { getAll, setToken, create, update, deleteBlog };
