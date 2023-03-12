import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from "react-paginate";
import axios from "axios"



const EmpListing = () => {
    const [empdata, empdatachange] = useState([]);
    
  const [pageCount, setpageCount] = useState(0);
  const [query, setQuery] = useState("");


  let limit = 3;
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/employee/detail/" + id);
    }
    const LoadEdit = (id) => {
        navigate("/employee/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:5000/employee/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }


    useEffect(() => {
        const getComments = async () => { 
          const res = await fetch(
            `http://localhost:5000/employee?_page=1&_limit=${limit}`
            // `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
          );
          const data = await res.json();
          const total = res.headers.get("x-total-count");
          setpageCount(Math.ceil(total / limit));
          // console.log(Math.ceil(total/12));
          empdatachange(data);
        }

        getComments();
      }, [limit]);
    

      useEffect(() => {
        const fetchData = async () => {
          const res = await axios.get(`http://localhost:5000/employee?q=${query}`);
          empdatachange(res.data);
        };
        if (query.length === 0 || query.length > 2) fetchData();
      }, [query]);
    
    const fetchComments = async (currentPage) => {
        const res = await fetch(
          `http://localhost:5000/employee?_page=${currentPage}&_limit=${limit}`
          // `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
        );
        const data = await res.json();
        return data;
      };
    
      const handlePageClick = async (data) => {
        console.log(data.selected);
    
        let currentPage = data.selected + 1;
    
        const commentsFormServer = await fetchComments(currentPage);
    
        empdatachange(commentsFormServer);
        // scroll to the top
        //window.scrollTo(0, 0)
      };
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="employee/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <input
          className="search"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
                    <Table striped bordered hover>
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>

                            {empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
                                        </td>
                                    </tr>
                                ))
                          
                            }

                        </tbody>

                    </Table>
                    
                    {empdata &&
                                empdata.map(item => (
                                    <div>
                                    {item.id}
                                    </div>
                                    ))
                          
                                }

                    
                </div>
            </div>
            <ReactPaginate
                                previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination justify-content-center"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active"}
                              />    

        </div>
    );
}

export default EmpListing;