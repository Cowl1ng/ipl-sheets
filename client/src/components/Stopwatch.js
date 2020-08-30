import React, { useState } from 'react'

import useInterval from './useInterval'

const Stopwatch = ({ winningBid }) => {
  const [seconds, setSeconds] = useState(5)
  const [delay, setDelay] = useState(0)

  // Set up timer counting down with delay of 5 seconds at zero
  useInterval(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1)
    } else {
      if (delay === 0) {
        // Send winning bid
        console.log('Sending Bid')
      }
      setDelay(delay + 1)
      if (delay > 5) {
        setSeconds(5)
        setDelay(0)
      }
    }
  }, 1000)

  return (
    <div>
      {delay > 0 ? (
        <h1 style={{ fontSize: 65 }}>DELAY FOR NEXT PLAYER</h1>
      ) : (
        <h1 style={{ fontSize: 65 }}>{seconds}</h1>
      )}
    </div>
  )
}

export default Stopwatch
