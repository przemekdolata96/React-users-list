import React from 'react';
import './UsersTable.scss';

export const UsersTable = (props) => {

    const users = props.users.map((element,index) => {
        return (
            <tr key={index}>
                <td>{index+1}</td>
                <td>Maria Anders</td>
                <td>Germany</td>
                <td>x</td>
            </tr>
        )
    });

  return (
    <table>
        <tbody>
        <tr>
            <th>lp</th>
            <th>user</th>
            <th>e-mail</th>
        </tr>
            {users}
        </tbody>
    </table>
  )
}
