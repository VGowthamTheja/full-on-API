import React from 'react'
import '../Layout/style.css'
import Sidebar from '../Sidebar'

const Layout = ({children}) => {
  return (
    <div className='layout-base'>
        <Sidebar />
        {children}
    </div>
  )
}

export default Layout