import { useDispatch } from 'react-redux'
const Button = ({title}) => {
  const dispatch = useDispatch()
  const handleClick = (clickType) => {
    switch (clickType) {
      case 'good':
        dispatch({type: 'GOOD'})
      break;

      case 'neutral':
        dispatch({type: 'NEUTRAL'})
      break;
  
      case 'bad':
        dispatch({type: 'BAD'})
      break;
      
      default:
      break;
    }
  }
  return (
    <button className='button' onClick={() => handleClick(title)}>
      {title}
    </button>
  )
}

export default Button