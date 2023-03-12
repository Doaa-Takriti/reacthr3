import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';

import Button from '@mui/material/Button';
import { useFormik} from "formik";
import {  useNavigate,useParams} from "react-router-dom";

import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { toast, ToastContainer } from 'react-toastify';

import Chip from '@mui/material/Chip';
import { ThemeContext } from "../context/themeContext";
import audio from "../assests/audio.mp3"


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


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



function EditEmployee() {
  const [value2, setValue2] = React.useState('');


  const { id } = useParams();
  console.log ("id",id)
  const [value, setValue] = React.useState(0);
  const { toggleFunction,toggleNavbar,darkMode1,toggleMode} = React.useContext(ThemeContext);
  console.log("darkMode1", darkMode1)
  useEffect(() => {
    fetch(`http://localhost:4000/allemployee/${id}`).then(resp => resp.json())
    .then(resp =>    setValue2(resp)
    
    )

  }, []);

  console.log("kkkk",value2.name);
  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };
  function play () {
    new Audio(audio).play()
  }
  const theme = useTheme();

  const navigate=useNavigate();

  const navigate2=useNavigate();


  function getStyles(name, personName, theme) {
    return {
      fontWeight:
      values.languages.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
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
    console.log(empdata)

    fetch(`http://localhost:4000/allemployee/${id}`,{
      method:"PUT",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(empdata)
    }).then((res)=>{

      navigate('/allemployee');
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
  enableReinitialize: true,

    initialValues: {
        name: value2.name,
        lastname:"",
        birthcity:"",
        phonenumber:"",
        email:"",
        Nationality:"",
        date:"",
        address:"",
        section:"",
        Sector:"",
        jobtitle:"",
        idemployee:"",
        supervisor_jobtitle:"",
        name_of_supervisor:"",
        Maintasks:"",
        JobObjective:"",
        Additionaltasks:"",
        Previousjobtitle:"",
        timejob:"",
        PreviousCompany:"",
        Reasonforleavingwork:"",
        salary:"",
        Certificate:"",
        RequiredExperience:"",
        skills:"",
        languages: []
    

      

    


    
      
    },
    onSubmit,
});
let personName = values.languages


  return (
    <div  className={toggleNavbar ? "contetleft" : "content"}> 

        <div style={{marginTop: '100px'}}>

        <div id="tap1" className={darkMode1 ? "tapdark" : "tapwhite"} >
        <form onSubmit={handleSubmit} autoComplete="off">

    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange2} aria-label="basic tabs example">
          <Tab label="personal information" {...a11yProps(0)} />
          <Tab label="Job Description" {...a11yProps(1)} />
          <Tab label="Tasks and duties" {...a11yProps(2)} />
          <Tab label="Work Experience" {...a11yProps(3)} />      
              <Tab label="Education & Experience" {...a11yProps(4)} />



        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <div>
      <Grid  container spacing={5} >
<Grid item xs={12} md={4}  >
<TextField fullWidth  label="first name" variant="outlined"
        value={values.name}
        InputLabelProps={{
          shrink: true,
        }}
        
        name='name'
        onChange={handleChange}
        id="name"
        type="text"
        placeholder="Enter your first name"
        onBlur={handleBlur}
        /></Grid>


<Grid item xs={12} md={4}  >

<TextField fullWidth  label="last name" variant="outlined"
        value={values.lastname}
        name='lastname'
        onChange={handleChange}
        id="lastname"
        type="text"
        placeholder="Enter your last name"
        onBlur={handleBlur}
        /></Grid>

<Grid item xs={12} md={4}  >

<TextField fullWidth  label="birth  city" variant="outlined"
        value={values.birthcity}
        name='birthcity'
        onChange={handleChange}
        id="birthcity"
        type="text"
        placeholder="Enter your birthcity"
        onBlur={handleBlur}
        /></Grid>

<Grid item xs={12} md={4}  >

<TextField fullWidth  label="phone number" variant="outlined"
        value={values.phonenumber}
        name='phonenumber'
        onChange={handleChange}
        id="phonenumber"
        type="text"
        placeholder="Enter your phonenumber"
        onBlur={handleBlur}
        /></Grid>
        <Grid item xs={12} md={4}  >

<TextField fullWidth  label="email" variant="outlined"
        value={values.email}
        name='email'
        onChange={handleChange}
        id="email"
        type="email"
        placeholder="Enter your email"
        onBlur={handleBlur}
        /></Grid>
                <Grid item xs={12} md={4}  >

<TextField fullWidth  label="Nationality" variant="outlined"
        value={values.Nationality}
        name='Nationality'
        onChange={handleChange}
        id="Nationality"
        type="text"
        placeholder="Enter your Nationality"
        onBlur={handleBlur}
        /></Grid>
                        <Grid item xs={12} md={4}  >

<TextField fullWidth  label="" variant="outlined"
        value={values.date}
        name='date'
        onChange={handleChange}
        id="date"
        type="date"
        onBlur={handleBlur}
        /></Grid>
                                <Grid item xs={12} md={4}  >


        <TextField fullwidth style={{width:'100%'}}
          id="outlined-multiline-static"
          label="address"
          multiline
          rows={4}
          onChange={handleChange}
          onBlur={handleBlur}
name="address"
         value={values.address}
         
        />
        </Grid>


</Grid>

                  







     </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Grid  container spacing={5} >
<Grid item xs={12} md={4}  >
<TextField fullWidth  label="section" variant="outlined"
        value={values.section}
        name='section'
        onChange={handleChange}
        id="section"
        type="text"
        placeholder="Enter section"
        onBlur={handleBlur}
        autoFocus
        />
 </Grid>
 <Grid item xs={12} md={4}  >
<TextField fullWidth  label="section" variant="outlined"
        value={values.section}
        name='section'
        onChange={handleChange}
        id="section"
        type="text"
        placeholder="Enter section"
        onBlur={handleBlur}
        />
 </Grid>
 <Grid item xs={12} md={4}  >
<TextField fullWidth  label="section" variant="outlined"
        value={values.section}
        name='section'
        onChange={handleChange}
        id="section"
        type="text"
        placeholder="Enter section"
        onBlur={handleBlur}
        />
 </Grid>
 <Grid item xs={12} md={4}  >
<TextField fullWidth  label="sector" variant="outlined"
        value={values.sector}
        name='sector'
        onChange={handleChange}
        id="sector"
        type="text"
        placeholder="Enter sector"
        onBlur={handleBlur}
        />
 </Grid>
 <Grid item xs={12} md={4}  >
<TextField fullWidth  label="jobtitle" variant="outlined"
        value={values.jobtitle}
        name='jobtitle'
        onChange={handleChange}
        id="jobtitle"
        type="text"
        placeholder="Enter jobtitle"
        onBlur={handleBlur}
        />
 </Grid>
 <Grid item xs={12} md={4}  >
<TextField fullWidth  label="idemployee" variant="outlined"
        value={values.idemployee}
        name='idemployee'
        onChange={handleChange}
        id="idemployee"
        type="number"
        placeholder="Enter idemployee"
        onBlur={handleBlur}
        />
 </Grid>
 <Grid item xs={12} md={4}  >
<TextField fullWidth  label="supervisor_jobtitle" variant="outlined"
        value={values.supervisor_jobtitle}
        name='supervisor_jobtitle'
        onChange={handleChange}
        id="supervisor_jobtitle"
        type="text"
        placeholder="Enter supervisor_jobtitle"
        onBlur={handleBlur}
        />
 </Grid>
 <Grid item xs={12} md={4}  >
<TextField fullWidth  label="name_of_supervisor" variant="outlined"
        value={values.name_of_supervisor}
        name='name_of_supervisor'
        onChange={handleChange}
        id="name_of_supervisor"
        type="text"
        placeholder="Enter name_of_supervisor"
        onBlur={handleBlur}
        />
 </Grid>
 </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Grid  container spacing={5} >

      <Grid item xs={12} md={4}  >


<TextField style={{width: '100%'}}
  id="outlined-multiline-static"
  label="Maintasks"
  multiline
  rows={4}
  onChange={handleChange}
  onBlur={handleBlur}
name="Maintasks"
 value={values.Maintasks}
/>
</Grid>
<Grid item xs={12} md={4}  >


<TextField style={{width: '100%'}}
  id="outlined-multiline-static"
  label="JobObjective"
  multiline
  rows={4}
  onChange={handleChange}
  onBlur={handleBlur}
name="JobObjective"
 value={values.JobObjective}
/>
</Grid>
<Grid item xs={12} md={4}  >


<TextField style={{width: '100%'}}
  id="outlined-multiline-static"
  label="Additionaltasks"
  multiline
  rows={4}
  onChange={handleChange}
  onBlur={handleBlur}
name="Additionaltasks"
 value={values.Additionaltasks}
/>
</Grid>
</Grid>
      </TabPanel>
          <TabPanel value={value} index={3}>
                  <Grid  container spacing={5} >
<Grid item xs={12} md={4}  >
<TextField fullWidth  label="Previous job title" variant="outlined"
        value={values.Previousjobtitle}
        name='Previousjobtitle'
        onChange={handleChange}
        id="Previousjobtitle"
        type="text"
        placeholder="Enter Previousjobtitle"
        onBlur={handleBlur}
        />
 </Grid>
 <Grid item xs={12} md={4}  >
 <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={values.timejob}
    label="time job"
    name="timejob"
    onChange={handleChange}
    onBlur={handleBlur}

  >
    <MenuItem value={10}>month</MenuItem>
    <MenuItem value={20}>year</MenuItem>
  </Select>
</FormControl>
 </Grid>
 <Grid item xs={12} md={4}  >
<TextField fullWidth  label="PreviousCompany" variant="outlined"
        value={values.PreviousCompany}
        name='PreviousCompany'
        onChange={handleChange}
        id="PreviousCompany"
        type="text"
        placeholder="Enter PreviousCompany"
        onBlur={handleBlur}
        />
 </Grid>
  <Grid item xs={12} md={4}  >
<TextField fullWidth  label="salary" variant="outlined"
        value={values.salary}
        name='salary'
        onChange={handleChange}
        id="salary"
        type="number"
        placeholder="Enter salary"
        onBlur={handleBlur}
        />
 </Grid>
 <Grid item xs={12} md={4}  >


<TextField style={{width: '100%'}}
  id="outlined-multiline-static"
  label="Reason for leaving work"
  multiline
  rows={4}
  onChange={handleChange}
  onBlur={handleBlur}
name="Reasonforleavingwork"
 value={values.Reasonforleavingwork}
/>
</Grid>
 </Grid>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <Grid  container spacing={5} >
<Grid item xs={12} md={4}  >
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Certificate</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={values.Certificate}
    label="Certificate"
    name="Certificate"
    onChange={handleChange}
    onBlur={handleBlur}

  >
    <MenuItem value={30}>master</MenuItem>
    <MenuItem value={40}>Doctor</MenuItem>
    <MenuItem value={50}> Higher Education Diploma</MenuItem>
    <MenuItem value={60}> Commercial Vocational Technical Education</MenuItem>

    <MenuItem value={70}> Institute above average of two years</MenuItem>
    <MenuItem value={80}>  Bachelor degree</MenuItem>
  </Select>
</FormControl>

  </Grid>
  <Grid item xs={12} md={4}  >
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Experiences</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={values.Experiences}
    label="Experiences"
    name="Experiences"
    onChange={handleChange}
    onBlur={handleBlur}

  >
    <MenuItem value={90}>master</MenuItem>
    <MenuItem value={100}>Doctor</MenuItem>
    <MenuItem value={110}> Higher Education Diploma</MenuItem>
    <MenuItem value={120}> Commercial Vocational Technical Education</MenuItem>

    <MenuItem value={130}> Institute above average of two years</MenuItem>
    <MenuItem value={140}>  Bachelor degree</MenuItem>
  </Select>
</FormControl>

  </Grid>
 
  <Grid item xs={12} md={4}  >
  <TextField fullWidth  label="Required Experience" variant="outlined"
        value={values.RequiredExperience}
        name='RequiredExperience'
        onChange={handleChange}
        id="RequiredExperience"
        type="text"
        placeholder="Enter  Required Experience"
        onBlur={handleBlur}
        />
 
</Grid>
<Grid item xs={12} md={4}  >
  <TextField fullWidth  label="skills" variant="outlined"
        value={values.skills}
        name='skills'
        onChange={handleChange}
        id="skills"
        type="text"
        placeholder="Enter skills"
        onBlur={handleBlur}
        />
 
</Grid>
<Grid item xs={12} md={4}  >
<FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={values.languages}
          onChange={handleChange}
          onBlur={handleBlur}
name="languages"
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
</Grid>

  </Grid>
      </TabPanel>
   
   
    </Box>
    <Grid  container spacing={5} >
    <Grid item xs={12} md={8}  mt={8} > 
    </Grid>
    <Grid item xs={12} md={2}  mt={8} >
<br/>
<br/>
<Button  disabled={isSubmitting} type="submit" variant="contained" style={{width:'100%',padding:'12px'}}>ADD EMPLOYEE</Button>
<br/>
<br/>
</Grid>
<Grid item xs={12} md={2}  mt={8} >
<br/>
<br/>
<Button onClick={() => navigate2(-1)}  color="primary" variant="outlined" style={{width:'100%',padding:'12px'}}>cancel</Button>
<br/>
<br/>
</Grid>

      </Grid>
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

export default EditEmployee