import React, { Component } from 'react';
import './App.scss';
//import logo from "./images/logo.jpg";
import {Button} from "./components/button/Button.js";
import { UsersTable } from "./components/usersTable/UsersTable.js";
import Input from "./components/input/Input.js";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faPlusCircle)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      nameDirty:false,
      emailDirty:false,
      users: [1,2,3,4,5,6,7,8,9,10],
    }
  }

  setName = (value) => {
    this.setState({
      name: value,
      nameDirty: true,
    });
  }

  setEmail = (value) => {
    this.setState({
      email: value,
      emailDirty: true,
    });
  }

  nameInvalid = () => {
    return !/^[a-ż]+$/.test(this.state.name) && this.state.nameDirty;
  }

  emailInvalid = () => {
    return !/\S+@\S+\.\S+/.test(this.state.email) && this.state.emailDirty;
  }

  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="container-header">
            <img className="logo" src="" alt="logo"/>
            <a href="#" className="url">www.example.com</a>
          </div>
          <Button className="filled" text="Add user" icon="plus-circle"></Button>
          <Input
            className={(this.nameInvalid() ? 'error' : '')} 
            placeholder="Name..." 
            value={this.state.name} 
            onChange={this.setName} 
            maxLength="20"/>
          <Input
            className={(this.emailInvalid() ? 'error' : '')} 
            placeholder="Email..." 
            value={this.state.email} 
            onChange={this.setEmail}/>
          <UsersTable users={this.state.users}></UsersTable>
        </div>
      </div>
    );
  }
}

export default App;