import React, { Component } from 'react';
import PropTypes from 'prop-types';     // werkt in zowel class- als niet-class components

import Aux from '../../../hoc/Aux';
import AuthContext from '../../../context/auth-context';
import withClass from '../../../hoc/withClass';
import cssImports from './Kat.css';     // in webpack.config.js > het was iets met cssReget? en test en webloader geloof ik. En 64.5.

class Kat extends Component {
    // hypothetisch, als we het invoerveld van Dikkie Dik willen selecteren (niet de inhoud, maar focus op dat veld)...
    // componentDidMount() {
    //     document.querySelector('input').focus();
    // }
    // ...dan focust ie nu op die zwarte, omdat doc.qsel gewoon het eerste pakt wat ie kan vinden dat aan de beschrijving ('input') voldoet, en hij kijkt gewoon naar de hele DOM/pagina, niet naar wat er als laatst is gerenderd
    // Wat wel werkt, is ref gebruiken op het bedoelde html/JSX-element en dan dit uithalen:
    // componentDidMount() {       // ref-methode #1
    //     this.invoerVeld.focus();
    // }   // in tegenstelling tot document.querySelector kiest React hier dus niet het eerste beste ref dat ie op de pagina kan vinden... maar kennelijk de laatste die gerenderd werd? Discount Jonas zegt dat eigenlijk niet specifiek.

    constructor(props) {        // ref-methode #2 (vanaf React 16.3). Waarin je eerst een prop maakt en die gelijktstelt aan een reactmethode createRef (da's een object...), die prop in de render invult met waar de ref naar verwijst, en dan in ComDidMount die focus erop pleurt. Het is vast ergens goed voor maar hier is het superomslachtig
        super(props)
        this.invoerVeldRef = React.createRef();
    }

    static contextType = AuthContext;   // static zodat je er van buitenaf bij kan (?). React 16.6 en class-only: zodat je de info in je context niet alleen via het <consumer>ding bij je JSX kunt gebruiken, maar ook in bijvoorbeeld ComponentDidMount. Dat contextType is een verplichte term. <-- = 'setting up a static property'. Alrighty then.

    componentDidMount() {       // ref-methode #2
        this.invoerVeldRef.current.focus();     // en de current is verplicht, want... je wilt het element waar de ref currently naar verwijst, denk ik. 
        console.log(this.context.authenticated) // zo kun je bij je contextobject dat we via contextType = AuthContext toegankelijk hebben gemaakt
    }

    render() {
        return (
            <Aux>
                {/* <AuthContext.Consumer>   // Deze methode werkt in components met en zonder class
                    {(context) => context.authenticated ? <p>Kat is okee</p> : <p>Kat moet inloggen lol</p>}
                </AuthContext.Consumer> */}
                    {this.context.authenticated ? <p>Kat is okee</p> : <p>Kat moet inloggen lol</p>  /* deze kortere methode werkt alleen in class components */ }
                <p onClick={this.props.klik}>{this.props.name} is a neighborhood tomcat and {this.props.status}.</p>
                <p >{this.props.children}</p>
                <input 
                //ref={(invoerv) => {this.invoerVeld = invoerv}} // ref-methode #1 ref is... React's manier van ergens een stickertje op plakken als verwijzing, met het element waar je ref op zet als parameter in de functie. In dit geval maken we van dit specifieke invoerveld een globale prop, zodat we hem elders kunnen gebruiken. Bijvoorbeeld hierboven in componentDidMount.
                ref={this.invoerVeldRef}                         // ref-methode #2
                type='text' 
                onChange={this.props.tik} 
                value={this.props.name}/>
            </Aux>
        )   // children is dus de gereserveerde term voor het spul tussen de open- en sluitingstag, niet een prop die we zelf in de tag zelf neerplempen. Dat spul kan van alles zijn, ook een andere Reactcomponent
    }
};

// PropTypes is een hulpje voor developers dat aangeeft welke props een component verwacht en wat voor type props het zijn (age is just a stri- ehm, no wait)
Kat.propTypes = {     // in een functionele component zou dat 'kat' zijn, iig zo'n component is stiekem een object, waar we de speciale key 'propTypes' aan toevoegen en die dan de value geven die we willen mbt de props en hun eigenschappen
    klik: PropTypes.func,
    name: PropTypes.string,
    status: PropTypes.string,
    tik: PropTypes.func
}   // dus als ik nu in de Poes state de naam van die zwarte in 666 verander, krijg ik een error dat een string was verwacht

