import React, { Component } from 'react';
import './Input.scss';

export default class Input extends Component {
    constructor(props){
        super(props)

        this.state = {
            value: this.props.value
        }
    }

    handleChange = (event) => {
        this.setState(
            { 
                value: event.target.value 
            },
            () => this.props.onChange(this.state.value)
        );
    }

  render() {
    return (    
        <input 
            className={this.props.className}
            type="text" 
            placeholder={this.props.placeholder} 
            value={this.state.value} 
            onChange={this.handleChange}
            maxLength={this.props.maxLength}
            />
    )
  }
}
