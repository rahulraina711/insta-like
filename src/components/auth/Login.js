import axios from 'axios';
import React , {useContext, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../context/UsesrContext';
import domain from '../../util/domain';
import "./AuthForm.scss"

function Login(){

    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const history = useHistory();
    const {getUser} = useContext(UserContext);

    async function login(e){
        e.preventDefault();

        const loginData = {
            email: formEmail,
            password: formPassword
        }

        await axios.post(domain+"/user/login", loginData);
        await getUser();
        history.push("/");

    }

    return <div className="auth-form">
        <h2>Login</h2>
        <form className="form" onSubmit={login}>
            <input type="email" placeholder="   enter your email here" value={formEmail} onChange={(e)=> setFormEmail(e.target.value)}/>
            <input type="test" placeholder="   enter password" value={formPassword} onChange={(e)=> setFormPassword(e.target.value)}/>
            <button type="submit">Log In</button>
        </form>
        <p>Don't have an account ? <Link to="/register">Sign UP Instead</Link> </p>
    </div>
}

export default Login