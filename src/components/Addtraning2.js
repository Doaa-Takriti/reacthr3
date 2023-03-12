import React from "react";
import {
  Formik,
  Field,
  Form,

  FieldArray
} from "formik";
import {
  Button,
 
  Select,
  MenuItem,
  TextField
} from "@material-ui/core";
import * as yup from "yup";

import Grid from '@mui/material/Grid';



const validationSchema = yup.object({
  firstName: yup
    .string()
    .required()
    .max(10),
    TrainingCourses: yup.array().of(
    yup.object({
      name: yup.string().required()
    })
  )
});

function Addtraning2  ()  {
  return (
    <div >
        <div >
      <Formik
        validateOnChange={true}
        initialValues={{
       
          TrainingCourses: [{ employees: [], namemanager: "",namecourse: "", id: "" + Math.random() }]
        }}
        validationSchema={validationSchema}
        // validate={values => {
        //   const errors: Record<string, string> = {};

        //   if (values.firstName.includes("bob")) {
        //     errors.firstName = "no bob";
        //   }

        //   return errors;
        // }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log("submit: ", data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
      
            <FieldArray name="TrainingCourses">
              {arrayHelpers => (
                <div>
                 
                  {values.TrainingCourses.map((TrainingCourse, index) => {
                    return (

                      <div key={TrainingCourse.id}>
                                              <Grid  container spacing={5} style={{marginBottom: '10px'}} >
<Grid item xs={12} md={3}   >

                        <Field fullwidth
                          placeholder="name manager"
                          name={`TrainingCourses.${index}.namemanager`}
                          type="text"
                          as={TextField}
                          variant="outlined" 
                          label= "name manager"


                        />
                        </Grid>
                        <Grid item xs={12} md={3}   >

                        <Field fullwidth
                          placeholder="name course"
                          name={`TrainingCourses.${index}.namecourse`}
                          type="text"
                          as={TextField}
                          variant="outlined" 
                          label="name course"

                        />
                        </Grid>
                        <Grid item xs={12} md={4}   >

                        <Field fullwidth style={{width: '100%'}}
                          name={`TrainingCourses.${index}.employees`}
                          type="select"
                          as={Select}
                        
                          multiple
                          variant="outlined" 
                     
                        >
 
                
                        
                          <MenuItem value="ahmad">ahmad</MenuItem>
                          <MenuItem value="mohammed">mohammed</MenuItem>
                          <MenuItem value="mahmoud">mahmoud</MenuItem>
                
                        </Field>
                        </Grid>
                        <Grid item xs={12} md={2}   >

                        <Button onClick={() => arrayHelpers.remove(index)} color='secondary' variant="contained" style={{padding:'12px'}}>
                        remove
                        </Button>
                        </Grid>   

                     </Grid>

                      </div>
          
                    );
                  })}

<Grid  container spacing={5} style={{marginTop: '10px'}}>

<Grid item xs={12} md={3}   >
<Button color='primary'   variant="contained" style={{width: '100%',padding:'12px'}}
onClick={() =>
arrayHelpers.push({
employees: [],
namemanager: "",
namecourse: "",
id: "" + Math.random()
})
}
>
add item
</Button>
</Grid>
</Grid>
                </div>
              )}
            </FieldArray>
            <div>
        
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
      </div>
    </div>
  );
};

export default Addtraning2;