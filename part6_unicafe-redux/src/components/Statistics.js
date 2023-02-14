import StatisticsItem from './StatisticsItem'
import { useSelector } from 'react-redux'

const Statistics = ({title}) => {
    const feedbacks = useSelector(state => state)
    const total = {
      title: 'All',
      count: function() {
        const countTotal = () => feedbacks.reduce((acc, item) => acc + item.value, 0);
        return countTotal();
      }
    }
    const avarage = {
      title: 'Avarage',
      count: function() {
        const countTotal = () => feedbacks.reduce((acc, item) => acc + item.value, 0);
        return (countTotal() / 3).toFixed(2);
      }
    }
    
    const positivePercentage = {
      title: 'Positive',
      count: function() {
        const countTotal = () => feedbacks.reduce((acc, item) => acc + item.value, 0);
        const goodFeedback = feedbacks.filter(item => item.name === 'good')[0]
        return countTotal() ? ((goodFeedback.value / countTotal() * 100).toFixed(2)) + '%' : 0;
      }
    }
    if (total.count() > 0) {
      return (
        <div className='statistics_container'>
          <h2>{title}</h2>
          <ul className='statistics_list'>
            {feedbacks.map((feedback, index) => 
                <StatisticsItem feedback={feedback} key={index}/>
            )}
            <StatisticsItem meta={total} key={feedbacks.length + 1}/>
            <StatisticsItem meta={avarage} key={feedbacks.length + 2}/>
            <StatisticsItem meta={positivePercentage} key={feedbacks.length + 3}/>
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

export default Statistics