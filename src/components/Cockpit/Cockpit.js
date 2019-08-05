import React from 'react';
import { useEffect } from 'react';
import cssImports from './Cockpit.css';

const cockpit = (props) => {
    //useState                          // deze hook vervangt ook getDerivedStateFromProps
    //useEffect(() => {                 // React hook om lifecycle methods componentDidMount & -Update te vervangen in een functionele component. Deze functie kun je neerplempen waar je wilt en je kunt er zoveel gebruiken als je wilt, maar zonder performance-optimalisatie wordt dit ding uitgevoerd bij iedere renderronde.
    //      return () => {}         // om componenten te verwijderen. Deze returnfunctie runt na de eerste renderronde maar voor 'the main useEffect function' (huh?)
    //}, [props.datadiedezehookgebruikt]) // om constant renderen te voorkomen, kun je als tweede argument (in een array) de data (mmestal props?) 'aanwijzen' die deze hook gebruikt ('dependencies') en waarin iets moet veranderen voor dit ding mag runnen. Bij een lege array (er MOET een array in) loopt ie alleen de eerste keer.

    // Optie 1: tweede argument is lege array: functie runt alleen bij opstarten en voor ie verwijderd wordt
    // Optie 2: geen tweede argument, functie runt bij iedere update cycle
    // Optie 3: tweede argument is array met dependencies, functie runt wanneer die worden geüpdatet en runt dan ook de clean-upfunctie (die lege returnfunctie)

    useEffect(() => {
        console.log('cockpit useEffect');   // dit eerste stuk runt wanneer cockpit voor het eerst gerenderd wordt, ofwel bij het mounten
        // hier zou je een http request doen
        //const timer = setTimeout(() => {    // dus we zetten de wekker in een const zodat ie een naam heeft
        setTimeout(() => {
          console.log('cockpit timer aan het werk, woehoe');
        }, 1000);   // wekker brengt alert-boodschap na 1 seconde
        return () => {  // dit stuk code runt bij het unmounten. Ofwel bij het verwijderen van de cockpit. Als je op dat knopje klikt.
          //clearTimeout(timer);  // hierin wordt de wekker opgeruimd! Dus als je op de Remove cockpit-knop klikt voor de timer afgaat na 1 seconde, wordt ie geruimd zonder ooit af te gaan
          console.log('clean up')
        };
    }, []);

    let btnClass = '';
    let classes = []    // join (verplaatst naar de h1 in de return) plakt de strings aan elkaar tot 1 string met (in dit geval) een spatie ertussen

    if (props.catsAreThere) {
        btnClass = cssImports.Red;  // cssloader geeft ons een string
    }

    if (props.catsLength < 3) { // Discount Jonas heeft dit 'classes' veranderd in assignedClasses
      classes.push(cssImports.paars);
    }
    if (props.catsLength < 2) {
      classes.push(cssImports.big);
    }

    return (
      <div className={cssImports.Cockpit} >
        <h4>{props.title}</h4>
        <h1 className={classes.join(' ')} >Pretend this is the yard...</h1>
        <button className={btnClass} onClick={props.toggleCatHandler}>To cat or not to cat</button>
      </div>  

    );
};

export default React.memo(cockpit);  // memo-ding: React slaat een versie hiervan op, en alleen als er iets aan de input verandert (cats, toggleCatHandler, title), wordt Cockpit opnieuw gerenderd. Dit is dus de shouldComponentUpdate-versie van classloze componenten. 
// React is niet zo snugger om zelf op te merken dat alleen cats.length wordt gebruikt, maar dat kun je omzeilen door de props preciezer door te geven: in Poes.js niet cats, maar catsLength.
// Discount Jonas merkt op dat je ShoComUpd en memo alleen moet toepassen als een component, ehm, relatief los staat van de oudercomponent, zoals Katten niet hoeft te updaten als de Cockpit verandert of andersom. Maar als de oudercmponent updatet en het kind gebruikt eigenlijk dezelfde informatie, dan heeft zo'n check weinig zin