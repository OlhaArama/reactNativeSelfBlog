import { getPosts, createPost, removePost, updatePost } from "../../db";
import { ADD_POST, DELETE_POST, LOAD_POSTS, TOGGLE_BOOKED } from "../types";
import * as FileSystem from "expo-file-system";

export const loadPosts = () => {
  return async dispatch => {
    const posts = await getPosts();

    dispatch({
      type: LOAD_POSTS,
      payload: posts || [],
    });
  };
};

export const toggleBooked = (post) => async dispatch => {
  await updatePost(post);

  return dispatch({
    type: TOGGLE_BOOKED,
    payload: post.id,
  });
};

export const deletePost = (id) => async dispatch => {
  await removePost(id);

  return dispatch({
    type: DELETE_POST,
    payload: id,
  });
};

export const addPost = post => async dispatch => {
  const fileName = post.img.split("/").pop();
  const newPath = FileSystem.documentDirectory + fileName;

  try {
    await FileSystem.moveAsync({
      to: newPath,
      from: post.img,
    })
    
  } catch (e) {
    console.log("Error:", e);
  }

  const payload = { ...post, img: newPath };
  const id = await createPost(payload);

  payload.id = id;
  
  dispatch({
    type: ADD_POST,
    payload,
  });
};
