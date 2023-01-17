import { useState } from 'react'

const Button = ({title, handleClick}) => {
  return (
    <button className='button' onClick={() => handleClick(title)}>
      {title}
    </button>
  )
}

const Feedback = ({title, good, neutral, bad, handleClick}) => {
  return (
    <div className='feedback_container'>
      <h2>{title}</h2>
      <Button title={good.name} handleClick={handleClick} />
      <Button title={neutral.name} handleClick={handleClick} />
      <Button title={bad.name} handleClick={handleClick} />
    </div>
  )
}

const StatisticsItem = ({feedbackType, meta}) => {
  if (feedbackType) {
    return(
      <li className='statistics_item'>
        <span className='statistics_item_name'>{feedbackType.name}</span>&nbsp;&nbsp;
        <span className='statistics_item_value'>{feedbackType.value}</span>
      </li>
    )
  } else if (meta) {
    return(
      <li className='statistics_item'>
        <span className='statistics_item_name'>{meta.title}</span>&nbsp;&nbsp;
        <span className='statistics_item_value'>{meta.count()}</span>
      </li>
    )
  }
  
}

const Statistics = ({title, good, neutral, bad}) => {
  const total = {
    title: 'All',
    count: function() {
      const countTotal = () => good.value + neutral.value + bad.value;
      return countTotal();
    }
  }
  const avarage = {
    title: 'Avarage',
    count: function() {
      const countTotal = () => good.value + neutral.value + bad.value;
      return (countTotal() / 3).toFixed(2);
    }
  }
  
  const positivePercentage = {
    title: 'Positive',
    count: function() {
      const countTotal = () => good.value + neutral.value + bad.value;
      return countTotal() ? ((good.value / countTotal() * 100).toFixed(2)) + '%' : 0;
    }
  }
  if (total.count() > 0) {
    return (
      <div className='statistics_container'>
        <h2>{title}</h2>
        <ul className='statistics_list'>
          <StatisticsItem feedbackType={good} />
          <StatisticsItem feedbackType={neutral} />
          <StatisticsItem feedbackType={bad} />
          <StatisticsItem meta={total} />
          <StatisticsItem meta={avarage} />
          <StatisticsItem meta={positivePercentage} />
        </ul>
      </div>
    )
  } else {
    return (
      <div className='statistics_container'>
        <h2>{title}</h2>
        <span>No feedback given</span>
      </div>
    )
  }
  
}

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