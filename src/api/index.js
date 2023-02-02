import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000",
  });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        // console.log(localStorage.getItem('profile'));
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req; 
});

////
//this will fetch a single post data from backend and send to action
export const fetchPost = (id) => API.get(`/posts/${id}`);

//this will fetch all data from backend and send to action
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

//fetch post by search
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

//this will send  data from fronted  to backend(or at url)
export const createPost = (newPost) => API.post('/posts',newPost);

//this will update post at url like url/id
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost);

// this will call backend to delete a post
export const  deletePost = (id) => API.delete(`/posts/${id}`);
// like post
export const  likePost = (id) => API.patch(`/posts/${id}/likePost`);

//for signin
export const signin = (formData) => API.post('/user/signin', formData);

//for signup
export const signup = (formData) => API.post('/user/signup', formData);