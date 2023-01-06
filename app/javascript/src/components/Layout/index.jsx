import React from 'react'
import '../Layout/style.css'
import Sidebar from '../Sidebar'
import SnackTop from '../SnackTop'

const Layout = ({children}) => {
  return (
    <div className='layout-base'>
        <Sidebar />
        <SnackTop />
        {children}
    </div>
  )
}

export default Layout