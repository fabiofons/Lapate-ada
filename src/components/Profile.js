import React from 'react';
import {
  Navbar, NavbarToggler, Nav, NavItem, Button,
  Collapse, Row, Col, Progress, 
  Card, CardText, CardBody, CardTitle, CardSubtitle
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import store from '../store';
import { removeMatch, toggleLogin } from '../actionCreators';

const gray = {
  borderRight: '1px solid gray',
  padding: '20px'
};

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      matches: store.getState().matches,
      user: store.getState().user
    };
    
    store.subscribe(() => {
      this.setState({
        matches: store.getState().matches,
        user: store.getState().user
      })
    })
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Navbar color="dark" dark expand="md">
            <div className='container'>
              <NavLink className="navbar-brand" to="/">La Pateada</NavLink>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <Button color="danger" onClick={this.handleSubmit} href="/">Cerrar sesión</Button>
                  </NavItem>             
                </Nav>
              </Collapse>
            </div>          
          </Navbar>
        </div>
        <div className="container">
          <Row className="mt-5">
            <Col md="4" style={gray} className="p-3">
              <h1>{this.state.user.nickname}</h1>
              <h5>{this.state.user.email}</h5>
              <div>
                <h6>Nivel de Juego:</h6>
                <Progress className='my-2' color="success" value={this.state.user.level*100/5}>{this.state.user.level*100/10}%</Progress>
              </div>
              <div>
                <h6>Puntualidad:</h6>
                <Progress className='my-2' color="info" value={this.state.user.repute*100/5}>{this.state.user.repute*100/5}%</Progress>
              </div>
            </Col>
            <Col md="1">
            </Col>
            <Col md="7">
              <h1>Partidos:</h1>
              <Col md="8">
                {this.state.user.matches && this.state.matches.filter(games => games.players.includes(this.state.user.id)).map(m => {
                  return <Card key={m._id} className='mt-2'>
                    <CardBody key={m._id+1}>
                      <CardTitle key={m.gameName}><h5>{m.gameName}</h5></CardTitle>
                      <CardSubtitle key={m.date}>{m.date}</CardSubtitle>
                      <CardText key={m.place}>
                        <b>{m.place}</b><br></br>
                        Recuerda estar 15 minutos antes del partido, eso asegura que el partido comience puntual.<br></br>
                        <b>Ten excelente Pateada</b>
                      </CardText>
                      <Button color="info" onClick={() => this.handleDelete(m._id)}> Salirse de esta pateada </Button>
                    </CardBody>
                  </Card>                  
                  })}
              </Col>                
            </Col>
          </Row>
        </div>
      </React.Fragment>
    )
  };

  handleDelete = (event) => {
    store.dispatch(removeMatch(event))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
    store.dispatch(toggleLogin(false));
    this.props.history.push(`/`);
  };
    
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
}

export default Profile;
