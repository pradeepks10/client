import React from "react";
import Post from "./Post/Post.js";
import useStyles from './styles';
import {Grid , CircularProgress} from '@material-ui/core'

//it is use to access react state data from any component
import { useSelector } from "react-redux";

const Posts = ({setCurrentId}) => {
    const classes = useStyles();
    //useSelector take a fn as parameter .this fn take state of react as parameter.
    //using this state we get required data 
    const {posts, isLoading} = useSelector((state) => state.posts );
    // console.log(posts);

    ///is no post and no loding
    if( !posts.length && !isLoading) return "NO Posts"

    return (
    // if loading then circularProgress otherwise posts 
       isLoading? <CircularProgress />:(
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {posts.map((post) => (
                        <Grid key={post._id} item xm={12} sm={12} md={6} lg={4}>
                                <Post post ={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))}
            </Grid>
       )
    );
}

export default Posts;