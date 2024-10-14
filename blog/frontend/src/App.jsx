import { useState, useEffect, useInsertionEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import ErrorMessage from "./components/ErrorMessage";
import blogReducer, { setBlog } from "./reducers/blogReducer";

import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable";
import CreateBlog from "./components/CreateBlog";
import { useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";

const App = () => {

  const store = createStore(blogReducer)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const [loginVisible, setLoginVisible] = useState(false);

  const hideWhenVisible = { display: loginVisible ? "none" : "" };
  const showWhenVisible = { display: loginVisible ? "" : "none" };

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)


  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    console.log(loggedUser);
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      initialBlogs.sort((a, b) => b.likes - a.likes);
      //here we want to send the data to the store using Dispatch
      dispatch(setBlog(initialBlogs))
    });
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const newUser = await loginService.login({ username, password });
      localStorage.setItem("user", JSON.stringify(newUser));

      blogService.setToken(newUser.token);
      setUser(newUser);
      setUsername(newUser.username);
      setPassword(newUser.password);

      setUser(newUser);
      setUsername("");
      setPassword("");
    } catch (error) {
      //if login doesnt work - trigger error message
      setTimeout(() => {
      }, 5000);
    }
  };

  const handleLogout = () => {
    console.log("test");
    localStorage.removeItem("user");

    setMessage("Successfully logged out");
    setTimeout(() => {
      setMessage(null);
    }, 5000);

    setUser(null);
  };

  /*
  const createBlog = async (blogObject) => {
    try {
      console.log('there has been a request sent to create a blog')
      const newBlog = await blogService.create(blogObject);
      console.log(newBlog);
      setBlogs(blogs.concat(newBlog));
      setLoginVisible(false);
      setMessage('Success')
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setMessage("Failed to add blog");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const updateLikes = async (blogid) => {
    const updateObject = blogs.find((n) => n.id === blogid);
    const changedBlog = { ...updateObject, likes: updateObject.likes + 1 };

    await blogService.update(blogid, changedBlog);

    setBlogs(blogs.map((blog) => (blog.id !== blogid ? blog : changedBlog)));
    setMessage('Added like')
    setTimeout(() => {
      setMessage(null)
    }, 5000);

  };

  const deleteBlog = async (blog) => {
    console.log(blog);
    if (
      window.confirm(`Do you want to delete ${blog.title} by ${blog.user.name}`)
    ) {
      try {
        const deletedBlog = await blogService.deleteBlog(blog.id);
        setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id));
        setMessage("Successfully Deleted Blog")
        setTimeout(() => {
          setMessage(null)
        }, 5000);

      } catch (error) {
        setMessage(error.response.data.error);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    }
  };
  */
  return (
    <div>
      {message ? <ErrorMessage message={message} /> : <div> </div>}
      <div>
        <h2>Log in to application</h2>
        {user === null ? (
          <div>
            <div style={hideWhenVisible}>
              <button onClick={() => setLoginVisible(true)}>login</button>
            </div>
            <div style={showWhenVisible}>
              <LoginForm
                handleLogin={handleLogin}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
              />
              <button onClick={() => setLoginVisible(false)}> cancel </button>
            </div>
          </div>
        ) : (
          <div>
            <h2> {user.name} logged in </h2>
            <button onClick={() => handleLogout()}> Log out</button>
            <Togglable buttonLabel="new blog">
              <CreateBlog />
            </Togglable>
            {blogs.map((blog) => (
              <Blog
                blog={blog}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
