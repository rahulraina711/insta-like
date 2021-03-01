import axios from 'axios';
import React , {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import domain from '../../util/domain';
import Error from '../Error/Error'
import "./AuthForm.scss";

function Register(){

    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [errorMessage, setErrorMessage]= useState(null);
    const history = useHistory();

    async function register(e){
        e.preventDefault();

        const registerData = {
            email: formEmail,
            password: formPassword
        }

       try{ await axios.post(domain+"/user/signup", registerData);}
       catch(err){
        if(err.response){
            if(err.response.data.message){
                setErrorMessage(err.response.data.message)
            }
        }
        return console.log({err})
    };
        history.push("/login");
    }

    return <div className="auth-form">
        <h2>Register</h2>
        {errorMessage && <Error message={errorMessage} clear={()=>setErrorMessage(null)} />}
        <form className="form" onSubmit={register}>
            <input type="email" placeholder="enter your email here" value={formEmail} onChange={(e)=> setFormEmail(e.target.value)}/>
            <input type="password" placeholder="set a password" value={formPassword} onChange={(e)=> setFormPassword(e.target.value)}/>
            <button className="btn-action" type="submit">Register</button>
        </form>
        <p>Already Have an account ? <Link to="/login">Login here</Link> </p>
    </div>
}

export default Register;