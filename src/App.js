import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.socket = io.connect("http://localhost:3020");
    this.socketChat = io.connect("http://localhost:3020/chat");
  }

  componentWillMount() {
    this.socket.on("message", data => {
      console.log(data);
      console.log("DATA CAME IN");
    });
    this.socket.on("test", data => {
      console.log(data);
    });

    // This part of code it not getting fired. Mesage from chat does not comes in
    this.socketChat.on("test", data => {
      console.log(data);
    });

    this.socketChat.on("chatTestUpdated", data => {
      console.log(data);
    });
    this.socket.on("socketGeneralUpdated", data => {
      console.log(data);
    });
  }

  fireSockets = () => {
    this.socketChat.emit("chatTest", { chat: "I am here" });
    this.socket.emit("socketGeneral", { chat: "I am here aswell" });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={this.fireSockets}>Click me</button>
        </header>
      </div>
    );
  }
}

export default App;
