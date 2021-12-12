import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";

class Login extends React.Component {
    state = {
        username: "",
        password: ""
    }
    usernameHandler = (event) => {
        this.setState({username: event.target.value})
    }
    passwordHandler = (event) => {
        this.setState({password: event.target.value})
    }

    loginButton = () => {
        const user = {username : this.state.username, password :this.state.password}
        axios.get("http://localhost:8989/user/sign-in", {params:user}).then((response) => {
           if(response.data === 'INVALID_PASSWORD'){
               alert("Password is incorrect");
           } else if(response.data === 'INVALID_USER'){
               alert("Username does not exist");
           } else if(response.data === 'USER_BLOCKED'){
            alert(`The account ${this.state.username} was blocked\nPlease contact the system manager`);
           }else if(response.data === 'SERVER_ERROR'){
               alert("Internal server error\nPlease try again later");
           }else{
               const token = response.data;
               const cookies = new Cookies();
               cookies.set("logged_in", response.data);
               this.props.setLoggedin(token)
           }
        }).catch(error => {
            alert("Internal server error\nPlease try again later");
        })
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <div>
                    <label> Username: <input type={"text"} value={this.state.username} onChange={this.usernameHandler} /></label>
                </div>
                <div>
                    <label> Password: <input type={"password"} value={this.state.password} onChange={this.passwordHandler} /></label>
                </div>

                <button style={{backgroundColor:'lightgreen'}} onClick={this.loginButton}>Login</button>
                <br/>
                <button onClick={this.props.switchToRegister}>Switch to Register page</button>
            </div>
        )
    }
}

export default Login;