// bij grotere apps kan het nuttig zijn niet in één keer de hele app te renderen (in bundle.js, kun je zien in Ctrl-Shift-J > Network), maar slechts een gedeelte en de rest dan pas te renderen als de gebruiker het ook echt nodig heeft ('lazy loading'. Eerder efficiënt lijkt me. Wie zijn gemak niet zoekt is lui :-P  ). Om dat te doen moet je de boel opsplitsen. Deze manier kan kennelijk alleen/het beste via create-react-app, wat suggereert dat er meer manieren zijn om een react app te creëren. Alrighty then.
import React, { Component } from 'react';

const asyncComponent = (importComponent) => {       // importComponent is een functie
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount () {
            importComponent()
                .then(cmp => {      // dus we ontvangen tzt (vandaar asynchroon) een functie die een component bevat (een default export?) en gooien die na ontvangst hier in de state
                    this.setState({component: cmp.default})
                })
        }

        render () {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;    // als er een C is, render het kreng met eventuele props en al
        }
    }
}

export default asyncComponent;