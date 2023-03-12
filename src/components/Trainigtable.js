import React, {useEffect,useState} from 'react';
import { Table } from 'antd';





function Trainigtable() {
  const [employeeslist, setemployees] = useState(null)
  useEffect(() => {
      getemployees()
  }, [])
  const getemployees = () => {
      fetch("http://localhost:4000/trainingusers")
          .then(res => res.json())
          .then(
              (result) => {                    
                  setemployees(result)
              },
              (error) => {
                  setemployees(null);
              }
          )
  }
  console.log(employeeslist)

  
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      width: 100,
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
      width: 250,
    },
    
  {
    title: 'Column 1',
    dataIndex: 'address1',
    key: '1',
  },
  {
    title: 'Column 2',
    dataIndex: 'address2',
    key: '2',
  },
  {
    title: 'Column 3',
    dataIndex: 'address3',
    key: '3',
  },
  {
    title: 'body',
    dataIndex: 'body',
    key: 'body',
    fixed: 'right',
      width: 350,
  },
  
  ];
return (
  <Table
    columns={columns}
    dataSource={employeeslist}
    pagination={true}
    scroll={{
      x: 1300,
    }}
  />


)};
export default Trainigtable;