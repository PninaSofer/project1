import * as React from "react";
import axios from "axios";

class Register extends React.Component {
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

    validateUsername = (phoneNumber) => {
        const phoneNumberPrefixes = ['054', '052', '050', '055', '053', '058'];
        if (phoneNumber.length !== 10) {
            alert("Username must contain exactly 10 digits")
            return false; // to stop
        }

        let prefixValidated = false;
        for(const prefix of phoneNumberPrefixes){
            if(phoneNumber.startsWith(prefix)){
                prefixValidated = true;
            }
        }
        if(prefixValidated == false){
            alert("Phone number must have a valid prefix\n For example: 052, 054...")
            return false;
        }
        for (let i = 0; i<phoneNumber.length ; i++){
            const digit = phoneNumber.charAt(i) //digit is a char from "phoneNumber" variable
            if(!Number.isInteger(parseInt(digit))) { //if d isn't integer, it equal to 'true' and show alert
                alert("Username must contain digits")
                return false
            }
        }
        return true;
    }

    validatePassword = (password) => {
        if(password.length < 6){
            alert("Password must have at least 6 characters")
            return false;
        }

        let hasLetter = false;
        let hasDigit = false;
        for (let i = 0; i<password.length ; i++){
            const charCode = password.charCodeAt(i);
            if(charCode >= 48 && charCode <= 57){
                hasDigit = true;
            } else if(charCode >= 65 && charCode <= 90){
                hasLetter = true;
            }else if(charCode >= 97 && charCode <= 122){
                hasLetter = true;
            }
        }
        if(hasLetter === false){
            alert('Password must contain letters');
            return false;
        }
        if(hasDigit === false){
            alert('Password must contain digits');
            return false;
        }
        return true;   
    }
    registerButton = () => {
        if(this.validateUsername(this.state.username) === false){
            return;
        }
        if(this.validatePassword(this.state.password) === false){
            return;
        }

        const user = {username : this.state.username, password :this.state.password}
        axios.get("http://localhost:8989/user/add", {params:user}).then((response) => {
           if(response.data === false){
               alert('Username already exist');
           }else{
               this.setState({username: '', password: ''});
           }
        }).catch(error => {
            alert("Internal server error\nPlease try again later");

        })
    }

    render() {
        return (
            <div>
                <h2>Register</h2>
                <div>
                    <label> Username: <input type={"text"} value={this.state.username} onChange={this.usernameHandler} /></label>
                </div>
                <div>
                    <label> Password: <input type={"password"} value={this.state.password} onChange={this.passwordHandler} /></label>
                </div>
                <button style={{backgroundColor:'lightgreen'}} onClick={this.registerButton}>Register</button>
                <br/>
                <button onClick={this.props.switchToLogin}>Switch to Login page</button>
            </div>
        )
    }
}

export default Register;