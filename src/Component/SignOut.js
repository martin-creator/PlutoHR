import React from 'react'

const SignOut = ({onSignOut}) => {
  return (
    <div>
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  )
}

export default SignOut