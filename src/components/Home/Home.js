import React, {useState, useEffect} from "react";
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
import Posts from '../Posts/Posts.js';
import Form from '../Form/Form.js';
import Pagination from "../Pagination.jsx";

///using useLoaction we know that on which page is accessing
import { useHistory, useLocation } from "react-router-dom";
//it is special inpute which turn string as array of string  after each enter key press
import ChipInput from 'material-ui-chip-input';

//this allow to dispatch an action
import {useDispatch} from 'react-redux';

import {getPosts, getPostBySearch} from '../../actions/posts';

import useStyles from './styles';



function useQuery() {
    return new URLSearchParams(useLocation().search);
}



const Home = () => {

    const [currentId,setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();


    const query = useQuery();
    const history =useHistory();
    //this will find value of 'page' in URL
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery'); 

    //state for searchBy text
        const [search,setSearch] = useState("");

    //state for searchBy tags
        const [tags,setTags] = useState([]);

  
    ///serach fn
    const searchPost = () => {
        if(search.trim() || tags){
            ///dispatch search with object parameter that contain serach text and tags(tags are seperated by ,)
            dispatch(getPostBySearch({search, tags: tags.join(',')}));
            //after dispatching getPostBySearch fn we need to cahnge url in client side i.e in browser so push in history
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }
        else{
            history.push("/");
        }
    }

    /// this will call searchPost  fn if enter is pressed i.e keycode 13
    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            searchPost();
        }
        
    };

    


    ///this will add tag to  tags state  if user add new tag for serach
    const handleAdd = (tag) => setTags([...tags,tag]);
     ///this will delete tag from  tags state  if user delete a tag from serach
    const handleDelete = (tagDelete) => setTags(tags.filter((tag) => tag != tagDelete));
    return (
        <Grow in>
                <Container maxWidth="xl">
                    <Grid  container justifyContent="space-between" alignItems='stretch' spacing={3} className={classes.gridContainer}>
                        <Grid item xm={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xm={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField
                                    name= "search"
                                    variant="outlined"
                                    label="Search Memories"
                                    onKeyPress={handleKeyPress}
                                    fullWidth
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <ChipInput
                                    style={{margin: '10px 0'}}
                                    value={tags}
                                    label="Search Tags"
                                    variant="outlined"
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                />
                                {/* button for serach */}
                                <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">Search</Button>
                            </AppBar>
                            <Form  currentId={currentId} setCurrentId={setCurrentId}/>
                            { (!searchQuery && !tags.length) && (
                                <Paper elevation={6} className={classes.pagination}>
                                {/* pasing page as props to pagination 
                                so that we can render only specific posts */}
                                <Pagination page={page}/>
                            </Paper>
                            )}
                            
                        </Grid>

                    </Grid>
                </Container>
            </Grow>
    );
}

export default Home;




//////


// import React, { useState, useEffect } from 'react';
// import { Container, Grow, Grid,Paper,AppBar,TextField,Button } from '@material-ui/core';
// import { useDispatch } from 'react-redux';
// import { useHistory,useLocation } from 'react-router-dom';
// import ChipInput from 'material-ui-chip-input';
// import { getPosts } from '../../actions/posts';
// import Pagination from '../Pagination';
// import Posts from '../Posts/Posts';
// import Form from '../Form/Form';
//import { mergeClasses } from '@material-ui/styles';

// import React, {useState, useEffect} from "react";
// import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
// import Posts from '../Posts/Posts.js';
// import Form from '../Form/Form.js';
// import Pagination from "../Pagination.jsx";
// ///using useLoaction we know that on which page is accessing
// import { useHistory, useLocation } from "react-router-dom";
// //it is special inpute which turn string as array of string  after each enter key press
// import ChipInput from 'material-ui-chip-input';

// //this allow to dispatch an action
// import {useDispatch} from 'react-redux';

// import {getPosts, getPostBySearch} from '../../actions/posts';

// // import useStyles from './styles';



// import useStyles from './styles';
// function useQuery(){
//   return new URLSearchParams(useLocation().search);
// }


// const Home = () => {
//   const [currentId, setCurrentId] = useState(null);
//   const dispatch = useDispatch();
// const query=useQuery();
// const history=useHistory();
// const page=query.get('page')||1;
// const searchQuery=query.get("searchQuery");
// const classes=useStyles();  
// useEffect(() => {
//     dispatch(getPosts());
//   }, [currentId, dispatch]);

//   return (
//     <Grow in>
//       <Container maxWidth="xl">
//         <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
//           <Grid item xs={12} sm={6} md={9}>
//             <Posts setCurrentId={setCurrentId} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
           
//              <AppBar className={classes.appBarSearch} position="static" color="inherit">
//                <TextField
//                name="search"
//                variant="outlined"
//                label="Search Memories"
//                fullWidth
//                value="TEST"
//                onChange={()=>{}}
//                />
//              </AppBar>
//             <Form currentId={currentId} setCurrentId={setCurrentId} />
//            <Paper  elevation={6}>
//             <Pagination className={classes.pagination}/>
//            </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     </Grow>
//   );
// };

// export default Home;

/////////////shi///////
// import React, { useState, useEffect } from 'react';
// import { Container, Grow, Grid } from '@material-ui/core';
// import { useDispatch } from 'react-redux';

// import { getPosts } from '../../actions/posts';
// import Posts from '../Posts/Posts';
// import Form from '../Form/Form';

// const Home = () => {
//   const [currentId, setCurrentId] = useState(0);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getPosts());
//   }, [currentId, dispatch]);

//   return (
//     <Grow in>
//       <Container>
//         <Grid container justify="space-between" alignItems="stretch" spacing={3}>
//           <Grid item xs={12} sm={7}>
//             <Posts setCurrentId={setCurrentId} />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Form currentId={currentId} setCurrentId={setCurrentId} />
//           </Grid>
//         </Grid>
//       </Container>
//     </Grow>
//   );
// };

// export default Home;