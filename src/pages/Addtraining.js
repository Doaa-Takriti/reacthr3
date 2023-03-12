import TextField from '@mui/material/TextField';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import { useFormik} from "formik";
import { useNavigate } from "react-router-dom";

import Grid from '@mui/material/Grid';
import { toast, ToastContainer } from 'react-toastify';

import { ThemeContext } from "../context/themeContext";
import audio from "../assests/audio.mp3";
import Divider from '@mui/material/Divider';
import Addtraning2 from '../components/Addtraning2';
import Trainingneed from '../components/Trainingneed';
import Trainigtable from '../components/Trainigtable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



function Addtraining() {
  const [value, setValue] = React.useState(0);
  const { toggleFunction,toggleNavbar,darkMode1,toggleMode} = React.useContext(ThemeContext);

  console.log("darkMode1", darkMode1)
 
  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };
  function play () {
    new Audio(audio).play()
  }

  const navigate=useNavigate();

  const navigate2=useNavigate();
  




  const notify3 = () => toast.success('🦄 Saved successfully!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });;

  const onSubmit = async (values, actions) => {
    play()
    notify3()
   

    console.log(values);
    console.log(actions);
    await new Promise((resolve) => setTimeout(resolve, 6000));
    const empdata=values;
    

    fetch("http://localhost:4000/training",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(empdata)
    }).then((res)=>{

      navigate('/training');
    }).catch((err)=>{
      console.log(err.message)
    })

    actions.resetForm();
  
  
  
  }; 
  const {
    values,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
} = useFormik({
    initialValues: {
        name: "",
      job:"",
        section:"",
        manager:"",
        datejob:"",
        jobtasks:"",
        RequiredSkills:"",
        requiredProgram:"",
        pets: [{ type: [], name: "jarvis", id: "" + Math.random() }]

   

       


      

    

      

    


    
      
    },
    onSubmit,
});



  return (
    <div  className={toggleNavbar ? "contetleft" : "content"}> 

        <div style={{marginTop: '100px'}}>

        <div id="tap1" className={darkMode1 ? "tapdark" : "tapwhite"} >
      

        <form onSubmit={handleSubmit} autoComplete="off">

    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange2} aria-label="basic tabs example">
          <Tab label="Determine daily needs" {...a11yProps(0)} />
          <Tab label="Training Needs Preparation Checklist" {...a11yProps(1)} />
        
          <Tab label="  Training Needs Assessment Form" {...a11yProps(2)} />

        



        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <div>
      <Grid  container spacing={5} >
<Grid item xs={12} md={4}  >
<TextField fullWidth  label="name" variant="outlined"
        value={values.name}
        name='name'
        onChange={handleChange}
        id="name"
        type="text"
        placeholder="Enter name"
        onBlur={handleBlur}
        /></Grid>


<Grid item xs={12} md={4}  >
<TextField fullWidth  label="job" variant="outlined"
        value={values.job}
        name='job'
        onChange={handleChange}
        id="job"
        type="text"
        placeholder="Enter job"
        onBlur={handleBlur}
        /></Grid>

<Grid item xs={12} md={4}  >
<TextField fullWidth  label="section" variant="outlined"
        value={values.section}
        name='section'
        onChange={handleChange}
        id="section"
        type="text"
        placeholder="Enter section"
        onBlur={handleBlur}
        /></Grid>

<Grid item xs={12} md={4}  >
<TextField fullWidth  label="manager" variant="outlined"
        value={values.manager}
        name='manager'
        onChange={handleChange}
        id="manager"
        type="text"
        placeholder="Enter manager"
        onBlur={handleBlur}
        /></Grid>

<Grid item xs={12} md={4}  >
<TextField fullWidth   variant="outlined"
        value={values.datejob}
        name='datejob'
        onChange={handleChange}
        id=" datejob"
        type="date"
        placeholder="Enter Date of joining the job"
        onBlur={handleBlur}
        /></Grid>

<Grid item xs={12} md={4}  >


</Grid>
<Grid item xs={12} md={4}  >


<TextField fullwidth style={{width:'100%'}}
  id="outlined-multiline-static"
  label="What are the main job tasks you actually exercising?"
  multiline
  rows={4}
  onChange={handleChange}
  onBlur={handleBlur}
name="jobtasks"
 value={values.jobtasks}
 
/>
</Grid>







</Grid>
<Divider style={{marginTop: '50px', marginBottom: '50px'}} />
<h3 style={{marginBottom: '40px'}}>Suggested Training Courses</h3>
<Addtraning2/>
           

<Grid  container spacing={5} >


<Grid item xs={12} md={8}   >

</Grid>

<Grid item xs={12} md={2}  >
<br/>
<br/>
<Button  disabled={isSubmitting} type="submit" variant="contained" style={{width:'100%',padding:'12px'}}>ADD EMPLOYEE</Button>
<br/>
<br/>
</Grid>
<Grid item xs={12} md={2}   >
<br/>
<br/>
<Button onClick={() => navigate2(-1)}  color="primary" variant="outlined" style={{width:'100%',padding:'12px'}}>cancel</Button>
<br/>
<br/>
</Grid>    
</Grid>     

     </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
       <Trainingneed/>

</TabPanel>

<TabPanel value={value} index={2}>
       <Trainigtable/>

</TabPanel>
   
   
    </Box>
    </form>   
      
    <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

       </div>
       </div>
       </div>
  )
}

export default Addtraining