import { useState } from 'react'
import { SET_BORN_DATE, ALL_AUTHORS } from "../queries"
import { useMutation } from '@apollo/client'

const AuthorUpdate = (props) => {
  const [bornDate, setbornDate] = useState('')
  const [name, setName] = useState('')

  const [ createBook ] = useMutation(SET_BORN_DATE, {
    refetchQueries: [ {query: ALL_AUTHORS} ]
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { name, setBornTo: bornDate } })

    setbornDate('')
    setName('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Author Name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Born Date
          <input
            type="number"
            value={bornDate}
            onChange={({ target }) => setbornDate(Number(target.value))}
          />
        </div>
        <button type="submit">Set born date</button>
      </form>
    </div>
  )
}

export default AuthorUpdate