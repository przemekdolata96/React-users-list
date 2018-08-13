import React from 'react';
import './Button.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Button = (props) => {
  return (
    <button onClick={props.onClick} className={props.className} disabled={props.disabled}>
        { typeof (props.icon) !== 'undefined' &&
            <FontAwesomeIcon icon={props.icon} size="1x"/>
        }

        {props.text}
    </button>
  )
}
