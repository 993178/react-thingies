// Het is een conventie om zelfgebouwde higher order components met With te laten beginnen. Voor methode #1 begint de naam met een hoofdletter, want het is een functionele component
// Voor methode #2 verandert Discount Jonas de naam van dit bestand in 'withClass', met kleine letter, want het is een gewone functie, geen component (als ik het goed begrijp)
import React from 'react';

// een methode om een hoc op te zetten is met een functie in een functie
const withClasses = (VerpakteComponent, className) => {  // eerste argument is het component dat verpakt moet worden in deze hoc, andere argumenten hangen af van wat je met je hoc wilt bereiken
    return props => (
        <div className={className}>
            <VerpakteComponent {...props} />
        </div>
    )
}

// Nadeel van dit grapje is dat het een extra laag toevoegt, en de component waar de gewrapte component oorspronkelijk gerenderd werd, geeft vaak ook props mee. Dus die moeten ook hier weer worden doorgegeven, maar dan, omdat zo'n verpakking herbruikbaar moet zijn, zonder de props te hardcoden
// Omdat de ingepakte component (Kat) geëxporteerd wordt met de hoc (withClass) eromheen, worden de props bij het renderen in Katten automatisch van Katten doorgegeven naar withClass: vandaar dat we hier props ontvangen.
// Het doorgeven van de props (= een object) gebeurt niet automatisch, en omdat er een nieuw object props wordt aangemaakt kun je ook niet gewoon props={props} doen maar moet je de inhoud eruit trekken met de spread operator zodat die losse eigenschappen weer in het nieuw-gemaakte propsobject komen.

export default withClasses;


/*  Methode #1 om een hoc op te zetten, als een const
const withClasses = props => (
    <div className={props.cssstuff}>
        {props.children}
    </div>
)
*/

// dit specifieke voorbeeld van hocs is, tja, tamelijk onzinnig, maar het heeft wél zin
// bij bijv het managen van errors bij http requests