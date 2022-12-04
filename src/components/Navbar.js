import React from 'react'
import { Navbar, Container } from 'react-bootstrap'

// styles
import "./Navbar.css"

export default function NavbarComponent() {

  return (
    <Navbar bg="success">
      <Container>
        <h2>Calorie Counter</h2>
      </Container>
    </Navbar>
  )
}
