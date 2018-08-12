import React from 'react';
import './Button.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Button = (props) => {
  return (
    <button onClick={props.click} className={props.className}>
        { typeof (props.icon) !== 'undefined' &&
            <FontAwesomeIcon icon={props.icon} size="1x"/>
        }

        {props.text}
    </button>
  )
}
