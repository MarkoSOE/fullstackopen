import { createStore } from "redux";
import Blog from "../components/Blog";
import blogService from "../services/blogs"
import { useState } from "react";

const initialState = {
  user: null,
  users: [],
  blogs: []
}

//blogReducer setup 
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BLOG":
      return { ...state, blogs: action.payload.blogs }
    default:
      return state
  }
}

//actions 
export const setBlog = (blogs) => {
  return {
    type: 'SET_BLOG',
    payload: { blogs }
  }
}


export default blogReducer
