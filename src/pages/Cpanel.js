import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import ReactPaginate from "react-paginate";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Cpanel = () => {
    const [empdata, empdatachange] = useState([]);
    
  const [pageCount, setpageCount] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  

  const[id,idchange]=useState("");
  const[name,namechange]=useState("");
  const[email,emailchange]=useState("");
  const[phone,phonechange]=useState("");
  const[active,activechange]=useState(true);
  const[validation,valchange]=useState(false);



  let limit = 3;
    const navigate = useNavigate();

 
    

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
      
  const handlesubmit=(e)=>{
    e.preventDefault();
    const empdata={name,email,phone,active};
    

    fetch("http://localhost:5000/employee",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(empdata)
    }).then((res)=>{
      alert('Saved successfully.')
    }).catch((err)=>{
      console.log(err.message)
    })

  }
  


    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>services table</h2>
                </div>
                
      <Modal 
             show={show} onHide={handleClose}
              >
        <Modal.Header closeButton>
          <Modal.Title  id="example-modal-sizes-title-lg">add service dialog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="container" onSubmit={handlesubmit}>

<div className="card" style={{"textAlign":"left"}}>
    <div className="card-title">
        <h2>Employee Create</h2>
    </div>
    <div className="card-body">

        <div className="row">

            <div className="col-lg-12">
                <div className="form-group">
                    <label>ID</label>
                    <input value={id} disabled="disabled" className="form-control"></input>
                </div>
            </div>

            <div className="col-lg-12">
                <div className="form-group">
                    <label>Name</label>
                    <input required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                {name.length==0 && validation && <span className="text-danger">Enter the name</span>}
                </div>
            </div>

            <div className="col-lg-12">
                <div className="form-group">
                    <label>Email</label>
                    <input value={email} onChange={e=>emailchange(e.target.value)} className="form-control"></input>
                </div>
            </div>

            <div className="col-lg-12">
                <div className="form-group">
                    <label>Phone</label>
                    <input value={phone} onChange={e=>phonechange(e.target.value)} className="form-control"></input>
                </div>
            </div>

            <div className="col-lg-12">
                <div className="form-check">
                <input checked={active} onChange={e=>activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                    <label  className="form-check-label">Is Active</label>
                    
                </div>
            </div>
            <div className="col-lg-12">
                <div className="form-group">
                   <button className="btn btn-success" onClick={handleClose} type="submit">Save</button>
                   <Link to="/" className="btn btn-danger" onClick={handleClose}>Back</Link>
                </div>
            </div>

        </div>

    </div>

</div>

</form>
        </Modal.Body>
     
     
      </Modal>
                <div className="card-body">
                    <div className="divbtn">
                        <Button  onClick={handleShow}  className="btn btn-success">Add New (+)</Button>
                    </div>
   
                    <Table striped bordered hover>
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
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
                                     
                                    </tr>
                                ))
                          
                            }

                        </tbody>

                    </Table>
               

                    
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

export default Cpanel;