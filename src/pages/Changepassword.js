import React from 'react';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import { useFormik, Field } from "formik";
import { basicSchema } from "../schemas3";
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';


  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    
  
  
  
  }; 

  const Changepassword = () => {

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
       oldpassword: "",
       newpassword: "",
       confirmnewpassword:""
      
    },
    validationSchema: basicSchema,
    onSubmit,
});

console.log(errors);


  return (
    <div className='log-in'>
      <div className="log-in-body">
      <img className="img-logo" alt="img-logo" src="https://th.bing.com/th/id/R.07ccecd36c518f4589191d7c4f676913?rik=Ygi9Zuy4IR2hQg&pid=ImgRaw&r=0" />

      <form onSubmit={handleSubmit} autoComplete="off">
              <TextField label="old password" variant="outlined"
                value={values.oldpassword}
                name='oldpassword'
                onChange={handleChange}
                id="oldpassword"
                type="password"
                placeholder="Enter your old password"
                onBlur={handleBlur}
                className={errors.oldpassword && touched.oldpassword ? "input-error" : ""} />
                            {errors.oldpassword && touched.oldpassword && <p className="error">{errors.oldpassword}</p>}

      <TextField  label="new password" variant="outlined" 
      id="newpassword"
      name='newpassword'
                type="password"
                placeholder="Enter your new password"
                value={values.newpassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.newpassword && touched.newpassword ? "input-error" : ""}
            />
            {errors.newpassword && touched.newpassword && (
                <p className="error">{errors.newpassword}</p>
            )}
            
      <TextField  label="confirm new password" variant="outlined" 
      id="confirmnewpassword"
      name='confirmnewpassword'
                type="password"
                placeholder="confirm new password"
                value={values.confirmnewpassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.confirmnewpassword && touched.confirmnewpassword ? "input-error" : ""}
            />
            {errors.confirmnewpassword && touched.confirmnewpassword && (
                <p className="error">{errors.confirmnewpassword}</p>
            )}
        
        
   
      <br/>
      <br/>
      <Grid  container spacing={6}>
<Grid item xs={12} md={6}  >
        <Button color='secondary' disabled={isSubmitting} type="submit" variant="contained" style={{width:'100%',padding:'12px'}}>change</Button>
        </Grid>
        <Grid item xs={12} md={6}  >
        <Button color='secondary'  onClick={() => navigate(-1)} variant="outlined" style={{width:'100%',padding:'12px'}}>cancel</Button>
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

export default Changepassword