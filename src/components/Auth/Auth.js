import React, { useState } from 'react';
import axios from 'axios';

import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles';
import {useDispatch}  from 'react-redux';
import { useHistory } from 'react-router-dom';

//import actions
import {signup,signin} from '../../actions/auth'

///for goggle authentication
// import { GoogleLogin} from 'react-google-login';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

import jwt_decode from 'jwt-decode';
import Input from './Input';
// import Icon from './icon';


///initial state for formData
const initialState = {firstName:'', lastName:'', email:'', password:'',confirmPassword:''};

const Auth = () => { 
    const classes = useStyles();
    const history = useHistory();

    //state for showing password
    const [showPassword,setShowPassword] = useState(false);
    // state for isSignup 
    const [isSignup,setisSignup] = useState(false);
    //state for form data
    const [formData,setFormData] = useState(initialState);

    const dispatch = useDispatch();

    // const state = null;
   

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData,history));
        } else {
            dispatch(signin(formData,history));
        }
        
    };
    const handleChange =(e) => {
        setFormData({...formData,[e.target.name]: e.target.value})
    }
    const handleShowPassword= () =>{
        setShowPassword((prev) => !prev);
    }
    const switchMode= () =>{
       setisSignup((prevIsSignup) => !prevIsSignup);
       setShowPassword(false);
    }

    // const login = useGoogleLogin({
    //     onSuccess: tokenResponse =>  try {
    //         dispatch({type: 'AUTH', data:{result,token}});
    //         history.push('/');
    //     } catch (error) {
    //         console.log(error);
    //     },
    //   });

    // const googleSuccess = async(res) =>{
       
    //     const result =jwt_decode(res?.credential);
    //     console.log(result);
    //     try {
    //         dispatch({type:'AUTH', data:{result}});
    //         history.push('/');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const googleFailure = (error)=> {

    //     console.log("google sign in is fail")
    //     console.log(error);
    // }
    

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? "Sign Up" :"Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half></Input>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half></Input>
                                </>
                            ) 
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                      {/* google login button */}
                    {/* <GoogleLogin 
                        clientId="150474296342-jb7gajiorhbfpjqelbko6e1rha6dlfu8.apps.googleusercontent.com"
                        render={ (renderProps) => (
                                <Button
                                    className={classes.googleButton}
                                    color="primary"
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                    variant="contained"
                                >
                                Goggle Sign In
                                </Button>
                             ) }
                        onSuccess ={googleSuccess}
                        onFailure ={googleFailure} 
                        cookiePolicy="single_host_origin"    
                     /> */}
                     {/* <GoogleLogin
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                        /> */}

                        {/* <Button onClick={() => login()}>
                        Sign in with Google 🚀{' '}
                        </Button>; */}
                    <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button onClick={switchMode}>{isSignup ? "Already have an account? Sign In": "Don't have an account? Sign Up"}</Button>
                            </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;

