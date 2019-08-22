import React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';
import store from '../store';
import { joinMatch } from '../actionCreators';

class List extends React.Component {
 
  render() {
    return (
      <ListGroup className="my-3">
        <ListGroupItem key="header" active>
          <ListGroupItemHeading >Partidos</ListGroupItemHeading>
        </ListGroupItem>
        {this.props.state.matches.filter(m => m.public).map(m => {
          return <ListGroupItem id={m._id} key={m._id}>
            <ListGroupItemHeading key={m.gameName}>{m.gameName}</ListGroupItemHeading>
            <ListGroupItemText key={m.place} className="my-0">
              Lugar: {m.place}
            </ListGroupItemText>
            <ListGroupItemText key={m.modality} className="my-0">
              Modalidad: {m.modality}
            </ListGroupItemText>
            <ListGroupItemText key={m.date} className="my-0">
              Horario: {m.date}
            </ListGroupItemText>
            <ListGroupItemText key={m.players} className="my-0">
              Numero de Jugadores: {m.players.length}
            </ListGroupItemText>
            
            {this.props.state.islogged && <React.Fragment>
                <ListGroupItemText key={m.price} className="my-0">
                  Precio/jugador: COP {
                    (() => { switch(m.modality) {
                      case 'Futbol 5':
                        return Math.floor(m.price/10);
                      case 'Futbol 7':
                        return Math.floor(m.price/14);
                      case 'Futbol 9':
                        return Math.floor(m.price/10);
                      default:
                        return null;
                      }
                    })()
                  }
                </ListGroupItemText>
                <ListGroupItemText className='my-3'>
                  {m.players.includes(this.props.state.user.id) ? 
                    <Button color="success">Ya estas inscrito</Button> : 
                    <Button color="info" onClick={() => this.handleClick(m._id)}> Unirse a esta pateada </Button>}
                </ListGroupItemText>
              </React.Fragment>
            }
          </ListGroupItem>
        })}
      </ListGroup>
    );
  }

  handleClick = (e) => {
    store.dispatch(joinMatch(e));
  }
}

export default List;