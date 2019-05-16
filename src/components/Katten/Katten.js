import React, { Component } from 'react';
import Kat from './Kat/Kat';
// de update lifecycle wordt in dit geval getriggerd door de naam van een kat te veranderen, waardoor de props veranderen en dus eea moet worden geüpdatet
class Katten extends Component {
    // static getDerivedStateFromProps(props, state) { return state; }  // fase 1 van update lifecycle - (dit vindt React hier niet leuk, want er is geen initial state)
    // componentWillReceiveProps() {}                                   // verdwijnt
    // shouldComponentUpdate(nextProps, nextState) { return true; }     // fase 2 van update lifecycle - je MOET true of false retourneren (doorgaans als resultaat van een if), want hier kun je dus god spelen en React vertellen dat ie niet moet updaten. Potentieel een erg slecht plan, zie Bruce Almighty
    // getSnapshotBeforeUpdate(prevProps, prevState) { return message: "snapshot"; }   // fase 3 van update lifecycle - deze kun je voor een update gebruiken om precies op te slaan waar de gebruiker mee bezig was en dan bijv automatisch naar dezelfde plek op de pagina scrollen
    // componentWillUpdate                                              // ook weg
    // componentDidUpdate(prevProps, prevState, snapshot) {}                                          // fase 5 van update lifecycle
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