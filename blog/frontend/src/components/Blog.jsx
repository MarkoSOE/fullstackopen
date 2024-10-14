import { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const [contentsVisible, setContentsVisible] = useState(false);

  const hideWhenVisible = { display: contentsVisible ? "none" : "" };

  const showWhenVisible = { display: contentsVisible ? "" : "none" };

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const updateLikes = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.updateLikes(blogToUpdate)
    dispatch(setBlog(blogs.map(b => b.id === blog.id ? updatedBlog : b)))
    console.log(blogs)
  }

  const deleteBlog = async (blog) => {
    const deletedBlog = await blogService.deleteBlog(blog.id)
    dispatch(setBlog(blogs.filter((blog) => blog.id !== deletedBlog.id)))
  }

  return (
    <div
      key={blog.id}
      style={{
        border: "solid 1px black",
        padding: "5px",
        marginTop: "5px",
        marginBottom: "5px",
      }}
      className="blogPost"
    >
      <div>
        <div className="blogTitle" id="blogTitle">
          {blog.title}
        </div>
        <div className="blogAuthor" id="blogAuthor">
          {blog.user?.username}
        </div>
        <button
          onClick={() => setContentsVisible(!contentsVisible)}
          id="viewDetails"
        >
          view
        </button>
      </div>
      <div style={showWhenVisible}>
        <div className="blogURL">{blog.url}</div>
        <div className="blogLikes">
          Likes {blog.likes}
          <button id="likeButton" onClick={() => updateLikes(blog.id)}>
            Like
          </button>
          <div>
            <button id="removeButton" onClick={() => deleteBlog(blog)}>
              {" "}
              Remove{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
