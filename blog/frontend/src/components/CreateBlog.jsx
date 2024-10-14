import { useState } from "react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const addBlog = (e) => {
    e.preventDefault;
    const content = e.target.value
    console.log(content)
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title"> Title </label> <br></br>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author"> Author </label> <br></br>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url"> URL </label> <br></br>
          <input
            type="text"
            id="url"
            name="url"
            value={url}
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit" id="blogsubmit">
            Create new blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
