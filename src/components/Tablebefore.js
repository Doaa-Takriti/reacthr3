import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


function Tablebefore() {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th colSpan={1}>#</th>
          <th colSpan={2}></th>
          <th colSpan={2}>Last Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={1}>1</td>
          <td colSpan={2}>Mark</td>
          <td colSpan={2}>   <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="yes" control={<Radio />} label="yes" />
        <FormControlLabel value="no" control={<Radio />} label="no" />
     
      </RadioGroup>
    </FormControl></td>
        </tr>
        <tr>
          <td colSpan={1}>2</td>
          <td colSpan={2}>Mark</td>
          <td colSpan={2}>   <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="yes" control={<Radio />} label="yes" />
        <FormControlLabel value="no" control={<Radio />} label="no" />
     
      </RadioGroup>
    </FormControl></td>
        </tr>
        <tr>
          <td colSpan={1}>1</td>
          <td colSpan={2}>Mark</td>
          <td colSpan={2}>   <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="yes" control={<Radio />} label="yes" />
        <FormControlLabel value="no" control={<Radio />} label="no" />
     
      </RadioGroup>
    </FormControl></td>
        </tr>
        <tr>
          <td colSpan={1}>1</td>
          <td colSpan={2}>Mark</td>
          <td colSpan={2}>   <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="yes" control={<Radio />} label="yes" />
        <FormControlLabel value="no" control={<Radio />} label="no" />
     
      </RadioGroup>
    </FormControl></td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Tablebefore;