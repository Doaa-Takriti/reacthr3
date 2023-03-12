import React from 'react';
import Container from 'react-bootstrap/Container';
import Tape1 from "../components/Tape1"
import CrouselHome from "../components/CrouselHome"



const Home = () => {
  return (
    <div className="home">
        <Container>
    <Tape1/>
    <CrouselHome />
    </Container>
    </div>
  )
}

export default Home