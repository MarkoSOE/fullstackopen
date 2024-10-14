import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";
import userEvent from "@testing-library/user-event";
import Togglable from "../components/Togglable";
import CreateBlog from "../components/CreateBlog";

test("renders blog", () => {
	const blog = {
		title: "testing title",
		user: {
			username: "testing author",
		},
		url: "testing",
		likes: 0,
	};

	const { container } = render(<Blog blog={blog} />);

	const titleDiv = container.querySelector(".blogTitle");
	const authorDiv = container.querySelector(".blogAuthor");
	const urlDiv = container.querySelector(".blogURL");
	const likesDiv = container.querySelector(".blogLikes");

	expect(titleDiv).toHaveTextContent("testing title");
	expect(authorDiv).toHaveTextContent("testing author");
	expect(urlDiv).not.toHaveTextContent("");
	expect(likesDiv).not.toHaveTextContent("");
});

test("Checks the blog URL and number of likes are shown when the button contrilling the down details has been clicked", async () => {
	const blog = {
		title: "testing title",
		user: {
			username: "testing author",
		},
		url: "testing",
		likes: 0,
	};

	const { container } = render(<Blog blog={blog} />);

	const user = userEvent.setup();
	const button = screen.getByText("view");
	await user.click(button);

	const url = container.querySelector(".blogURL");
	const likes = container.querySelector(".blogLikes");

	expect(url).toHaveTextContent("testing");
	expect(likes).toHaveTextContent("0");
});

test("tests like button ", async () => {
	const blog = {
		title: "testing title",
		user: {
			username: "testing author",
		},
		url: "testing",
		likes: 0,
	};

	const mockHandler = jest.fn();

	const { container } = render(<Blog blog={blog} updateLikes={mockHandler} />);

	const user = userEvent.setup();
	const viewButton = screen.getByText("view");
	await user.click(viewButton);

	const likeButton = screen.getByText("Like");
	await user.click(likeButton);
	await user.click(likeButton);

	expect(mockHandler.mock.calls).toHaveLength(2);
});

test("CreateBlog updates parent state and calls onSubmit", async () => {
	const createBlog = jest.fn();
	const user = userEvent.setup();

	render(<CreateBlog createBlog={createBlog} />);

	const title = screen.getByPlaceholderText(/title/);
	const author = screen.getByPlaceholderText(/author/);
	const url = screen.getByPlaceholderText(/url/);
	const sendButton = screen.getByText("Create new blog");

	await user.type(title, "testing a form...");
	await user.type(author, "testing a form...");
	await user.type(url, "testing a form...");
	await user.click(sendButton);

	expect(createBlog.mock.calls).toHaveLength(1);
});

describe("<Toggleable />", () => {
	let container;

	beforeEach(() => {
		container = render(
			<Togglable buttonLabel="show ...">
				<div className="testDiv">TogglableContent</div>
			</Togglable>
		).container;
	});

	test("renders its children", async () => {
		await screen.findByText("TogglableContent");
	});
	test("at the start the units aren't rendered", async () => {
		const div = await container.querySelector(".togglableContent");
		expect(div).toHaveStyle("display: none");
	});
});
