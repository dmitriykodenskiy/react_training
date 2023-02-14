import Button from './Button'

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

export default Feedback