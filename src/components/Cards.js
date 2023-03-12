import React from 'react';
import Grid from '@mui/material/Grid';
import { Cards1} from "../Data";


function Cards() {
  return (
    <div id="cards">
<Grid container >
 

  {Cards1.map((p) => (
      <Grid xs={12} md={3}>
      <div key={p.id} className='card-content'>
      <Grid  container>
      <Grid xs={8}>
        <div>
            <p>{p.title} :</p>
            <p>{p.number}</p>
        </div>
      
        
      </Grid>
      <Grid xs={4}>
        <div className='icon-card'>
          <div>
   
            </div>
        </div>
      
        
      </Grid>
      </Grid>
      </div>
    </Grid>
        ))}
</Grid>

    </div>
  )
}

export default Cards