export default withClass(Kat, cssImports.Kat);

/* Voor het returnen van JSX met meerdere roots maak je er een array van, die React zelf omzet. Wel wil React dan keys voor de verschillende elementen:

        return (
            [<p key="key1" onClick={this.props.klik}>{this.props.name} is a  neighborhood tomcat and {this.props.status}.</p>,
            <p key="key2" >{this.props.children}</p>,
            <input key="key3" type='text' onChange={this.props.tik} value={this.props.name}/>]
        )

Een tweede methode is met Aux, zie ook import op regel [ergens bovenaan] en de map hoc (higher order component) met Aux.js
        return (
            <Aux>
                <p onClick={this.props.klik}>{this.props.name} is a  neighborhood tomcat and {this.props.status}.</p>
                <p >{this.props.children}</p>
                <input type='text' onChange={this.props.tik} value={this.props.name}/>
            </Aux>
        )

Variant 3 is zonder apart bestandje, met een Aux-functie die vanaf React 16.2 al is ingebouwd:
        return (
            <React.Fragment>
                <p onClick={this.props.klik}>{this.props.name} is a  neighborhood tomcat and {this.props.status}.</p>
                <p >{this.props.children}</p>
                <input type='text' onChange={this.props.tik} value={this.props.name}/>
            </React.Fragment>
        )

En als je dat <React.Fragment> op die plek maar niks vindt, dan import je in regel 1
import React, { Component, Fragment } from 'react';

en maak je er <Fragment> van.

Het simpelste is in dit geval overigens nog steeds die div met className, zie hieronder ook
*/



/*
import React from 'react';
import cssImports from './Kat.css';     // in webpack.config.js > het was iets met cssReget? en test en webloader geloof ik. En 64.5.

const kat = (props) => {
    return (
        <div className={cssImports.Kat}>
            <p onClick={props.klik}>{props.name} is a  neighborhood tomcat and {props.status}.</p>
            {/* ^hier ontvangen we dus een prop met referentie aan een methode, zodat we vanuit deze domme component toch de state in de slimme oudercomponent kunnen veranderen }
            <p>{props.children}</p>
            <input type='text' onChange={props.tik} value={props.name}/>
                {/* ^we krijgen de valse melding dat we geen onChange-handler hebben, omdat de andere twee katten die niet hebben (wel dat veld) }
        </div>
    )   // children is dus de gereserveerde term voor het spul tussen de open- en sluitingstag, niet een prop die we zelf in de tag zelf neerplempen. Dat spul kan van alles zijn, ook een andere Reactcomponent
};

export default kat;
*/
// dit is een stateless component, ofwel dumb component, ofwel functional component, ofwel presentational component, 'zonder interne logica' (terwijl het dus een functie is hè!)
// je wilt dat zoveel mogelijk components dumb zijn

// Is het sociaal acceptabel om degene die 4 verschillende termen heeft bedacht voor 1 ding af te schieten, of...? Nee? Oh.




// versie met Radium
// import React from 'react';
// import Radium from 'radium';
// import './Kat.css';

// const kat = (props) => {
//     const style = {
//         '@media (min-width: 500px)': {
//             width: '450px'
//         }
//     };

//     return (
//         <div className="Kat" style={style} >
//             <p onClick={props.klik}>{props.name} is a  neighborhood tomcat and {props.status}.</p>
//             {/* ^hier ontvangen we dus een prop met referentie aan een methode, zodat we vanuit deze domme component toch de state in de slimme oudercomponent kunnen veranderen */}
//             <p>{props.children}</p>
//             <input type='text' onChange={props.tik} value={props.name}/>
//                 {/* ^we krijgen de valse melding dat we geen onChange-handler hebben, omdat de andere twee katten die niet hebben (wel dat veld) */}
//         </div>
//     )   // children is dus de gereserveerde term voor het spul tussen de open- en sluitingstag, niet een prop die we zelf in de tag zelf neerplempen. Dat spul kan van alles zijn, ook een andere Reactcomponent
// };

// export default Radium(kat);
