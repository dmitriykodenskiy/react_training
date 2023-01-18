const Total = ({parts}) => {
    const total = parts.reduce((sum, current) => {
        return sum + current.exercises
    }, 0)
    return(
      <p><b>Total of {total} exercises</b></p>
    )
  }

export default Total