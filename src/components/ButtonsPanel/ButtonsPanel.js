import React from 'react'
import classes from './ButtonsPanel.module.css'

export const ButtonsPanel = props => {
  return (
    <div className={classes.ButtonsPanel}>
      { props.children }
    </div>
  )
}