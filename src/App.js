import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import Cookies from "universal-cookie";

import Login from "./components/Login";
import Register from "./components/Register";
import MessageList from "./components/MessageList";
import CreateMessage from './components/CreateMessage';
import NavigationBar from "./components/NavigationBar";
import "./App.css";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    token: "",
    showRegister: false
  };

  componentDidMount() {
    const cookies = new Cookies();
    if (cookies.get("logged_in")) {
        this.setState({
            isLoggedIn: true,
            token : cookies.get("logged_in")
        })
    }
  }
  
  setLoggedin = (token) => {
    this.setState({ isLoggedIn: true, token });
  };
  setLogout = () => {
    this.setState({ isLoggedIn: false });
  };

  logout = () => {
		const cookies = new Cookies();
    cookies.remove("logged_in");
    window.location.reload();
	}

  switchToRegister = () => {
    this.setState({ showRegister: true });
  }
  switchToLogin = () => {
    this.setState({ showRegister: false });
  }
  render() {
    return (
      <div>
        <BrowserRouter>
        {!this.state.isLoggedIn && (
        this.state.showRegister === false ?
            <Login setLoggedin={this.setLoggedin} switchToRegister={this.switchToRegister} />
            :
            <Register switchToLogin={this.switchToLogin}/>
        )}
        {this.state.isLoggedIn && (
          <>
            <NavigationBar logout ={this.logout}/>
            <Route path={"/"} component={MessageList} exact={true}/>
            <Route path={"/create-message"} component={CreateMessage} exact={true}/>
          </>
        )}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
