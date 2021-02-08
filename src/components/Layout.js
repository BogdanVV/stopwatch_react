import React, { createContext, useState } from 'react'
import { Button } from './Button/Button'
import { ButtonsPanel } from './ButtonsPanel/ButtonsPanel'
import { Clock } from './Clock/Clock'
import classes from './Layout.module.css'

export const ClockContext = createContext()

export const Layout = props => {

  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 })

  const [interv, setInterv] = useState(null) // создаю кортеж с interv, чтобы в interv покласть setInterval при start-клике, чтобы потом при stop-клике можно было обнулить заданный интервал

  const [isStartClicked, setIsStartClicked] = useState(false) // влияет на то, какая кнопка будет рендериться - start или stop

  const [timeBetweenClicksOnWait, setTimeBetweenClicksOnWait] = useState(new Date())

  let newSeconds = time.seconds, newMinutes = time.minutes, newHours = time.hours

  // функция, которая запускает таймер
  const run = () => {
    newSeconds++
    if (newSeconds === 60) {
      newSeconds = 0
      newMinutes++
    }
    if (newMinutes === 60) {
      newMinutes = 0
      newHours++
    }
    return setTime({ hours: newHours, minutes: newMinutes, seconds: newSeconds })
  }

  // функция, которая останавливает таймер при нажатии на wait
  const wait = () => {
    clearInterval(interv)
    setIsStartClicked(prev => !prev)
  }

  const startHandler = () => {
    setIsStartClicked(prev => !prev)
    // run()
    setInterv(setInterval(run, 1000))
  }

  const waitHandler = () => {
    let moment = new Date()
    setTimeBetweenClicksOnWait( prev => {
      if (moment - timeBetweenClicksOnWait < 300) {
        wait()
      }
    })
    setTimeBetweenClicksOnWait(moment)
  }

  const resetHandler = () => {
    console.log('reset')
    setTime({ hours: 0, minutes: 0, seconds: 0 })
    clearInterval(interv)
    newSeconds = 0
    newMinutes = 0
    newHours = 0
    setInterv(setInterval(run, 1000))
  }

  const stopHandler = () => {
    setIsStartClicked(prev => !prev)
    clearInterval(interv)
    setTime({ hours: 0, minutes: 0, seconds: 0 })
    console.log('stop')
  }

  return (
    <ClockContext.Provider value={{ time, setTime, isStartClicked, setIsStartClicked }}>
      <div className={classes.Layout}>
        <Clock />
        <ButtonsPanel>
          {isStartClicked
            ? <Button name="STOP" onClick={stopHandler} />
            : <Button name="START" onClick={startHandler} />

          }
          <Button name="WAIT" onClick={waitHandler} />
          <Button name="RESET" onClick={resetHandler} />
        </ButtonsPanel>
      </div>
    </ClockContext.Provider>
  )
}