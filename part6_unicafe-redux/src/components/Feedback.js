import Button from './Button'
import { useSelector } from 'react-redux'

const Feedback = ({title}) => {
    const feedbacks = useSelector(state => state)
    return (
      <div className='feedback_container'>
        <h2>{title}</h2>
        {feedbacks.map((feedback, index) => 
            <Button title={feedback.name} key={index}/>
        )}
      </div>
    )
}

export default Feedback