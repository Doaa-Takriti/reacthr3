import Accordion from 'react-bootstrap/Accordion';
import Tableeditemployee from "./Tableeditemployee";
import Descrptioneditemployee from "./Descrptioneditemployee"
const Acordioneditemployee = (props) => (
  
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>salary {props.user.id}</Accordion.Header>
        <Accordion.Body>
       <Tableeditemployee user={props.user}/>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          <Descrptioneditemployee  />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
);
export default Acordioneditemployee;