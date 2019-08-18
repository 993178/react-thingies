import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";    // default bais url waar de rest van een url gewoon aan vast geplakt wordt elders in the app!

//doet niks voor de app maar als voorbeeld:
axios.defaults.headers.common['Authorization'] = "EEN OF ANDER TOKEN"; // iedere request stuurt info mee, en hiermee kun je zo'n header meesturen
axios.defaults.headers.post['Content-Type'] = 'application/json'; // standaard setting, maar om te laten zien dat zo'n header ook specifiek voor POST requests kan zijn

axios.interceptors.request.use(request => {     // zo'n interceptor kun je gebruiken als je errors in de hele app op dezelfde manier en plek wilt managen, bv voor álle http requests
    console.log(request);   // feitelijk is alles wat je doet een request, ook het starten van de app, op dingen klikken, dingen intypen - alles. Die zou je hier ook allemaal kunnen configureren voor het returnen
    return request;     // het is eigenlijk request config... ? ... maar iig moet je hem altijd returnen
}, error => {           // de error handling gaat apart als tweede functie
    console.log(error); // je zou bv je errors kunnen bijhouden in een logfile ofzo
    return Promise.reject(error);   // errors moeten ook worden gereturnd, zodat ze (ook) op de normale manier (zoals aangegenven in de catch) worden verwerkt. Denk dat hier een reject wordt doorgegeven zodat ie meteen in catch belandt?
})  
// maar: dit^ gaat alleen over de aanvraag; wat daarmee moet gebeuren en wat daarmee mis is (bv als je geen internet hebt). Als er iets moet gebeuren of mis is met het antwoord:
axios.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {       // zo'n error krijg je bij een fout http adres
    console.log(error);
    return Promise.reject(error);
})

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
// where the app gets mounted to the DOM



// You learned how to add an interceptor, getting rid of one is also easy. Simply store the reference to the interceptor in a variable and call eject  with that reference as an argument, to remove it (more info: https://github.com/axios/axios#interceptors):

// var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
// axios.interceptors.request.eject(myInterceptor);
