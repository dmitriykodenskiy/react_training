import Feedback from './components/Feedback'
import Statistics from './components/Statistics'


const App = () => {
  const feedbackTitle = 'Give a feedback'
  const statisticsTitle = 'Statistics'

  return (
    <div>
      <Feedback title={feedbackTitle}/>
      <Statistics title={statisticsTitle}/>
    </div>
  )
}

export default App