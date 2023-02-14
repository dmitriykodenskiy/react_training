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

export default StatisticsItem