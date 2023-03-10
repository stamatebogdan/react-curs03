import React from 'react';
// ATENTIE! Nu uitati sa importati componentele create!
import UserList from './components/UserList';
import './App.css';
import UserAddForm from './components/UserAddForm';

class App extends React.Component {
  constructor() {
    // MOUNTING: cand componenta este montata(incarcata), prima metoda apelata este constructor
    console.log('Constructor called!');
    super();
    // Pentru a putea prelucra informatia userilor, trebuie sa le tinem datele in state
    // structura adecvata este un vector de obiecte.
    this.state = {
      background: 'white',
      // Pana sa vina datele despre useri de la API, users va fi un array gol.
      users: []
    };
  }

  // MOUNTING: Cand componenta se termina de montat(a rulat render() pentru prima oara) este apelata
  // metoda componentDidMount.
  componentDidMount() {
    console.log('App component finished mounting!');
    // ATENTIE! De cele mai multe ori, vom primi datele despre userii nostri de la un API. Daca vrem doar
    // sa afisam niste date primite in pagina, am vrea sa le cerem o singura data: cand montam pagina. Mai
    // precis, cand terminam de montat pagina, vrem sa si aducem datele de la API(backend).
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        // Dupa ce transformam rezultatul request-ului in JSON, putem sa actualizam state-ul cu datele primite.
        this.setState({users: data});
      })
  }

  // UPDATING: de fiecare data cand o componenta este actualizata (i se schimba state-ul cu un apel de
  // setState() sau primeste din exterior props-uri diferite), pe langa reapelarea metodei render(),
  // la finalul actualizarii este apelata metoda componentDidUpdate.
  componentDidUpdate() {
    console.log('App component was updated!');
  }

  changeColor(event) {
    this.setState({background: event.target.value});
    console.log(this.state.background);
  }

  updateUsersList(user){
    //Daca in parametrii lui SetState vedeti this.state => GRESIT
    this.setState({users: [...this.state.users, user]});

    //Daca setState primeste o functie ca parametru
    //functia respectiva primeste ca parametru VALOAREA PRECEDENTA A STARII
    this.setState((previousState) => {
      return {
        users: [...previousState.users, user]
      }
    });
  }

  render() {
    console.log(this.state.background);
    // MOUNTNG: Cand componenta este montata, dupa constructor() este apelata metoda render
    // UPDATING: Cand componenta este actualizata, este apelata metoda render
    // Asadar, tineti minte: render este o metoda care face parte atat din ciclul de montare,
    // cat si din cel de actualizare.
    console.log('App component rendered!');
    return(
      <div className="app" style={{background: this.state.background}}>
        <h1>PROIECT 1</h1>

      <UserAddForm updateUSersList={(user) => {this.updateUsersList(user)}}/>

        {/* De data asta, avand o lista de useri, ne vom crea comonenta UserList,
        careia ii vom pasa ca props informatiile din state-ul curent. */}
        {/* Am adaugat si o conditie suplimentara: lista de useri va fi afisata
        doar daca utilizatorul nu selecteaza culoarea de fundal negru. Conditia e adaugata
        pentru a intelege componentWillUnmount. Detalii in componenta UserList. */}
        { this.state.background !== '#000000'
            ? <UserList users={this.state.users}/>
            : null
        }
        <input type="color" onChange={(event) => this.changeColor(event)}/>
      </div>
    );
  }
}

export default App;
