import React, { useContext } from 'react'
import classes from './Clock.module.css'
import { ClockContext } from '../Layout'

export const Clock = props => {

  const state = useContext(ClockContext)

  return (
    <div className={classes.Clock}>
      <span>{state.time.hours < 10 ? '0' + state.time.hours : state.time.hours}</span>
      &nbsp;:&nbsp;
      <span>{state.time.minutes < 10 ? '0' + state.time.minutes : state.time.minutes}</span>
      &nbsp;:&nbsp;
      <span>{state.time.seconds < 10 ? '0' + state.time.seconds : state.time.seconds}</span>
    </div>
  )
}