import { useField } from '../hooks'

const CreateNew = (props) => {
    const {reset: contentReset, ...content} = useField('content')
    const {reset: authorReset, ...author} = useField('author')
    const {reset: infoReset, ...info} = useField('info')
  
  
    const handleReset = () => {
      contentReset()
      authorReset()
      infoReset()
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button type="submit">create</button>
          <button type="reset" onClick={handleReset}>reset</button>
        </form>
      </div>
    )  
}

export default CreateNew