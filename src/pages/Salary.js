import React, { useState, useEffect, useRef } from 'react';
import MaterialTable from 'material-table';
import { CsvBuilder } from 'filefy';
import { CiSaveDown2 } from 'react-icons/ci';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

import { ThemeContext } from "../context/themeContext";
import audio from "../assests/audio.mp3";
import FormDialog2 from './dialog2';
const initialValue = { name: "", imageUrl: "", jobtitle: "", time: "", days: "", salary: "" }



function Salary() {

  const { toggleNavbar } = React.useContext(ThemeContext);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue)


  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue)
  };

    const url = "http://localhost:4000/salary"
    const [data, setData] = useState([])
    const [selectedRows, setSelectedRows] = useState()
   
    function play () {
      new Audio(audio).play()
    }
    const onChange = (e) => {
 
        const { value, id } = e.target;

        console.log(value,id)
  
        setFormData({ ...formData, [id]: value })
      
     
  
    }
    const notify = () => toast.success('🦄 delete success!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });;
        const notify2 = () => toast.success('🦄 edit success!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });;
    

  
 
            useEffect(() => {
              getStudents()

            }, [])
          
  
    const getStudents = () => {
      fetch(url).then(resp => resp.json())
        .then(resp => setData(resp)

        )

     
    }
  
  const  columns=[
    { title: 'id', field: 'id' },

        { title: 'Avatar', field: 'imageUrl',
        render: rowData => <input type="image" alt="" src={rowData.imageUrl} style={{width: 40, borderRadius: '50%'}}/> },
        { title: 'Name', field: 'name' },
        { title: 'job title', field: 'jobtitle' },
        { title: 'time', field: 'time' ,
      
type:'date',
      lookup: { 2017: 2017, 2019: 2019 }

    },
        {
          title: 'days',
          field: 'days'
         
     
        },
        {
          title: 'salary',
          field: 'salary',
          type: 'numeric'
         
     
        },
      ]
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
      const handleFormSubmit = () => {
     
          // adding new user
          fetch(url, {
            method: "POST", body: JSON.stringify(formData), headers: {
              'content-type': "application/json"
            }
          }).then(resp => resp.json())
            .then(resp => {

              getStudents()
              tableRef.current.onQueryChange()

              handleClose()

            })

        
      }
      const tableRef = useRef();
    return (

      <div  className={toggleNavbar ? "contetleft" : "content"}> 
    
      <MaterialTable style={{marginTop:'100px'}}
        title="All Employee Details"
        tableRef={tableRef}

        columns={columns}
        onSelectionChange={(rows) => setSelectedRows(rows)}
        data={query =>
          new Promise((resolve, reject) => {
            // prepare your data and then call resolve like this:
            let url = 'http://localhost:4000/salary?'
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

            fetch(url).then(resp => resp.json()).then(resp =>
              {

                resolve({
                  data:  resp,// your data array
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
    
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
            play()
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
                notify2()

                resolve()
              })
          }),
          onRowDelete: 
        
          (oldData) => new Promise((resolve, reject) => {
           play()
            //Backend call
            fetch(url + "/" + oldData.id, {
              method: "DELETE",
              headers: {
                'Content-type': "application/json"
              },

            }).then(resp => resp.json())
              .then(resp => {
                getStudents()
                notify()

                resolve()

              })
       

          })
        
     

        }}
        actions={[
       
          {
            icon: 'delete',
            tooltip: "Delete all selected rows",

            onClick: () =>
         
             handleBulkDelete()
          
          }
          ,
          {
            icon: ()=><CiSaveDown2/>,
            tooltip: "Export all selected rows",
            onClick: () =>
            {            play()

             exportAllSelectedRows()
            }
          },
          {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: (event) => {
            play()
            handleClickOpen()          
            }
          }
        ]}


     
      />


   
       <FormDialog2 open={open} handleClose={handleClose}
        data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
   

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
    )
  }
  export default Salary