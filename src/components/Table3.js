import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { CsvBuilder } from 'filefy';
import { CiSaveDown2 } from 'react-icons/ci';
const getLocalItems = () => {
  let list = localStorage.getItem('lists')
  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return []
  }
}

function Table3() {
  const url = "http://localhost:4000/students"
  const [data, setData] = useState([])
  const [selectedRows, setSelectedRows] = useState()
 

  useEffect(() => {
    getStudents()
  }, [])



  const getStudents = () => {
    fetch(url).then(resp => resp.json())
      .then(resp => setData(resp))
  }



  const columns = [
    { title: "ID", field: "id" },

    { title: "Name", field: "name", validate: rowData => rowData.name === undefined || rowData.name === "" ? "Required" : true },
    {
      title: "Email", field: "email",
      validate: rowData => rowData.email === undefined || rowData.email === "" ? "Required" : true
    },
    {
      title: "Year", field: "year",
      validate: rowData => rowData.year === undefined || rowData.year === "" ? "Required" : true
    },
    {
      title: "Fee", field: 'fee',
      validate: rowData => rowData.fee === undefined || rowData.fee === "" ? "Required" : true
    }]
    const handleBulkDelete = () => {
      const updatedData = data.filter(row => !selectedRows.includes(row))
      setData(updatedData)

        localStorage.setItem("lists",JSON.stringify(updatedData));
      
  
    }
    const exportAllSelectedRows=()=>{
    
  
      new CsvBuilder("tableData.csv")
       .setColumns(columns.map(col=>col.title))
       .addRows(selectedRows.map(rowData=>columns.map(col=>rowData[col.field])))
       .exportFile();
    } 
   
  return (
    <div className="App">
      <MaterialTable
        title="Student Details"
        columns={columns}
        onSelectionChange={(rows) => setSelectedRows(rows)}
        data={query =>
          new Promise((resolve, reject) => {
            // prepare your data and then call resolve like this:
            let url = 'http://localhost:4000/students?'
            //searching
            if (query.search) {
              url += `q=${query.search}`
            }
            //sorting 
            if (query.orderBy) {
              url += `&_sort=${query.orderBy.field}&_order=${query.orderDirection}`
            }
            //filtering
            if (query.filters.length) {
              const filter = query.filters.map(filter => {
                return `&${filter.column.field}${filter.operator}${filter.value}`
              })
              url += filter.join('')
            }
            //pagination
            url += `&_page=${query.page + 1}`
            url += `&_limit=${query.pageSize}`

            fetch(url).then(resp => resp.json()).then(resp => {
              resolve({
                data: resp,// your data array
                page: query.page,// current page number
               

              });
            })

          })
        }
        options={{ actionsColumnIndex: -1, addRowPosition: "first" ,
        filtering: true,
        selection: true,
        columnsButton:true}}
        editable={{
          onRowAdd: (newData) => new Promise((resolve, reject) => {
            //Backend call
            fetch(url, {
              method: "POST",
              headers: {
                'Content-type': "application/json"
              },
              body: JSON.stringify(newData)
            }).then(resp => resp.json())
              .then(resp => {
                getStudents()
                resolve()
              })
          }),
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
            //Backend call
            fetch(url + "/" + oldData.id, {
              method: "PUT",
              headers: {
                'Content-type': "application/json"
              },
              body: JSON.stringify(newData)
            }).then(resp => resp.json())
              .then(resp => {
                getStudents()
                resolve()
              })
          }),
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
            //Backend call
            fetch(url + "/" + oldData.id, {
              method: "DELETE",
              headers: {
                'Content-type': "application/json"
              },

            }).then(resp => resp.json())
              .then(resp => {
                getStudents()
                resolve()
              })
          })
        }}
        actions={[
       
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
    </div>
  );
}

export default Table3;