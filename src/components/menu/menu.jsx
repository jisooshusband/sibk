import React, { Component } from 'react'
import {
  Container,
  Col,
  Row
} from 'react-bootstrap'
import {
  Calendar,
  Door,
  Flag,
  IdentificationBadge
} from 'phosphor-react'
import Styles from './menu.module.css'

class Menu extends Component {
  render() {
    return(
      <Container fluid className={Styles.container}>

        <div className={Styles.item}>
          <Calendar size={40} />
          <p>Jadwal konseling</p>
        </div>

        <div className={Styles.item}>
          <Flag size={40} />
          <p>Catat Pelanggaran</p>
        </div>

        <div className={Styles.item}>
          <IdentificationBadge size={40} />
          <p>Profil</p>
        </div>

        <div className={Styles.item}>
          <Door size={40} />
          <p>Logout</p>
        </div>

      </Container>
    )
  }
}

export default Menu
