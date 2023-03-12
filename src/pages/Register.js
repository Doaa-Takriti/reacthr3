import React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useFormik,Field } from "formik";
import { basicSchema } from "../schemas2";
import Grid from '@mui/material/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Link,useNavigate
} from "react-router-dom";
// const navigate = useNavigate()
/* useEffect(() => {
  const auth = localStorage.getItem("user")
  if (auth) {
    navigate ('/')
  }

}, []) */
  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    /* let result = await fetch("url",{
      method: 'POST',
      body :JSON.stringify(values),
      headers : {
        "content-type":"application/json"
      }
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem("user",JSON.stringify(result.result))
      localStorage.setItem("token",JSON.stringify(result.auth))

    navigate ('/') */

    
    actions.resetForm();

  
  
  }; 

  const Register = () => {


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
        checkbox: false,
        name:'',
        password:'',
        confirmPassword:'',
        age:'',
        gender:''
      
    },
    validationSchema: basicSchema,
    onSubmit,
});

console.log(errors);


  return (
    <div className='log-in register'>
      <div className="log-in-body">
      <img className="img-logo" alt="img-logo" src="https://th.bing.com/th/id/R.07ccecd36c518f4589191d7c4f676913?rik=Ygi9Zuy4IR2hQg&pid=ImgRaw&r=0" />

      <form onSubmit={handleSubmit} autoComplete="off">
      <Grid  container spacing={2}>
<Grid item xs={12} md={6}  >

<TextField label="name" variant="outlined"
                value={values.name}
                name='name'
                onChange={handleChange}
                id="name"
                type="name"
                placeholder="Enter your email"
                onBlur={handleBlur}
                className={errors.name && touched.name ? "input-error" : ""} />
                            {errors.name && touched.name && <p className="error">{errors.name}</p>}
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

      <TextField  label="age" variant="outlined" 
      id="age"
      name='age'
                type="number"
                placeholder="Enter your age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.age && touched.age ? "input-error" : ""}
            />
            {errors.age && touched.age && (
                <p className="error">{errors.age}</p>
            )}
                    <FormControlLabel
                        control={<Checkbox type="checkbox" id="checkbox"  name="checkbox"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.checkbox}                                     />}
                        label="I accept the terms and conditions"
           
 
                        />
                            {errors.checkbox && touched.checkbox && (
                <p className="error">{errors.checkbox}</p>
            )}
           

</Grid>


<Grid item xs={12} md={6}  >
<TextField label="password" variant="outlined"
                value={values.password}
                name='password'
                onChange={handleChange}
                id="password"
                type="password"
                placeholder="Epassword"
                onBlur={handleBlur}
                className={errors.password && touched.password ? "input-error" : ""} />
                            {errors.password && touched.password && <p className="error">{errors.password}</p>}
                            <TextField label="   confirmPassword" variant="outlined"
                value={values.confirmPassword}
                name='confirmPassword'
                onChange={handleChange}
                id="confirmPassword"
                type="password"
                placeholder="confirmPassword"
                onBlur={handleBlur}
                className={errors.confirmPassword && touched.confirmPassword ? "input-error" : ""} />
                            {errors.confirmPassword && touched.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
  
       <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="gender"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.gender}


      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
  
      </RadioGroup>
    </FormControl>
    {errors.gender && touched.gender && <p className="error">{errors.gender}</p>}

</Grid>     
</Grid>
 
   
      <br/>
      <br/>
      <Button color="error" disabled={isSubmitting} type="submit" variant="contained" style={{width:'100%',padding:'12px'}}>register</Button>
      <br/>
      <br/>
     



      </form>
      <div style={{textAlign :'center'}}>
         <Link to='/login'>login ?</Link>

      </div>
      <br/>
      <br/>
   

      </div>

    </div>
  )
}

export default Register