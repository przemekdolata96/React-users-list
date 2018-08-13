import React from 'react';
import './IconMessage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const IconMessage = (props) => {
  return (
    <div className="icon-message">
        <FontAwesomeIcon className={props.iconColor} icon={props.icon}></FontAwesomeIcon>
        <span>{props.message}</span>
    </div>
  )
}
