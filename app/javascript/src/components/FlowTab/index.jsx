import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Projects from '../Projects';
import './style.css'
import { AuthContext } from '../../context/AuthContext';
import AssignedProjects from '../AssignedProjects';
import ProjectAssignment from '../ProjectAssignment';

export default function FlowTab() {
  const [value, setValue] = React.useState('1');

  const {userState} = React.useContext(AuthContext)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', margin:'0.2rem 0.5rem 0.7rem 0.5rem' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Projects" value="1" />
            { userState.user.role==='admin' ? <Tab label="Assignments" value="2" /> : null }
            { userState.user.role==='admin' ? <Tab label="Item Three" value="3" /> : null }
          </TabList>
        </Box>
        <TabPanel value="1">{userState.user.role==='user' ? <AssignedProjects /> : <Projects />}</TabPanel>
        { userState.user.role==='admin' ? <TabPanel value="2"> <ProjectAssignment /> </TabPanel> : null }
        {/* <TabPanel value="3">Item Three</TabPanel> */}
      </TabContext>
    </Box>
  );
}