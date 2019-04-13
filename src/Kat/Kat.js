import React from 'react';
import './Kat.css';

const kat = (props) => {
    return (
        <div className="Kat">
            <p onClick={props.klik}>{props.name} is a  neighborhood tomcat and {props.status}.</p>
            {/* ^hier ontvangen we dus een prop met referentie aan een methode, zodat we vanuit deze domme component toch de state in de slimme oudercomponent kunnen veranderen */}
            <p>{props.children}</p>
            <input type='text' onChange={props.tik} value={props.name}/>
                {/* ^we krijgen de valse melding dat we geen onChange-handler hebben, omdat de andere twee katten die niet hebben (wel dat veld) */}
        </div>
    )   // children is dus de gereserveerde term voor het spul tussen de open- en sluitingstag, niet een prop die we zelf in de tag zelf neerplempen. Dat spul kan van alles zijn, ook een andere Reactcomponent
};

export default kat;

// dit is een stateless component, ofwel dumb component, ofwel functional component, ofwel presentational component, 'zonder interne logica' (terwijl het dus een functie is hè!)
// je wilt dat zoveel mogelijk components dumb zijn

// Is het sociaal acceptabel om degene die 4 verschillende termen heeft bedacht voor 1 ding af te schieten, of...? Nee?




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
