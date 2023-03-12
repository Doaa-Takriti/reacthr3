import React, { useState,useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Table4 ()  {
    const [gridApi,setGridApi]=useState()
 
    const columnDefs= [
        { headerName: "ID", field: "id",checkboxSelection:true,headerCheckboxSelection:true },
        { headerName: "Name", field: "name",}, 
        {headerName: "Email",field: "email",},
        { headerName: "Body", field: "body"},
             ]
     
             const datasource = {
              getRows(params) {
                console.log(JSON.stringify(params.request, null, 1));
                const { startRow, endRow, filterModel, sortModel } = params.request
                let url = `https://jsonplaceholder.typicode.com/comments?`
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
                url += `_start=${startRow}&_end=${endRow}`
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
    
   const defaultColDef = useMemo( ()=> ({
    sortable: true,
    editable:true,
    flex:1,filter:true,floatingFilter:true

 }));
 const onGridReady = (params) => {
    setGridApi(params)
    fetch("https://jsonplaceholder.typicode.com/comments").then(resp => resp.json())
      .then(resp => {
        params.api.applyTransaction({ add: resp }) //adding API data to grid
      })
     
  }
  const onExportClick=()=>{
    gridApi.exportDataAsCsv();
  }
  const searchDivStyle={backgroundColor:"#dedede",padding:10}
const searchStyle={width:"100%",padding:"10px 20px",borderRadius:20,outline:0,
border:"2px #68bf40 solid",fontSize:"100%"}
    //define selection type single or multiple
    const rowSelectionType='multiple'

    //function will trigger once selection changed
    const onSelectionChanged=(event)=>{
      console.log(event.api.getSelectedRows())
    }
  
    //function to allow selection to row
    const isRowSelectable=(node)=>{
      return true
    }
    const onPaginationChange=(pageSize)=>{
        gridApi.api.paginationSetPageSize(Number(pageSize))
      }
      const onFilterTextChange=(e)=>{
        gridApi.api.setQuickFilter(e.target.value)
      }
  
   return (
    <div>              <button onClick={()=>onExportClick()}>Export</button>
      <select onChange={(e)=>onPaginationChange(e.target.value)}>
        <option value='10'>10</option>
        <option value='25'>25</option>
        <option value='50'>50</option>
        <option value='100'>100</option>
      </select>
      <div style={searchDivStyle}>
      <input type="search" style={searchStyle} onChange={onFilterTextChange} placeholder="search somethings..."/>
      </div>
      <div className="ag-theme-alpine" style={{height: '500px', width: '100%'}}>

<AgGridReact
    columnDefs={columnDefs}
    defaultColDef={defaultColDef}
    onGridReady={onGridReady}
    enableBrowserTooltips={true}
    rowSelection={rowSelectionType}
    onSelectionChanged={onSelectionChanged}
    rowMultiSelectWithClick={true}
    isRowSelectable={isRowSelectable}
    pagination={true}
    paginationPageSize={10}
    cacheQuickFilter={true}

    
 >
</AgGridReact>
</div>
    </div>


     
   );
};
export default Table4;
