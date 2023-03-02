import { Link } from 'react-router-dom'

const Menu = () => {
    return (
      <div className='menu'>
        <Link to='/'>Authors</Link>
        <Link to='/books'>Books</Link>
        <Link to='/newbook'>Add Book</Link>
      </div>
    )
}

export default Menu