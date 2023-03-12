import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tableweekend from './Tableweekend';
import Table2 from './Table2';
import Table3 from './Table3';
import Table4 from './Table4';
import Table5 from './Table5';





function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Tap1() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="tap1">
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="table weekend" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item three" {...a11yProps(2)} />
          <Tab label="Item four" {...a11yProps(3)} />      
              <Tab label="Item five" {...a11yProps(4)} />



        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Tableweekend />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Table2/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Table3/>
      </TabPanel>
          <TabPanel value={value} index={3}>
        <Table4/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Table5/>
      </TabPanel>
   
   
    </Box>
    </div>
  );
}
