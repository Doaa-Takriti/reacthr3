import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FormDialog3({open,handleClose,data,onChange,handleFormSubmit}) {
 const {id,name,section,reward,BonusValue,imageUrl,jobtitle,weekenddays,Alternativetransport}=data

  return (
    <div>
      <Dialog className="dialog2"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">add reward</DialogTitle>
        <DialogContent>
         <form>
         <TextField id="imageUrl" name="imageUrl" type="file" value={imageUrl} onChange={e=>onChange(e)} placeholder="Enter imageUrl"  variant="outlined" margin="dense" fullWidth />

             <TextField id="name" name="name" value={name} onChange={e=>onChange(e)} placeholder="Enter name" label="Name" variant="outlined" margin="dense" fullWidth />
             <TextField id="section" name="section" value={section} onChange={e=>onChange(e)}   variant="outlined" placeholder="section" margin="dense" fullWidth />
             <TextField id="BonusValue" name="BonusValue" type="number" value={BonusValue} onChange={e=>onChange(e)} placeholder="%" label="BonusValue" variant="outlined" margin="dense" fullWidth />
             <TextField id="Alternativetransport" name="Alternativetransport" type="number" value={Alternativetransport} onChange={e=>onChange(e)} placeholder="Alternativetransport" label="Alternativetransport" variant="outlined" margin="dense" fullWidth />
             <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">reward</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="reward"
                    value={reward}
          label="reward"
          onChange={e=>onChange(e)}        >
          <MenuItem style={{width: '100%', textAlign: 'left'}} fullWidth value={10}>Ten</MenuItem>
          <MenuItem  style={{width: '100%', textAlign: 'left'}} fullWidth value={20}>Twenty</MenuItem>
          <MenuItem  style={{width: '100%', textAlign: 'left'}} fullWidth value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

             <TextField id="weekenddays" name="weekenddays" type="date" value={weekenddays} onChange={e=>onChange(e)}  variant="outlined" margin="dense" fullWidth />
             <TextField id="jobtitle" name="jobtitle"  value={jobtitle} onChange={e=>onChange(e)} placeholder="Enter jobtitle" label="jobtitle" variant="outlined" margin="dense" fullWidth />

         </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button  color="primary" onClick={()=>handleFormSubmit()} variant="contained">
            submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}