//dit is een stateful component, ofwel een smart component, ofwel een container component waarin wel een state zit en interne logica
// van deze components wil je er zo min mogelijk

import React, { Component } from 'react';
import './Poes.css';
import Kat from './Kat/Kat'; // namen van componenten etc altijd met hoofdletter, kleine letters zijn voor de html-elementen

class Poes extends Component {
  state = {
    cats: [
      { name: 'That black one', status: "is a PITA" },
      { name: "That light grey tabby", status: "Emma seems to like him" },
      { name: "Dikkie Dik", status: "is welcome" }
    ],
    ourCat: { name: 'Emma', status: 'murdered a bird today...'}
  }

  switchNameHandler = (newInsult) => {  // nu geven we een parameter mee, die ingevuld wordt bij de 'call' in de button, als tweede argument van de bind-methode
    //console.log('don\'t you EVER click me again you bastard');
    //niet doen: this.state.cats[0].name = 'That $%#$% black one';
    this.setState({cats: [
      { name: newInsult, status: "is a PITA" },
      { name: "That light grey tabby", status: "Emma seems to like him" },
      { name: "Dikkie Dik", status: "we'll pet him if he wants us to" }
    ]})
  }

  typeNameHandler = (event) => {
  this.setState({cats: [
    { name: "That black cat", status: "is a PITA" },
    { name: event.target.value, status: "Emma seems to like him" },
    { name: "Dikkie Dik", status: "is welcome" }
  ]})
}


  render() {
    const style = {             // inline styling... Blah. Het moet element voor element als je het vaker dan 1x wilt toepassen, het staat hier een beetje een unseparated concern te wezen en je kunt geen :hover etc classes gebruiken. Amateuristisch...
      backgroundColor: 'grey',
      font: 'inherit',
      border: '1px solid brown',
      padding: '8px',
      cursor: 'pointer'
    }
    return (
      <div className="Poes">
        <button style={style} onClick={() => this.switchNameHandler('That $%*&^ black one')}>Switch name</button>
          {/* ^methode-als-prop doorgeven met arrowfunctie ipv bind, met argument in de call. Blijkbaar re-rendert React dit ook weleens onnodig, dus het is niet de voorkeursmethode */}
              {/* ^^style en niet this.style omdat ie gewoon in deze zelfde functie staat */}
        <Kat name={this.state.cats[0].name} status={this.state.cats[0].status}>We've had to chase him out of the yard so Em could go take a dump</Kat>
        <Kat 
          name={this.state.cats[1].name} 
          status={this.state.cats[1].status}
          tik={this.typeNameHandler}
          klik={this.switchNameHandler.bind(this, 'That black shitcat')} />  
                {/* ^functie doorgeven als prop */}
        <Kat name={this.state.cats[2].name} status={this.state.cats[2].status} />        
      </div>
    );
  }
}

export default Poes;

// React hook versie
// hierin heb je niet een groot state object, maar eerder verschillende specifieke stukjes met ieder hun eigen setmethode (althans dat zit standaard in useState)
// import React, { useState } from 'react';
// import './Poes.css';
// import Kat from './Kat/Kat'; // namen van componenten etc altijd met hoofdletter, kleine letters zijn voor de html-elementen

// const poes = props => {
//   const [ catState, setCatState ] = useState({      // is altijd een array (?? zie ik niet) met 2 elementen: de state zoals je die in class-based componenten hebt (dit is een functional component), en......
//     cats: [
//       { name: 'That black one', status: "is a PITA" },
//       { name: "That light grey tabby", status: "Emma seems to like him" },
//       { name: "Dikkie Dik", status: "is welcome" }
//     ]
//     //, ourCat: {{ name: 'Emma', status: 'murdered a bird today...'}}   // optie 1; bij 1 grote staat
//   });

//   const [ ourCat, setOurCat ] = useState({ourCat: { name: 'Emma', status: 'murdered a bird today...'}})   // optie 2 om deze info te behouden bij een setState: meerdere useStates

//   const switchNameHandler = () => {           // deze functie is kennelijk het tweede ding in de array van useState?? Vage shit
//     //console.log('don\'t you EVER click me again you bastard');
//     //niet doen: this.state.cats[0].name = 'That $%#$% black one';
//     setCatState({cats: [                                      // BELANGRIJK verschil met class components: deze functie mergt NIET. Alles wat je hier in setState flikkert aan nieuwe data, is voortaan ook de enige data. Wil je de andere dingen ook behouden, dan moet je die hierin kopiëren
//       { name: 'That $%*&^ black one', status: "is a PITA" },
//       { name: "That light grey tabby", status: "Emma seems to like him" },
//       { name: "Dikkie Dik", status: "we'll pet him if he wants us to" }
//     ],
//     //ourCat: catState.ourCat     // optie 1 om deze info te behouden bij setState-acties: herhalen in de setmethode
//   });

//     return (
//       <div className="Poes">
//         <button onClick={switchNameHandler}>Switch name</button>
//         <Kat name={catState.cats[0].name} status={catState.cats[0].status}>We've had to chase him out of the yard so Em could go take a dump</Kat>
//         <Kat name={catState.cats[1].name} status={catState.cats[1].status} />
//         <Kat name={catState.cats[2].name} status={catState.cats[2].status} />        
//       </div>
//     );
// }};

// export default poes;