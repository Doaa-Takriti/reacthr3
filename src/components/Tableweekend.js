import React, { useState,useEffect } from 'react';
import MaterialTable from 'material-table'
import NameCustomComponent from './NameCustomComponent';
import {Link} from '@material-ui/core';
import {Checkbox,Select,MenuItem, TablePagination,MuiThemeProvider, createMuiTheme, FormControlLabel, Switch, Grid, Typography, Divider } from '@material-ui/core'
import { CsvBuilder } from 'filefy';
import { CiSaveDown2 } from 'react-icons/ci';

const empList = [
  { id: 1, name: "Neeraj", email: 'neeraj@gmail.com', status: 0, dob: '01/09/1998' ,year: 2019 },
  { id: 2, name: "Raj", email: 'raj@gmail.com', status: 1, dob: '11/06/1999' ,year: 2020 },
  { id: 3, name: "David", email: 'david342@gmail.com', status: 1, dob: '08/26/1995',year: 2017  },
  { id: 4, name: "Vikas", email: 'vikas75@gmail.com', status: 0, dob: '02/20/2000',year: 2019  },
  { id: 5, name: "Neeraj", email: 'neeraj@gmail.com', status: 0, dob: '01/09/1998',year: 2019  },
  { id: 6, name: "Raj", email: 'raj@gmail.com', status: 1, dob: '11/06/1999',year: 2019  },
  { id: 7, name: "David", email: 'david342@gmail.com', status: 1, dob: '08/26/1995',year: 2019  },
  { id: 8, name: "Vikas", email: 'vikas75@gmail.com', status: 0, dob: '02/20/2000',year: 2019  },
]

function Tableweekend() {
  const [filteredData,setFilteredData]=useState(empList)
  const [filter, setFilter]=useState(true)
  const [year,setYear]=useState('all')
  const [preferDarkMode, setPreferDarkMode] = useState(() => {
    const mode = localStorage.getItem('_tableDarkMode')
    return mode === "true" || false
  })

  const [data, setData] = useState(empList)
  const [selectedRows, setSelectedRows] = useState([])


  const columns = [
    { title: "ID", field: 'id' , editable: false,grouping:false },
    {
      title: "Name", field: "name", render: (row) => <NameCustomComponent name={row.name} 

      />
    },
    { title: "Email", field: "email" 
    ,
    validate: rowData => {
      if (rowData.email === undefined || rowData.email === "") {
        return "Required"
      } else if (!rowData.email.includes('@' && '.')) {
        return "Enter valid email address"
      }
      return true
    }},
    {title:"Profile"
    ,render:rowData=><Link href={`/user?id=${rowData.id}`} target="_blank">Profile</Link>},

    {
      title: "Status", field: 'status', lookup: { 0: "Inactive", 1: "Active" }, validate: rowData => {
        if (rowData.status === undefined || rowData.status === "") {
          return "Required"
        }
        return true
      }, render: (row) => <div className={row.status ? "active" : "deactive"}>
        {row.status ? "Active" : "Deactive"}
      </div>
    },
    { title: "Date of Birth", field: "dob",   },
    { title: "Joining Year", field: 'year' }

  ]
  const handleChange=()=>{
    setFilter(!filter)
   }
   useEffect(()=>{
 setFilteredData(year==='all'?empList:empList.filter(dt=>dt.year===year))
 
   },[year])
  const theme = createMuiTheme({
    palette: {
      type: preferDarkMode ? 'dark' : 'light'
    }
  })

  const handleDarkModeChange = () => {
    setPreferDarkMode(!preferDarkMode)
    localStorage.setItem('_tableDarkMode', !preferDarkMode)
  }
  const handleBulkDelete = () => {
    const updatedData = filteredData.filter(row => !selectedRows.includes(row))
    setFilteredData(updatedData)

  }
  const exportAllSelectedRows=()=>{
  

    new CsvBuilder("tableData.csv")
     .setColumns(columns.map(col=>col.title))
     .addRows(selectedRows.map(rowData=>columns.map(col=>rowData[col.field])))
     .exportFile();
  }   

  return (
    <div className="table1">
        <FormControlLabel
        value="top"
        control={<Switch color="primary" checked={preferDarkMode} />}
        onChange={handleDarkModeChange}
        label="Dark Mode"
        labelPlacement="top"
      />
       <MuiThemeProvider theme={theme}>
      <MaterialTable
        title="weekend table"
        data={filteredData}
        onSelectionChange={(rows) => setSelectedRows(rows)}

        columns={columns}
        components={{
          Pagination: (props) => <>
            <Grid container style={{ padding:15}}>
              <Grid sm={6} item><Typography variant="subtitle2">Total</Typography></Grid>
              <Grid sm={6} item align="center"><Typography variant="subtitle2" >Number of rows : {props.count}</Typography></Grid>
            </Grid>
            <Divider/>
            <TablePagination {...props} />
          </>
        }}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const updatedRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...data]
            updatedRows[index]=updatedRow
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onBulkUpdate:selectedRows=>new Promise((resolve,reject)=>{
            const rows=Object.values(selectedRows)
            const updatedRows=[...data]
            let index;
            rows.map(emp=>{
               index=emp.oldData.tableData.id
               updatedRows[index]=emp.newData
            })
            setTimeout(()=>{
              setData(updatedRows)
              resolve()
            },2000)
          
          })

      

        }}
 
        options={{
          actionsColumnIndex: -1, addRowPosition: "first",
          grouping:true,
          filtering:filter,
          selection: true,
          columnsButton:true,
        


        }}
        actions={[
          {
            icon:()=><Checkbox
            checked={filter}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />,
          tooltip:"Hide/Show Filter option",
          isFreeAction:true
          },
          {
            icon:()=><Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{width:100}}
            value={year}
            onChange={(e)=>setYear(e.target.value)}
          >
             <MenuItem value={"all"}><em>All</em></MenuItem>
            <MenuItem value={2019}>2019</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
          </Select>,
          tooltip:"Filter Year",
          isFreeAction:true
          },
          {
            icon: 'delete',
            tooltip: "Delete all selected rows",
            onClick: () => handleBulkDelete()
          }
          ,
          {
            icon: ()=><CiSaveDown2/>,
            tooltip: "Export all selected rows",
            onClick: () => exportAllSelectedRows()
          }
        ]}
    

      />
      </MuiThemeProvider>
    </div>
  );
}

export default Tableweekend;