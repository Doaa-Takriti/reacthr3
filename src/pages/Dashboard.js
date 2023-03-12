import React from 'react';
import Cards from '../components/Cards';
import Tap1 from '../components/Tap1';
import Grid from '@mui/material/Grid';
import Chart1 from "../components/Chart1";
import Chart2 from "../components/Chart2"

import { ThemeContext } from "../context/themeContext";



const Dashboard = () => {
  const { toggleNavbar } = React.useContext(ThemeContext);
console.log (toggleNavbar)
  return (
    <div  className={toggleNavbar ? "contetleft" : "content"}> 
    <div class="body-content">
     <Cards />
  <Grid  container>
      <Grid xs={12} >
      <Tap1/>


        </Grid>

</Grid>
<Grid  container sx={{ mt: 2 }}>
<Grid xs={12} md={8}  >
<Chart2/>
</Grid>


<Grid xs={12} md={4}  >
<Chart1/>
</Grid>
</Grid>

</div>
    </div>
  )
}

export default Dashboard