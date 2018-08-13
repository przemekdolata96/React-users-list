import React from 'react';
import './UsersTable.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const UsersTable = (props) => {

    let tableContent;

    const users = props.users.map((element,index) => {
        return (
            <tr key={index}>
                <td>
                    <span className="row-index">{index+1}</span>
                </td>
                <td>{element.name}</td>
                <td>{element.email}</td>
                <td><FontAwesomeIcon className="remove-icon" icon="times" onClick={() => props.removeUser(element.email)}></FontAwesomeIcon></td>
            </tr>
        )
    });

    tableContent = users;

    if(users == undefined || users.length === 0) {
        tableContent = <tr><td colSpan="3" className="placeholder">{props.placeholder}</td></tr>
    }

  return (
    <table>
        <tbody>
        <tr>
            <th>lp</th>
            <th>user</th>
            <th>e-mail</th>
        </tr>
            {tableContent}
        </tbody>
    </table>
  )
}
