import { useState } from 'react'
import Feedback from './components/Feedback'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState({
    name: 'good',
    value: 0
  })
  const [neutral, setNeutral] = useState({
    name: 'neutral',
    value: 0
  })
  const [bad, setBad] = useState({
    name: 'bad',
    value: 0
  })
  const feedbackTitle = 'Give a feedback'
  const statisticsTitle = 'Statistics'

  const handleClick = (clickType) => {
    switch (clickType) {
      case 'good':
        setGood({
          ...good,
          value: good.value + 1
        })
      break;

      case 'neutral':
        setNeutral({
          ...neutral,
          value: neutral.value + 1
        })
      break;
  
      case 'bad':
        setBad({
          ...bad,
          value: bad.value + 1
        })
      break;
      
      default:
      break;
    }
  }

  return (
    <div>
      <Feedback title={feedbackTitle} good={good} neutral={neutral} bad={bad} handleClick={handleClick} />
      <Statistics title={statisticsTitle} good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App