import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'
import { CsvBuilder } from 'filefy';
import { CiSaveDown2 } from 'react-icons/ci';

function Table2() {

  const [data, setData] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    { title: "ID", field: "id" },
    { title: "Username", field: "username" },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
    { title: "Web Link", field: 'website' }
  ]
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(resp => resp.json())
      .then(resp => {
        setData(resp)
      })
  }, [])
  const handleBulkDelete = () => {
    const updatedData = data.filter(row => !selectedRows.includes(row))
    setData(updatedData)

  }
  const exportAllSelectedRows=()=>{
  

    new CsvBuilder("tableData.csv")
     .setColumns(columns.map(col=>col.title))
     .addRows(selectedRows.map(rowData=>columns.map(col=>rowData[col.field])))
     .exportFile();
  }   


  return (
    <div className="">
    
      <MaterialTable
        title="Employee Data"
        onSelectionChange={(rows) => setSelectedRows(rows)}
        data={data
        }
        columns={columns}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
  
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                
                resolve()
              }, 1000)
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
          filtering: true,
          selection: true,
          columnsButton:true

    



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

export default Table2;