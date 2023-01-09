import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './styles.css';

const Welcome = () => {
    const { userState } = useContext(AuthContext);
  return (
    <div className='welcome-message'>Welcome back, { userState.user.user_name }</div>
  )
}

export default Welcome