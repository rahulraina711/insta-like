import axios from "axios";
import React, { useContext } from "react";
import { Link , useHistory} from "react-router-dom";
import UserContext from "../../context/UsesrContext";
import domain from "../../util/domain";
import "./navbar.scss";

function Navbar(){

    const{user} = useContext(UserContext);
    const history = useHistory();
    

    async function logout(){
        await axios.get(domain+"/user/loggedOut");
        history.push("/login");
        
    };
    
    return (
    <div className="navbar">
        <div className="logo"><a href="/">
            <h1>Home</h1>
        </a></div>
        
        {!user ? (<div className="auths">
            
                
                <Link to="/login">
                    <h2>Login</h2>
                </Link>
                <Link to="/register">
                    <h2>Register</h2>
                </Link>
            
            
        </div>):( <button onClick={logout} style={{color: "red",cursor:"pointer"}}>Log Out</button>)}
                
    </div>
    );
}

export default Navbar;