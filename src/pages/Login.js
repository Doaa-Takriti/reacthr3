import React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useFormik, Field } from "formik";
import { basicSchema } from "../schemas";
import {Link, useNavigate
} from "react-router-dom";
import { useAuth } from '../components/auth'


  const Login = () => {
    const navigate = useNavigate()
    const auth = useAuth()

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
    auth.login(values.email)

    /* let result = await fetch("url",{
      method: 'POST',
      body :JSON.stringify(values),
      headers : {
        "content-type":"application/json"
      }
    });
    result = await result.json();
    console.warn(result); 
    if (result.auth) {
    localStorage.setItem("user",JSON.stringify(result.user))
        localStorage.setItem("token",JSON.stringify(result.auth))

    navigate ('/') 
  } else {
    alert ("lll")
  } */

    actions.resetForm();
  
    navigate('/')
  
  
  
  }; 

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
        password: "",
        checkbox: false
      
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
              <TextField label="email" variant="outlined"
                value={values.email}
                name='email'
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="Enter your email"
                onBlur={handleBlur}
                className={errors.email && touched.email ? "input-error" : ""} />
                            {errors.email && touched.email && (<p className="error">{errors.email}</p>)}

      <TextField  label="password" variant="outlined" 
      id="password"
      name='password'
                type="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.password && touched.password ? "input-error" : ""}
            />
            {errors.password && touched.password && (
                <p className="error">{errors.password}</p>
            )}
                    <FormControlLabel
                        control={<Checkbox type="checkbox" id="checkbox"  name="checkbox"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.checkbox}                                     />}
                        label="remember me"
           
 
                        />
                            {errors.checkbox && touched.checkbox && (
                <p className="error">{errors.checkbox}</p>
            )}
   
      <br/>
      <br/>
      <Button  disabled={isSubmitting} type="submit" variant="contained" style={{width:'100%',padding:'12px'}}>log in</Button>
      <br/>
      <br/>
     



      </form>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Link to='/Forgetpassword' style={{color:'red'}}>forget password ?</Link>
      <Link to='/Changepassword' style={{color:'green'}}>change password ?</Link>

      </div>
      <br/>
      <br/>
      <p>don't have an account? <Link to='/register'
      >sign up</Link></p>
      <br/>
      <br/>
    

      </div>

    </div>
  )
}

export default Login