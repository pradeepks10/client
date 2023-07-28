import React,{useState, useEffect} from 'react';

import {AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/Socio_blog.png';
import {Link, useHistory, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    // this will provide current api end point
    const location = useLocation();

///here we define a state which will store user info from local storage
const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

// console.log(user);

//for refreshing user data which has stored in local storage after sign in or sign up 
// this will done when user log in means user will go from log in page to home page
// means location change
//so this useEffect will trigered if location changes
useEffect(() =>{
     const token = user?.token;
    ///if token expires then logout the user
    if(token){
        const decodedToken = jwt_decode(token);
        if(decodedToken.exp * 1000 < new Date().getTime()){
            logout();
        } 

    }
    setUser(JSON.parse(localStorage.getItem('profile')));
},[location]);

//logout fn
const logout = () => {
    dispatch({type:'LOGOUT'});
    setUser(null);
    history.push('/');
   
}



    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
                <div className={classes.brandContainer}>
                <img  className={classes.image} src ={memories} alt='memories' height='60' />
                    <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Socio-BLOG</Typography>
                    
                </div>  
                <Toolbar>
                    {/* if user is login so his/her profile otherwise login option */}
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                       <Button component={Link} to="/auth" varinat="contained" color="primary">Sign In</Button> 
                    )}
                </Toolbar>   
         </AppBar>
    );
}

export default Navbar;
