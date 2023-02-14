const StatisticsItem = ({feedback, meta}) => {
    if (feedback) {
      return(
        <li className='statistics_item'>
          <span className='statistics_item_name'>{feedback.name}</span>&nbsp;&nbsp;
          <span className='statistics_item_value'>{feedback.value}</span>
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

export default StatisticsItem