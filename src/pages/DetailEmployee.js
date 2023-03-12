import React, { useEffect ,useState} from 'react';
import {  useNavigate, useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


import Acordioneditemployee from "../components/Acordioneditemployee"


function DetailEmployee() {
    const [user, setUser] = useState(null);
    const [active, setActive] = useState('salary');

    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { id } =  useParams()

    const navigate2=useNavigate();

  
    useEffect(() => {
      setTimeout(() => {
        fetch(`http://localhost:4000/allemployee/${id}`)
        .then(res => {
          if (!res.ok) { // error coming back from server
            throw Error('could not fetch the data for that resource');
          } 
          return res.json();
        })
        .then(data => {
          setIsPending(false);
          setUser(data);
          setError(null);
        })
        .catch(err => {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        })
      }, 1000);
    }, [])
  
  return (
    <div className="content">
        <div style={{marginTop: '100px'}}>
    { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { user && <div>
                   
<Grid  container spacing={2} >


<Grid item xs={12} md={3}  >

        <Card >
      <Card.Img variant="top" src="https://clikngo.com/wp-content/uploads/2019/05/man4.jpg" />
      <Card.Body>
        <Card.Title>mohammed ahmad</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>id : {user.id}</ListGroup.Item>
        <ListGroup.Item > <Card.Link onClick={() => setActive("salary")} href="#">salary</Card.Link></ListGroup.Item>
        <ListGroup.Item><Card.Link onClick={() => setActive("weekend")} href="#">weekend</Card.Link></ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
    </Grid>
    <Grid item xs={12} md={9}   >
      {active === "salary" &&
     <Acordioneditemployee user={user} />
      }
        {active === "weekend" &&
     <div>
kkk
      </div>
      }
    </Grid>
 
    </Grid>
    <Grid  container spacing={5} >
    <Grid item xs={12} md={8}  mt={8} > 
    </Grid>
    <Grid item xs={12} md={2}  mt={8} >
<br/>
<br/>
<br/>
<br/>
</Grid>
<Grid item xs={12} md={2}  mt={8} >
<br/>
<br/>
<Button onClick={() => navigate2(-1)}  color="secondary" variant="contained" style={{width:'100%',padding:'12px'}}>Back</Button>
<br/>
<br/>
</Grid>

      </Grid>
      </div> }


        </div>
        </div>
  
  )

  }

export default DetailEmployee