import * as api from '../api';
import { AUTH } from '../constants/actionTypes';


///for signin

export const signin = (formData,history) => async(dispatch) =>{
        try {
            const {data} = await api.signin(formData);

            dispatch({type:AUTH, payload:data});

            history.push('/');
        } catch (error) {
           alert("User Id or Password not match");
           console.log(error); 
        }
}


/// for signup
export const signup = (formData,history) => async(dispatch) =>{
    try {
        const {data} = await api.signup(formData);
         dispatch({type:AUTH, payload:data}); 
        history.push('/');
    } catch (error) {
       console.log(error); 
    }
}