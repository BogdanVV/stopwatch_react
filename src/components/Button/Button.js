import React from 'react'
import classes from './Button.module.css'

export const Button = props => {
  return (
    <>
      <button className={classes.Button} onClick={props.onClick}>{props.name}</button>
    </>
  )
}