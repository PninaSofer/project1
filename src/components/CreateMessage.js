import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

class CreateMessage extends React.Component {
  state = {
    receiver: "",
    title: "",
    content: "",
    sendDate: "",
    isValidTitle: false,
    isValidContent: false,
    isValidReceiver: false,
  };

  receiverHandler = (event) => {
    this.setState({ receiver: event.target.value });
    if(event.target.value.length === 10){
      this.isValidReceiver(event.target.value);
    }else{
      this.setState({isValidReceiver: false})
    }
    
  };
  titleHandler = (event) => {
    const isValidTitle = event.target.value.length > 0;
    this.setState({ title: event.target.value, isValidTitle: isValidTitle });
  };

  contentHandler = (event) => {
    const isValidContent = event.target.value.length > 0;
    this.setState({ content: event.target.value, isValidContent: isValidContent });
  };

  isValidReceiver = (receiverNumber) => {
    const receiver = {username:receiverNumber}
    axios
      .get("http://localhost:8989/user/validate", { params: receiver })
      .then((response) => {
        console.log(response);
        if(response.data === true){
          this.setState({isValidReceiver: true})
        }else{
          this.setState({isValidReceiver: false})
        }
      })
  }

  createMessageButton = () => {
    // ISOString: 2021-12-05T20:17:00.1Z
    const dateArr = new Date().toISOString().split("T"); //['2021-12-05', '20:17:00.1Z']
    const dbDate = dateArr[0] + dateArr[1].split(".")[0];

    if(!this.state.isValidReceiver 
      || !this.state.isValidTitle
      || !this.state.isValidContent){
        return;
      }
    const cookies = new Cookies();

    const message = {
      token: cookies.get("logged_in"),
      receiver: this.state.receiver,
      title: this.state.title,
      content: this.state.content,
      sendDate: dbDate,
    };

    axios
      .get("http://localhost:8989/message/add", { params: message })
      .then((response) => {
        this.setState({receiver : "", title: "", content: "", isValidTitle: false, isValidContent: false,
          isValidReceiver: false })
      })
      .catch((error) => {
        alert("Internal server error\nPlease try again later");
      });
  };

  isValidButton = () => {
    return (this.state.isValidReceiver 
       && this.state.isValidTitle
       && this.state.isValidContent);
  }
  render() {
    return (
      <div>
        <h2>Send Message</h2>
        <div>
          <label style={{minWidth: '10vw'}}>
            {" "}
            Receiver:{" "}
            <input
              type={"text"}
              value={this.state.receiver}
              onChange={this.receiverHandler}
            />
          </label>
        </div>
        <div>
          <label style={{minWidth: '10vw'}}>
            {" "}
            Title:{" "}
            <input
              type={"text"}
              value={this.state.title}
              onChange={this.titleHandler}
            />
          </label>
        </div>
        <div>
          <label>
            <span style={{minWidth: '10vw'}}>Content:</span>
            <input
              type={"text"}
              value={this.state.content}
              onChange={this.contentHandler}
            />
          </label>
        </div>

        <button disabled={!this.isValidButton()} onClick={this.createMessageButton}>Send Message</button>
      </div>
    );
  }
}

export default CreateMessage;
