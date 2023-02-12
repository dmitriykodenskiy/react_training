import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const { children, buttonLabel, user, logout } = props
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
        <div>
            <span>{user.name} logged in</span> 
            <button onClick={logout}>Log out</button>
        </div>
        <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>{buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
            {children}
            <button onClick={toggleVisibility}>cancel</button>
        </div>
    </div>
  )
})

export default Togglable