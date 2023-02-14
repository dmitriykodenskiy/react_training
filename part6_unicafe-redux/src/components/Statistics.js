import StatisticsItem from './StatisticsItem'

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

export default Statistics