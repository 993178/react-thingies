// import React, { Component } from 'react';
// import './Poes.css';
// import Kat from './Kat/Kat'; // namen van componenten etc altijd met hoofdletter, kleine letters zijn voor de html-elementen

// class Poes extends Component {
//   state = {
//     cats: [
//       { name: 'That black one', status: "is a PITA" },
//       { name: "That light grey tabby", status: "Emma seems to like him" },
//       { name: "Dikkie Dik", status: "is welcome" }
//     ],
//     ourCat: { name: 'Emma', status: 'murdered a bird today...'}
//   }

//   switchNameHandler = () => {
//     //console.log('don\'t you EVER click me again you bastard');
//     //niet doen: this.state.cats[0].name = 'That $%#$% black one';
//     this.setState({cats: [
//       { name: 'That $%*&^ black one', status: "is a PITA" },
//       { name: "That light grey tabby", status: "Emma seems to like him" },
//       { name: "Dikkie Dik", status: "we'll pet him if he wants us to" }
//     ]})
//   }

//   render() {
//     return (
//       <div className="Poes">
//         <button onClick={this.switchNameHandler}>Switch name</button>
//         <Kat name={this.state.cats[0].name} status={this.state.cats[0].status}>We've had to chase him out of the yard so Em could go take a dump</Kat>
//         <Kat name={this.state.cats[1].name} status={this.state.cats[1].status} />
//         <Kat name={this.state.cats[2].name} status={this.state.cats[2].status} />        
//       </div>
//     );
//   }
// }

// export default Poes;

// React hook versie
import React, { useState } from 'react';
import './Poes.css';
import Kat from './Kat/Kat'; // namen van componenten etc altijd met hoofdletter, kleine letters zijn voor de html-elementen

const poes = props => {
  const [ catState, setCatState ] = useState({      // is altijd een array (?? zie ik niet) met 2 elementen: de state zoals je die in class-based componenten hebt (dit is een functional component), en......
    cats: [
      { name: 'That black one', status: "is a PITA" },
      { name: "That light grey tabby", status: "Emma seems to like him" },
      { name: "Dikkie Dik", status: "is welcome" }
    ],
    ourCat: { name: 'Emma', status: 'murdered a bird today...'}
  });

  const switchNameHandler = () => {
    //console.log('don\'t you EVER click me again you bastard');
    //niet doen: this.state.cats[0].name = 'That $%#$% black one';
    setCatState({cats: [
      { name: 'That $%*&^ black one', status: "is a PITA" },
      { name: "That light grey tabby", status: "Emma seems to like him" },
      { name: "Dikkie Dik", status: "we'll pet him if he wants us to" }
    ]});
  };

    return (
      <div className="Poes">
        <button onClick={switchNameHandler}>Switch name</button>
        <Kat name={catState.cats[0].name} status={catState.cats[0].status}>We've had to chase him out of the yard so Em could go take a dump</Kat>
        <Kat name={catState.cats[1].name} status={catState.cats[1].status} />
        <Kat name={catState.cats[2].name} status={catState.cats[2].status} />        
      </div>
    );
}

export default poes;




