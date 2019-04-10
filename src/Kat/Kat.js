import React from 'react';

const kat = (props) => {
    return (
        <div>
            <p>{props.name} is a  neighborhood tomcat and {props.status}.</p>
            <p>{props.children}</p>
        </div>
    )   // children is dus de gereserveerde term voor het spul tussen de open- en sluitingstag, niet een prop die we zelf in de tag zelf neerplempen. Dat spul kan van alles zijn, ook een andere Reactcomponent
};

export default kat;