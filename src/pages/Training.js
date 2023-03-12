import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { CsvBuilder } from 'filefy';
import { CiSaveDown2 } from 'react-icons/ci';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { json, useNavigate } from 'react-router-dom';
import {  Grid, Typography, Divider ,TablePagination} from '@material-ui/core'


import { ThemeContext } from "../context/themeContext";
import audio from "../assests/audio.mp3"


function Training() {
  const { toggleNavbar } = React.useContext(ThemeContext);


    const url = "http://localhost:4000/training"
    const [data, setData] = useState([])
    const [selectedRows, setSelectedRows] = useState()
    const navigate= useNavigate()
   
const trainingTotal = data.reduce((trainingTotal, data) => 
(!isNaN(data.Totaltrainingdays) ? trainingTotal + data.Totaltrainingdays : trainingTotal), 0)

console.log(trainingTotal); 

    function play () {
      new Audio(audio).play()
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
        .then(resp => setData(resp))
     
    }
  const  columns=[
    { title: 'id', field: 'id' },

        { title: 'Name', field: 'name' },
        { title: 'Number of trainees', field: 'Numberoftrainees' },
        { title: 'Number of groups', field: 'Numberofgroups' },
        {
          title: 'training days',
          field: 'trainingdays'
     
        },
        {
            title: ' Total training days',
            field: 'Totaltrainingdays'
       
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
    return (
      <div  className={toggleNavbar ? "contetleft" : "content"}> 
      <MaterialTable style={{marginTop:'100px'}}
        title="All courses"
        columns={columns}
        onSelectionChange={(rows) => setSelectedRows(rows)}
        data={query =>
          new Promise((resolve, reject) => {
            // prepare your data and then call resolve like this:
            let url = 'http://localhost:4000/training?'
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
        components={{
          Pagination: (props) => <>
            <Grid container style={{ padding:15}}>
              <Grid sm={7} item><Typography variant="subtitle2" style={{fontWeight: 'bold' , color: 'red', fontSize: '20px'}}>Total :</Typography></Grid>
              <Grid sm={5} item align="center"><Typography variant="subtitle2" style={{fontWeight: 'bold' , color: 'red', fontSize: '20px'}}>{trainingTotal}</Typography></Grid>
            </Grid>
            <Divider/>
            <TablePagination {...props} />

          </>
        }}
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

            navigate('Addtraining')
            }
          }
        ]}


     
      />
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
  export default Training