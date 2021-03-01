import axios from "axios";
import React, { useContext, useState } from "react";
import { Link , useHistory} from "react-router-dom";
import UserContext from "../../context/UsesrContext";
import domain from "../../util/domain";
import logo from "./static/logo.png";
import "./navbar.scss";

function Navbar(){
    // useContext to get a logged in user
    const{user} = useContext(UserContext);
    const [logOut, setLogout]= useState("Log Out");
    const history = useHistory();    

    async function logout(){
        await axios.get(domain+"/user/loggedOut");
        setLogout("")
        history.push("/login");
        
    };
    
    return (
    <div className="navbar">
        <div className="logo"><a href="/">
            <img src={logo} width="30%" height="30%" alt="Logo"/>
        </a></div>
        
        {!user ? (<div className="auths">
            
                
                <Link className="link" to="/login">
                    <h2>Login</h2>
                </Link>
                <Link className="link"to="/register">
                    <h2>Register</h2>
                </Link>
            
            
        </div>):( <button className="link" onClick={logout} style={{color: "red",cursor:"pointer"}}>{logOut}</button>)}
                
    </div>
    );
}

export default Navbar;