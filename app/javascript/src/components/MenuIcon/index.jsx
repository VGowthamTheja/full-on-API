import { AssignmentInd, Diversity3, Hub, Person } from '@mui/icons-material'
import React from 'react'

const utilities = [
  { id:1, icon: <AssignmentInd />, name: 'Users' },
  { id:2, icon: <Person />, name: 'Managers' },
  { id:3, icon: <Diversity3 />, name: 'Candidates' },
  { id:4, icon: <Hub />, name: 'Projects' },
]

const MenuIcon = () => {
  return (
    <div>
      { utilities.map((utility)=>{
        return (
          <div className='icon' key={utility.id}>
            {utility.icon}
            <span>{utility.name}</span>
          </div>
        )
      }) }
    </div>
  )
}

export default MenuIcon