import React from 'react';

import {Container} from '@material-ui/core';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
   
    ///this is used to check is any user is log in or not
    const user = JSON.parse(localStorage.getItem('profile'));


    return (
    //browserRouter will help us to route globally
<GoogleOAuthProvider clientId="150474296342-jb7gajiorhbfpjqelbko6e1rha6dlfu8.apps.googleusercontent.com">
    <BrowserRouter>
        <Container maxWidth='lg'>
            <Navbar />
            <Switch>
                <Route path="/" exact component={ () => <Redirect to="/posts" />} />
                <Route path="/posts" exact component={Home} />
                <Route path="/posts/search" exact component={Home} />
                <Route path="/posts/:id" exact component={PostDetails} />
                <Route path="/auth" exact component={() => (!user ? <Auth />:<Redirect to='/posts' />)} />
            </Switch>
       </Container>
    </BrowserRouter>  
</GoogleOAuthProvider> 
    );
}

export default App;
