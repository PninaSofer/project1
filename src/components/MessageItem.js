import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

class MessageItem extends React.Component {
  state = {
  
  };

	markAsRead = () => {
    const messageId = {messageId: this.props.message.id};
    axios.get("http://localhost:8989/message/mark", {params:messageId}).then( response => {
      if(response.data === true){
        this.props.updateReadDate(this.props.message.id);
      }
    })
	}

  deleteMessage = () => {
    const cookies = new Cookies();
    const token = cookies.get("logged_in")
    const message = {messageId: this.props.message.id, token: token};
    axios.get("http://localhost:8989/message/remove-message", {params:message}).then( response => {
      if(response.data === true){
        this.props.deleteMessage(this.props.message.id);
      }
    })
  }

  render() {
    return (
      <div style={{margin: '5px', padding: '5px', border: '1px solid grey'}}>
        <span>Sent: {this.props.message.sendDate}</span>
        <h2> Title: {this.props.message.title}</h2>
        <p>{this.props.message.content}</p>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <p>Sender: {this.props.message.senderId}</p>
          <p>{this.props.message.readDate !== null ? "Read" : "NotRead"}</p>
        </div>

        <button disabled={this.props.message.readDate !== null} onClick={this.markAsRead}>Mark as Read</button>
        <button style={{backgroundColor: "lightcoral"}} onClick={this.deleteMessage}>Delete</button>
      </div>
    );
  }
}

export default MessageItem;
