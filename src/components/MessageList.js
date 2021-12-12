import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import MessageItem from "./MessageItem";

class MessageList extends React.Component {
  state = {
    messages: [],
  };

  updateReadDate = (messageId) => {
    let index = -1
    for (let i=0; i<this.state.messages.length; i++){
      if (this.state.messages[i].id === messageId){
        index = i
      }
    }
    if (index === -1){
      return
    }
    const tmpMessages = this.state.messages;
    tmpMessages[index].readDate = new Date().toISOString();
    this.setState({ messages: tmpMessages });
  };

  deleteMessage = (messageId) => {
    const tmpMessages = this.state.messages.filter((m) => m.id !== messageId);
    this.setState({ messages: tmpMessages });
  };
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("logged_in");
    axios
      .get("http://localhost:8989/message/?token=" + token)
      .then((response) => {
        this.setState({ messages: response.data });
      });
  }

  render() {
    return (
      <div>
        {this.state.messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            updateReadDate={this.updateReadDate}
            deleteMessage={this.deleteMessage}
          />
        ))}
      </div>
    );
  }
}

export default MessageList;
