import React , {useState} from 'react';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import { useFormik ,Field} from "formik";
import Grid from '@mui/material/Grid';
import TextEditor from "../components/TextEditor"
import TextEditor2 from "../components/TextEditor2"


function Editor1() {

      
  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const empdata=values;
    

    fetch("http://localhost:4000/editor",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(empdata)
    }).then((res)=>{

alert("success")
    }).catch((err)=>{
      console.log(err.message)
    })
    actions.resetForm();
  
  
  
  }; 
  const {
    values,

    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldValue
} = useFormik({
    initialValues: {
        firstname: "",
        lastname:"",
        email:"",
        phone:"",
        body: ""

    },
    onSubmit,
});



  return (
    <div className="content">
        <div style={{marginTop: '100px'}}>
        <form onSubmit={handleSubmit} autoComplete="off" id="form-editor">
        <Grid  container spacing={2} >


<Grid item xs={12} md={6}  >
              <TextField label="first name" style={{width:'100%'}} variant="outlined"
                value={values.firstname}
                name='firstname'
                onChange={handleChange}
                id="firstname"
                type="text"
                placeholder="Enter your first name"
           />
                    
                    </Grid>
                    
<Grid item xs={12} md={6}  >
              <TextField label="last name" style={{width:'100%'}} variant="outlined"
                value={values.lastname}
                name='lastname'
                onChange={handleChange}
                id="lastname"
                type="text"
                placeholder="Enter your last name"
           />
                    
                    </Grid>
                    <Grid item xs={12} md={6}  >
              <TextField label="email" style={{width:'100%'}} variant="outlined"
                value={values.email}
                name='email'
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="Enter your email"
           />
                    
                    </Grid>
                             <Grid item xs={12} md={6}  >
              <TextField label="phone number" style={{width:'100%'}} variant="outlined"
                value={values.phone}
                name='phone'
                onChange={handleChange}
                id="phone"
                type="number"
                placeholder="Enter your phone number"
           />
                    
                    </Grid>
                    <Grid item xs={12} md={12}  >
                      <TextEditor />
                  </Grid>
                  <Grid item xs={12} md={12}  >
          
           </Grid>
                    </Grid>
   
      <br/>
      <br/>
      <Button  disabled={isSubmitting} type="submit" variant="contained" style={{width:'100%',padding:'12px'}}>send</Button>
      <br/>
      <br/>
     



      </form>

        </div>
    </div>
  )
}
export default Editor1