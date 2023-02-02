// import Axios from 'axios';
import * as api from '../api';
import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE ,START_LOADING,END_LOADING} from '../constants/actionTypes';

///action creators

////for single post fetching
export const getPost = (id) => async(dispatch) =>{
    try {
        //dispatch action for loading
        dispatch({type: START_LOADING});
        //fetching data by calling backend using api for specific page
        const {data} = await api.fetchPost(id);
        // console.log(data);
        //create an action for fetching with payload
        const action = {type:FETCH_POST, payload:data}

        //this will dispatch action tha created above and store data to react state
        //by doing this , we can get fetched data in other components using react useSelector
        dispatch(action);

         //dispatch action for end loading
         dispatch({type: END_LOADING});

    } catch (error) {
       console.log(error.message); 
    }
   
}




////// for getting data from backend(or from url)
export const getPosts = (page) => async(dispatch) =>{
    try {
        //dispatch action for loading
        dispatch({type: START_LOADING});
        //fetching data by calling backend using api for specific page
        const {data} = await api.fetchPosts(page);
        // console.log(data);
        //create an action for fetching with payload
        const action = {type:FETCH_ALL, payload:data}

        //this will dispatch action tha created above and store data to react state
        //by doing this , we can get fetched data in other components using react useSelector
        dispatch(action);

         //dispatch action for end loading
         dispatch({type: END_LOADING});

    } catch (error) {
       console.log(error.message); 
    }
   
}

//get Post by search
export const getPostBySearch = (searchQuery) => async(dispatch) =>{
    try {

        dispatch({type: START_LOADING});

        const {data:{data}} = await api.fetchPostsBySearch(searchQuery);
        console.log(data);
       //create an action for fetching by serach  with payload
       const action = {type:FETCH_BY_SEARCH, payload:data}
       dispatch(action);

       dispatch({type: END_LOADING});

    } catch (error) {
       console.log(error); 
    }
}

/// for posting data to backend(or at url)

export const createPost = (post) => async(dispatch) => {
    try {
        //sending data to backend  using api.create fn
        const {data} = await api.createPost(post);
        //create an action for data which we return after posting data to backend 
        const action = {type:CREATE, payload:data}
        //this will dispatch action tha created above and store data to react state
        //by doing this , we can get fetched data in other components using react useSelector
        dispatch(action);
    } catch (error) {
        console.log(error.message);  
    }
}

//// for updating post

export const updatePost =(id,updatedPost) => async(dispatch) =>{
    try {
        // caling updatepost using api
        const {data} = await api.updatePost(id,updatedPost);
        //creating action
        const action ={type:UPDATE, payload:data}
        //dispatch action
        dispatch(action);
    } catch (error) {
        console.log(error.message);  
    }
}

//deleing post 

export const deletePost =(id) => async(dispatch) =>{
    try {
        // caling deletepost using api
        await api.deletePost(id);
        //creating action
        const action ={type:DELETE, payload:id}
        //dispatch action
        dispatch(action);
    } catch (error) {
        console.log(error);  
    }
}

// like post
export const likePost =(id) => async(dispatch) =>{
    try {
        // caling updatepost using api
        const {data} = await api.likePost(id);
        //creating action
        const action ={type:LIKE, payload:data}
        //dispatch action
        dispatch(action);
    } catch (error) {
        console.log(error);  
    }
}