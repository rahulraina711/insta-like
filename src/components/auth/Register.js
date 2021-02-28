import axios from 'axios';
import React , {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import domain from '../../util/domain';
import "./AuthForm.scss";

function Register(){

    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const history = useHistory();

    async function register(e){
        e.preventDefault();

        const registerData = {
            email: formEmail,
            password: formPassword
        }

        await axios.post(domain+"/user/signup", registerData);
        history.push("/login");
    }

    return <div className="auth-form">
        <h2>Register</h2>
        <form className="form" onSubmit={register}>
            <input type="email" placeholder="   enter your email here" value={formEmail} onChange={(e)=> setFormEmail(e.target.value)}/>
            <input type="text" placeholder="   set a password" value={formPassword} onChange={(e)=> setFormPassword(e.target.value)}/>
            <button type="submit">Register</button>
        </form>
        <p>Already Have an account ? <Link to="/login">login Instead</Link> </p>
    </div>
}

export default Register;