import React from 'react';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import { useFormik, Field } from "formik";
import { basicSchema4 } from "../schemas3";
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';


  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    
  
  
  
  }; 

  const Forgetpassword = () => {

const navigate= useNavigate()
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
} = useFormik({
    initialValues: {
      email: "",
  
      
    },
    validationSchema: basicSchema4,
    onSubmit,
});

console.log(errors);


  return (
    <div className='log-in'>
      <div className="log-in-body">
      <img className="img-logo" alt="img-logo" src="https://th.bing.com/th/id/R.07ccecd36c518f4589191d7c4f676913?rik=Ygi9Zuy4IR2hQg&pid=ImgRaw&r=0" />

      <form onSubmit={handleSubmit} autoComplete="off">
              <TextField label="email" variant="outlined"
                value={values.email}
                name='email'
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="Enter your email"
                onBlur={handleBlur}
                className={errors.email && touched.email ? "input-error" : ""} />
                            {errors.email && touched.email && <p className="error">{errors.email}</p>}


        
   
      <br/>
      <br/>
      <Grid  container spacing={6}>
<Grid item xs={12} md={6}  >
        <Button color='success' disabled={isSubmitting} type="submit" variant="contained" style={{width:'100%',padding:'12px'}}>reset</Button>
        </Grid>
        <Grid item xs={12} md={6}  >
        <Button color='success' onClick={() => navigate(-1)} variant="outlined" style={{width:'100%',padding:'12px'}}>cancel</Button>
        </Grid>
        </Grid>
      <br/>
      <br/>
     



      </form>
    
      <br/>
      <br/>
    

      </div>

    </div>
  )
}

export default Forgetpassword