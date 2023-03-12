import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid, Button } from '@material-ui/core'
import FormDialog from './dialog';
import _ from 'lodash';
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'

const initialValue = { name: "", email: "", phone: "", dob: "" }
function Table5() {
  const [gridApi, setGridApi] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue)
  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    // console.log(searchText)
    if (gridApi) {
      onGridReady(gridApi)
    }
  }, [searchText])

  const search = _.debounce((text) => {
    // console.log(text)
    setSearchText(text)
  }, 1000)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue)
  };
  const url = `http://localhost:4000/users`
  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name",filter: "agTextColumnFilter" },
    { headerName: "Email", field: "email", filter: "agTextColumnFilter"},
    { headerName: "phone", field: "phone" ,filter: "agTextColumnFilter"},
    { headerName: "Date of Birth", field: "dob",filter: "agTextColumnFilter" },
    {
      headerName: "Actions", field: "id", cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
      }), cellRendererFramework: (params) => <div>
        <AiFillEdit className='icon-edit' onClick={() => handleUpdate(params.data)}/>
        <AiFillDelete  className='icon-delete' onClick={() => handleDelete(params.value)}/>
      </div>
    }
  ]
  // calling getUsers function for first time 
  useEffect(() => {
    getUsers()
  }, [])

  //fetching user data from server
  const getUsers = () => {
    fetch(url).then(resp => resp.json()).then(resp => setTableData(resp))
  }
  const onChange = (e) => {
    const { value, id } = e.target
    // console.log(value,id)
    setFormData({ ...formData, [id]: value })
  }
  const datasource = {
    getRows(params) {
      console.log(JSON.stringify(params.request, null, 1));
      const { filterModel, sortModel } = params.request
      let url = `http://localhost:4000/users?`
        //Quick filter
        if (searchText) {
            url += `q=${searchText}&`
          }
      //Sorting
      if (sortModel.length) {
        const { colId, sort } = sortModel[0]
        url += `_sort=${colId}&_order=${sort}&`
      }
      //Filtering
      const filterKeys = Object.keys(filterModel)
      filterKeys.forEach(filter => {
        url += `${filter}=${filterModel[filter].filter}&`
      })
    
       //Pagination
      fetch(url)
        .then(httpResponse => httpResponse.json())
        .then(response => {
          params.successCallback(response, 499);
        })
        .catch(error => {
          console.error(error);
          params.failCallback();
        })
    }
  };
  
  const onGridReady = (params) => {
    setGridApi(params);
    // register datasource with the grid
    params.api.setServerSideDatasource(datasource);
  }

  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData)
    handleClickOpen()
  }
  //deleting a user
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure, you want to delete this row", id)
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" }).then(resp => resp.json()).then(resp => getUsers())

    }
  }
  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a user 
      const confirm = window.confirm("Are you sure, you want to update this row ?")
      confirm && fetch(url + `/${formData.id}`, {
        method: "PUT", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()

        })
    } else {
      // adding new user
      fetch(url, {
        method: "POST", body: JSON.stringify(formData), headers: {
          'content-type': "application/json"
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()
        })
    }
  }

  const defaultColDef = {
    sortable: true,
    flex: 1, filter: true,
    floatingFilter: true,
    cellStyle: () => ({
      display: "flex",
      alignItems: "center",
    })
  }
  const onExportClick=()=>{
    gridApi.api.exportDataAsCsv();
  }

    const onPaginationChange=(pageSize)=>{
        gridApi.api.paginationSetPageSize(Number(pageSize))
      }
      const rowSelectionType='multiple'
  return (
    <div className="">
                  <button onClick={()=>onExportClick()}>Export</button>
      <select onChange={(e)=>onPaginationChange(e.target.value)}>
        <option value='10'>10</option>
        <option value='25'>25</option>
        <option value='50'>50</option>
        <option value='100'>100</option>
      </select>
      <input type="search" placeholder="Search something..." onChange={e => search(e.target.value)}
        style={{ padding: 10, fontSize: "105%", width: "100%", outline: 0 }} />
      
      <Grid align="right">
        <Button variant="contained" color="primary" onClick={handleClickOpen}>Add user</Button>
      </Grid>
      <div className="ag-theme-alpine" >
        <AgGridReact
        rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          pagination={true}
          domLayout="autoHeight"

          rowMultiSelectWithClick={true}

          paginationPageSize={8}

          rowSelection={rowSelectionType}
          cacheQuickFilter={true}


        />
      </div>
      <FormDialog open={open} handleClose={handleClose}
        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default Table5;