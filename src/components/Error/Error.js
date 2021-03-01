import React from 'react';
import './error.scss';

function Error(props){
    return <div className="msg-error">
        {props.message} <button onClick={props.clear}>Clear</button>
    </div>
}

export default Error