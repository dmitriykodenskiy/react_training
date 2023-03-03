import { useState } from 'react'
import { SET_BORN_DATE, ALL_AUTHORS } from "../queries"
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select';


const AuthorUpdate = (props) => {
  const [bornDate, setbornDate] = useState('')
  const [name, setName] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [ createBook ] = useMutation(SET_BORN_DATE, {
    refetchQueries: [ {query: ALL_AUTHORS} ]
  })

  if (result.loading) {
    return <div>loading...</div>
  } else if(!result.data?.allAuthors){
    return <div>No authors found</div>
  }

  let authors = [...result.data.allAuthors]

  const options = authors.map(item => {
    return {value: item.name, label: item.name}
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { name, setBornTo: bornDate } })

    setbornDate('')
    setName('')
  }

  const handleSelect = ({value}) => {
    setName(value)
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Author Name
          <Select
            defaultValue={name}
            onChange={handleSelect}
            options={options}
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