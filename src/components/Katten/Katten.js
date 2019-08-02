import React, { Component } from 'react';
import Kat from './Kat/Kat';
// de update lifecycle wordt in dit geval getriggerd door de naam van een kat te veranderen, waardoor de props veranderen en dus eea moet worden geüpdatet
class Katten extends Component {
    // static getDerivedStateFromProps(props, state) { return state; }  // fase 1 van update lifecycle - (dit vindt React hier niet leuk, want er is geen initial state)
    // componentWillReceiveProps() {}                                   // verdwijnt
    shouldComponentUpdate(nextProps, nextState) { 
        console.log('katten.js shouldcomponentupdate');
        if (nextProps.cats !== this.props.cats) {   // als state.katten veranderd is, updaten, anders niet. DiscountJonas merkt erbij op dat hier alleen de pointers worden vergeleken, niet het hele katten-object, en dit werkt alleen maar omdat hij bij de typeNameHandler en shoeAwayHandler een kopie maakt met de spread operator ipv de oorspronkelijke array te muteren. 
            return true;
        } else {
            return false;
        }
    }     // fase 2 van update lifecycle - je MOET true of false retourneren (doorgaans als resultaat van een if), want hier kun je dus god spelen en React vertellen dat ie niet moet updaten. Potentieel een erg slecht plan, zie Bruce Almighty
    
    getSnapshotBeforeUpdate(prevProps, prevState) { 
        console.log('katten.js getsnapshotbeforeupdate');
        return { message: "snapshot" } ;
    }   // fase 3 van update lifecycle - deze kun je voor een update gebruiken om precies op te slaan waar de gebruiker mee bezig was en dan bijv automatisch naar dezelfde plek op de pagina scrollen
    // componentWillUpdate                                              // ook weg
    componentDidUpdate(prevProps, prevState, snapshot) {  // snapshot komt dus bij getSnapshotBeforeUpdate vandaan! :-)
        console.log('katten.js componentdidupdate')
        console.log(snapshot);
    }                                          // fase 5 van update lifecycle
    // componentWillUnmount                                             // waarin je code zet die hier runt en meteen erna verwijderd wordt, als ik het goed begrijp

    render() {                                                          // fase 4 van update lifecycle
        return this.props.cats.map((cat, index) => {
            return <Kat
                      key={cat.id}
                      name={cat.name} 
                      status={cat.status} 
                      klik={() => this.props.shoo(index)}
                      tik={(event) => this.props.typed(event, cat.id)}  />
          }); // als return statement op 1 regel past (wat kennelijk niet inhoudt dat het niet letterlijk op meerdere regels mag staan maar dat je het op dezelfde regel begint...), dan kun je het woord 'return' weglaten
    }
}

export default Katten;

// rendertip: in Chrome, Ctrl+Shift+J > ... > More settings > Rendering > Paint flashing     -->  nu kun je zien (met groene waas) wat er in de echte DOM (opnieuw) gerenderd wordt

/*
import React from 'react';
import Kat from './Kat/Kat';

const katten = (props) => props.cats.map((cat, index) => {
    return <Kat
              key={cat.id}
              name={cat.name} 
              status={cat.status} 
              klik={() => props.shoo(index)}
              tik={(event) => props.typed(event, cat.id)}  />
  })
; // als return statement op 1 regel past (wat kennelijk niet inhoudt dat het niet letterlijk op meerdere regels mag staan maar dat je het op dezelfde regel begint...), dan kun je het woord 'return' weglaten

export default katten;
*/