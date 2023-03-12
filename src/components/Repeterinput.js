import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  Field
} from "formik";
import {Select,  MenuItem

} from "@material-ui/core";




function Repeterinput() {


 

   


 

  const [inputList, setInputList] = useState([{ namemanager: "", namecourse: "",type:[]

}]);

// handle input change
const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

   
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
   
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { namemanager: "", namecourse: "",type:[] }]);
  };
 

  return (
    <div className="repeater">
      {inputList.map((x, i) => {
        return (
          <div className="box">
            
<Grid  container spacing={5} >


<Grid item xs={12} md={3}   >
<TextField fullWidth label="name manager"  variant="outlined"
        value={x.namemanager}
        name='namemanager'
        id=" namemanager"
        type="text"
        placeholder="namemanager"
        onChange={e => handleInputChange(e, i)}

        /></Grid>
        <Grid item xs={12} md={3}   >

        <TextField fullWidth label="name course"  variant="outlined"
        value={x.namecourse}
        name='namecourse'
        id=" namecourse"
        type="text"
        placeholder="namecourse"
        onChange={e => handleInputChange(e, i)}

        /></Grid>

 <Grid item xs={12} md={4}   >
 <Field
                          name='type'
                          value={x.type}
                          id='type'


                          type="select"
                          as={Select}
                          onChange={e => handleInputChange(e, i)}

                          multiple
                          variant="outlined" 

                        >
                          <MenuItem value="cat">cat</MenuItem>
                          <MenuItem value="dog">dog</MenuItem>
                          <MenuItem value="frog">frog</MenuItem>
                        </Field>

</Grid>

<Grid item xs={12} md={2}   >
{inputList.length !== 1 && <Button color='secondary' variant="contained" style={{padding:'12px'}}
              className="mr10"
              onClick={() => handleRemoveClick(i)}>Remove</Button>}

</Grid>
<Grid item xs={12} md={3}   >
{inputList.length - 1 === i && <Button color='success'   variant="contained" style={{width: '100%',padding:'12px'}} onClick={handleAddClick}>Add</Button>}


  </Grid>

        </Grid>

         
          
       </div>
        );
      })}
      
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}
      </div>
    </div>
  );
}

export default Repeterinput;