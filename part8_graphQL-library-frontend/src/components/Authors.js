import { ALL_AUTHORS } from "../queries"
import { useQuery } from '@apollo/client'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  } else if(!result.data?.allAuthors){
    return <div>No authors found</div>
  }

  let authors = [...result.data.allAuthors]

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
