import React from "react";

const Login = (props) => {
    return (
    <div className="Login-container">
        <h1 className="connected-message">ยินดีต้อนรับ</h1>
        <button className="connect" onClick = {props.connectWallet}>กระเป๋าตัง</button>
    </div>
    )
};

export default Login;