import axios from 'axios';
import React , {useContext, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../context/UsesrContext';
import Error from '../Error/Error';
import domain from '../../util/domain'
import "./AuthForm.scss"

function Login(){

    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const history = useHistory();
    const {getUser} = useContext(UserContext);
    const [errorMessage, setErrorMessage]= useState(null);

    async function login(e){
        e.preventDefault();

        const loginData = {
            email: formEmail,
            password: formPassword
        }

        try 
        {await axios.post(domain+"/user/login", loginData)}
        catch(err){
            if(err.response){
                if(err.response.data.message){
                    setErrorMessage(err.response.data.message)
                }
            }
            return console.log({err})
        };
        await getUser();
        history.push("/");

    }

    return <div className="auth-form">
        <h2>Login</h2>
        {errorMessage && <Error message={errorMessage} clear={()=>setErrorMessage(null)} />}
        <form className="form" onSubmit={login}>
            <input type="email" placeholder="enter your email here" value={formEmail} onChange={(e)=> setFormEmail(e.target.value)}/>
            <input type="password" placeholder="enter password" value={formPassword} onChange={(e)=> setFormPassword(e.target.value)}/>
            <button className="btn-action" type="submit">Log In</button>
        </form>
        <p>Don't have an account ? <Link to="/register">Sign up here !</Link> </p>
    </div>
}

export default Login