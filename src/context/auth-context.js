import React from 'react';

const authContext = React.createContext({
    isAutheticated: true,
    login: () => {}       // Discount Jonas zet graag alvast erin wat voor data er uiteindelijk in komen 'voor de IDE' (?? c'est quoi), maar verder is dit eigenlijk redundant want je voert hem straks hetzelfde nog een keer
});     // hiermee initieer je een JS data ding (niet per se een object) dat niet een prop is, maar als het ware achter de schermen blijft. Je bepaalt zelf welke componenten er toegang toe hebben (soort van global, met poortjes lol)

export default authContext;

/* 
Ik heb in de app een knop met Log in, die data doorgeeft tussen Cockpit en Kat, 
via Poes en Katten. Poes en Katten doen niets met die props, dus waarom zo omslachtig?

Dit contextgedoe is bedoeld om die doorgeefketting te verkorten en props rechtstreeks 
van de ene naar de andere component door te geven, ook als die niet direct aan elkaar 
gelinkt zijn.

Discount Jonas noemt het trouwens 'context API'.
*/