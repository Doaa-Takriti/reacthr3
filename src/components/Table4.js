import React, { useState ,useEffect} from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import _ from 'lodash'


const Table4 = () => {
  const [gridApi, setGridApi] = useState(null);
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

  const columns = [
    { headerName: "id", field: "id" },
    { headerName: "Athlete", field: "athlete", filter: "agTextColumnFilter" },
    { headerName: "Age", field: "age", filter: "agTextColumnFilter" },
    { headerName: "Country", field: "country", filter: "agTextColumnFilter" },
    { headerName: "Year", field: "year", filter: "agTextColumnFilter" },
    { headerName: "Date", field: 'date', filter: "agTextColumnFilter" },
    { headerName: "Sport", field: 'sport', filter: "agTextColumnFilter" },
    { headerName: "Gold", field: 'gold', filter: "agTextColumnFilter" },
    { headerName: "Silver", field: 'silver', filter: "agTextColumnFilter" },
    { headerName: "Bronze", field: 'bronze', filter: "agTextColumnFilter" },
    { headerName: "Total", field: 'total', filter: "agTextColumnFilter" },
  ]
  const datasource = {
    getRows(params) {
      console.log(JSON.stringify(params.request, null, 1));
      const { startRow, endRow, filterModel, sortModel } = params.request
      let url = `http://localhost:4000/artistas?`
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
  const onExportClick=()=>{
    gridApi.api.exportDataAsCsv();
  }

    const onPaginationChange=(pageSize)=>{
        gridApi.api.paginationSetPageSize(Number(pageSize))
      }
      const rowSelectionType='multiple'

  return (
    <div>
             <button onClick={()=>onExportClick()}>Export</button>
      <select onChange={(e)=>onPaginationChange(e.target.value)}>
        <option value='10'>10</option>
        <option value='25'>25</option>
        <option value='50'>50</option>
        <option value='100'>100</option>
      </select>
      <input type="search" placeholder="Search something..." onChange={e => search(e.target.value)}
        style={{ padding: 10, fontSize: "105%", width: "100%", outline: 0 }} />
      <div className="ag-theme-alpine" style={{ width: '100%'}}>
        <AgGridReact
          columnDefs={columns}
          pagination={true}
          domLayout="autoHeight"
      
          rowMultiSelectWithClick={true}

          paginationPageSize={8}
          rowModelType="serverSide"
          onGridReady={onGridReady}
          defaultColDef={{ filter: true, floatingFilter: true, sortable: true ,
          
            editable:true,
            }}
          cacheQuickFilter={true}
          rowSelection={rowSelectionType}


        />
      </div>
    </div>
  );
};
export default Table4