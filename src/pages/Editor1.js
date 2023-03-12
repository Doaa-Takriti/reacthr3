import React from "react";
import { Formik, Field } from "formik";
import TextEditor2 from "../components/TextEditor2";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';


export default function Editor1() {
  return (
    <div className="content">
    <div style={{marginTop: '100px'}}>
      <Formik 
      onSubmit=
      
          {async (values, actions) => {
            console.log(values)
    console.log(actions);
   await new Promise((resolve) => setTimeout(resolve, 1000));
    const empdata=values;
    

    fetch("http://localhost:4000/editor",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(empdata)
    }).then((res)=>{


    }).catch((err)=>{
      console.log(err.message)
    })
    alert("success")
    actions.resetForm();
  
  
  
  }
 
          
          
          
          }
        
        
        initialValues={{
          body: "<p>It works</p>",
          firstname: "",
          lastname:"",
          email:"",
          phone:"",
          id:""
        }}
      >
        {({ handleSubmit, setFieldValue, values,    handleChange,isSubmitting
 }) => (
          <form onSubmit={handleSubmit} id="form-editor" autoComplete="off">
            <h1 style={{marginBottom:'20px'}}>Editor</h1>

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
                    </Grid>
            <Field
              value={values.body}
              name="body"
              component={TextEditor2}
              setFieldValue={setFieldValue}
            />
  
            <input disabled={isSubmitting} variant="contained" style={{width:'100%',padding:'12px',color:"white",
            backgroundColor: "red"

          }} type="submit" value="submit" />
          </form>
        )}
      </Formik>
    </div>
    </div>
  );
}
