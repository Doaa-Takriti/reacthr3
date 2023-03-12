import React, { useState, useEffect,useRef } from 'react';
import MaterialTable from 'material-table';
import { CsvBuilder } from 'filefy';
import { CiSaveDown2 } from 'react-icons/ci';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { ThemeContext } from "../context/themeContext";
import audio from "../assests/audio.mp3";
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { CSVLink} from "react-csv";
import {TbListDetails} from "react-icons/tb"



function Allemployee() {
  
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

 

  const { toggleNavbar } = React.useContext(ThemeContext);


    const url = "http://localhost:4000/allemployee"
    const [data, setData] = useState([])
        const [data2, setData2] = useState([])

    const [selectedRows, setSelectedRows] = useState()


 
    const navigate= useNavigate()
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
  
   /* const getStudents = async () => {
      let result = await fetch ('url', {

        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          
        }
      });
      result = await result.json()
      setData(result)
      setData2(result)
    } */
  
   const getStudents = () => {
    
      fetch(url).then(resp => resp.json())
        .then(resp => {
          setData(resp)
          setData2(resp)

        }
        
        )
      
      
    }
  const  columns=[
    { title: 'id', field: 'id' },

        { title: 'Avatar', field: 'imageUrl', render: rowData => <img alt="" src={rowData.imageUrl} style={{width: 40, borderRadius: '50%'}}/> },
        { title: 'Name', field: 'name',
          customSort: (a, b) => (a.name > b.name ? -1 : 1) },
        { title: 'job title', field: 'jobtitle' },
        { title: 'email', field: 'email' },
        {
          title: 'phone number',
          field: 'phonenumber'
     
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
      <div style={{marginTop:'100px'}}>
        <div>
                    <CSVLink data={data2}>Download me as exel</CSVLink>


          </div>
      
      <MaterialTable 
        title="All Employee Details"
        icons={tableIcons}
        columns={columns}
        onSelectionChange={(rows) => setSelectedRows(rows)}
        data={query =>
          new Promise((resolve, reject) => {
            // prepare your data and then call resolve like this:
            let url = 'http://localhost:4000/allemployee?'
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
        columnsButton:true,
                sorting: true,

        selection: true,
            exportButton: true,

       }}
        editable={{
    
      /*  onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
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
       

          }) */
        
     

        }}
        actions={[
       
             {
            icon: 'delete',
            tooltip: "Delete all selected rows",

            onClick: () =>
         
             handleBulkDelete()
          
          },
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

            navigate('addemployee')
            }
          },
          {
            icon: 'edit',
            tooltip: 'Save User',
            position: "row",
            onClick: (event, rowData) => 
            {
              let  Id = rowData.id
              alert (Id)
           navigate(`EditEmployee/${rowData.id}`)
     
            
            }
          },
         
          {
            icon: ()=><TbListDetails style={{color: 'red'}} />,
            tooltip: 'detail User',
            position: "row",
            onClick: (event, rowData) => 
            {
              let  Id = rowData.id
              alert (Id)
           navigate(`DetailEmployee/${rowData.id}`)
     
            
            }
          },
          {
            icon: ()=><DeleteOutline style={{color: 'green'}} />,
            tooltip: 'Delte User',
            position: "row",
            onClick: (event, rowData) => 
            {
              let  Id = rowData.id
              alert (Id)
           navigate(`DeleteEmployee/${rowData.id}`)
     
            
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
    </div>
    )
  }
  export default Allemployee