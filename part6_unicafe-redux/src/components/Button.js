const Button = ({title, handleClick}) => {
    return (
      <button className='button' onClick={() => handleClick(title)}>
        {title}
      </button>
    )
}

export default Button