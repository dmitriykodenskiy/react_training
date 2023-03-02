import { Routes, Route } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Menu from './components/Menu'

const App = () => {

  return (
    <div>
      <Menu />
      <Routes>
        <Route path='/' element={<Authors/>} />
        <Route path='/books' element={<Books/>} />
        <Route path='/newbook' element={<NewBook/>} />
      </Routes>
    </div>
  )
}

export default App
