import { search } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()
    const style = {
      marginBottom: 10
    }
  
    const handleChange = (event) => {
        event.preventDefault()
        dispatch(search(event.target.value))
    }
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
}
  
export default Filter