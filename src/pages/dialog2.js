import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export default function FormDialog2({open,handleClose,data,onChange,handleFormSubmit}) {
 const {id,name,time,days,salary,imageUrl,jobtitle}=data

  return (
    <div>
      <Dialog className="dialog2"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">add salary</DialogTitle>
        <DialogContent>
         <form>
         <TextField id="imageUrl" type="file" value={imageUrl} onChange={e=>onChange(e)} placeholder="Enter imageUrl"  variant="outlined" margin="dense" fullWidth />

             <TextField id="name" value={name} onChange={e=>onChange(e)} placeholder="Enter name" label="Name" variant="outlined" margin="dense" fullWidth />
             <TextField id="time" type="date" value={time} onChange={e=>onChange(e)}   variant="outlined" margin="dense" fullWidth />
             <TextField id="days" type="number" value={days} onChange={e=>onChange(e)} placeholder="Enter days" label="days" variant="outlined" margin="dense" fullWidth />
             <TextField id="salary" type="number" value={salary} onChange={e=>onChange(e)} placeholder="Enter salary" label="salary" variant="outlined" margin="dense" fullWidth />
             <TextField id="jobtitle"  value={jobtitle} onChange={e=>onChange(e)} placeholder="Enter jobtitle" label="jobtitle" variant="outlined" margin="dense" fullWidth />

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