import React, { Component } from 'react';
import './App.scss';
//import logo from "./images/logo.jpg";
import {Button} from "./components/button/Button.js";
import { UsersTable } from "./components/usersTable/UsersTable.js";
import { IconMessage } from "./components/iconMessage/IconMessage.js";
import Input from "./components/input/Input.js";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle, faCheck, faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faPlusCircle, faCheck, faExclamationCircle, faTimes);

const USERS_LIMIT = 10;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      name: '',
      email: '',
      nameDirty:false,
      emailDirty:false,
      users: [],
      formState: 'initial',
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const users = Array.from(data).map(user => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      });

      users.pop();

      this.setState(
        {
        users: users,
        },
        this.checkLimit
      )
    })
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
    return !/^[a-żA-Ż]+$/.test(this.state.name) && this.state.nameDirty;
  }

  emailInvalid = () => {
    return (!/\S+@\S+\.\S+/.test(this.state.email) && this.state.emailDirty) || this.userExsist(this.state.email);
  }

  formDirty = () => {
    return this.state.name !== "" || this.state.email !== "";
  }

  openForm = () => {
    this.setState({
      formState: 'openForm'
    });
  }

  checkLimit = () => {
    if(this.state.users.length >= USERS_LIMIT) {
      this.setState({
        formState: 'limitReached'
      })
    } else {
      this.setState({
        formState: 'userAdded'
      })
    }
  }

  userExsist = (email) => {
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].email === email) {
        return true;
      }
    }
    return false;
  }

  submitDisabled = () => {
    return this.nameInvalid() || this.emailInvalid() || !this.state.nameDirty || !this.state.emailDirty;
  }

  addUser = () => {
    this.checkLimit();

    const newArray = this.state.users;
    newArray.push({
      id:0,
      name:this.state.name,
      email:this.state.email,
    });

    this.setState(
      {
        users: newArray,
      },
      this.checkLimit
    );

    this.resetInputs();
  }

  removeUser = (email) => {
    const newArray = this.state.users.filter(user => {
      if (user.email === email) {
        return false;
      } else {
        return true;
      }
    });
    this.setState({
      users: newArray,
    });
    if (this.state.formState === 'limitReached') {
      this.setState({
        formState: 'initial',
      });
    }
  }

  resetInputs = () => {
    this.setState({
      name: '',
      email: '',
      nameDirty: false,
      emailDirty: false,
    })
  }
  

  render() {
    let userForm;
      switch (this.state.formState) {

        case 'openForm':
          userForm =
            <div className="user-form">
              <Input
                className={(this.nameInvalid() ? 'error' : '')}
                placeholder="Name..."
                value={this.state.name}
                onChange={this.setName}
                maxLength="20"
                autoFocus />
              <Input
                className={(this.emailInvalid() ? 'error' : '')}
                placeholder="Email..."
                value={this.state.email}
                onChange={this.setEmail} />
              <Button className="filled" text="Submit" onClick={this.addUser} disabled={this.submitDisabled()}></Button>
              {this.formDirty() &&
                <Button className="reset" text="reset fields" onClick={this.resetInputs}></Button>
              }
            </div>
          break;

        case 'userAdded':
          userForm =
            <div className="user-form">
              <Button text="Add user" icon="plus-circle" onClick={this.openForm}></Button>
              <IconMessage icon="check" iconColor="green" message="You have succesfully added an user."></IconMessage>
            </div>
          break;

        case 'limitReached':
          userForm =
            <div className="user-form">
              <Button text="Add user" icon="plus-circle"></Button>
              <IconMessage icon="exclamation-circle" iconColor="red" message="You can't add new user beacuse of a limit."></IconMessage>
            </div>
          break;
      
        default:
          userForm = 
          <div className="user-form">
            <Button text="Add user" icon="plus-circle" onClick={this.openForm}></Button>
          </div>
          break;
      }

    return (
      <div className="app">
        <div className="container">
          <div className="container-header">
            <img className="logo" src="" alt="logo"/>
            <a href="#" className="url">www.example.com</a>
          </div>
          <div className="container-content">
            {userForm}
            <UsersTable users={this.state.users} removeUser={this.removeUser} placeholder="There is no users in this table"></UsersTable>
          </div>
        </div>
      </div>
    );
  }
}

export default App;