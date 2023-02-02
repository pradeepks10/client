import React ,{useState, useEffect} from "react";
import { TextField,Button,Typography, Paper } from "@material-ui/core";

import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useDispatch, useSelector  } from "react-redux";
import { createPost,updatePost } from "../../actions/posts";
import { useHistory } from "react-router-dom";





 const Form = ({currentId,setCurrentId}) => {

    // crating state which handle post data which user type in form
    const [postData, setPostData] = useState({ title:'', message:'', tags:'', selectedFile:''});

    //fetching data of post with id currentId . this data will use when  
    const post = useSelector((state) => currentId ?state.posts.posts.find((p) => p._id === currentId) : null);  


    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    ///if post is not null it means we want to update post, so fill the form with preve post data i.e post
    useEffect(() =>{
      if(post) setPostData(post);
    },[post]);

    const clear =()=> {
      setCurrentId(null);
      setPostData({ title:'', message:'', tags:'', selectedFile:''});
 }


    const handleSubmit = (e) =>{
       ///createPost action dispatch in this because createPost action req. when user submit form
       e.preventDefault();
      //if currentId is not null dispatching createPost with form data i.e postData otherwise updatePost
      if(currentId)
         dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
      else{
         dispatch(createPost({...postData, name: user?.result?.name}));
         history.push("/");
      }
         clear();
    }

    //
    
    if(!user?.result?.name) {
      // console.log(user);
      return (
         <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
               Please Sign in
            </Typography>
         </Paper>
      )
    }

    
    return (
       <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`$(classes.root) $(classes.form)`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ?'Editing':'Creating'} a Memory</Typography>
                  {/* <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({...postData,creator: e.target.value})} /> */}
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData,title: e.target.value})} />
                <TextField  name="message" variant="outlined" label="Message"  fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({...postData,message: e.target.value})} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData,tags: e.target.value.split(',')})} />
                
                <div className={classes.fileInput}>
                    {/* this will allow us to take file as input and convert it as string */}
                    <FileBase type= "file" multiple={false} onDone = {({base64}) => setPostData({...postData,selectedFile:base64})} />
                </div> 
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
              

            </form>
       </Paper>
    );
 }
 
 export default Form;