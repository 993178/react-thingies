import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom'; // Link is ipv <a>, omdat als je gewone a's gebruikt voor je links in de header, er een request wordt gestuurd en de pagina dus opnieuw laadt, en dat wil je niet want dan ben je je state ook kwijt
// Link voegt alleen geen class toe, dus vervangen we Link weer door NavLink (waar is Link dan nog goed voor?). NavLink houdt ook bij welke link active is en voegt dat toe als class (kun je veranderen naar iets anders met property activeClassName="andere-naam"), zodat je een active link apart kunt stylen. Achter de schermen is het overigens nog steeds gewoon een a met een href! Een andere stijlmogelijkheid is property activeStyle={{ color: 'purple'}}; die geldt dan natuurlijk alleen voor de NavLink waar je hem opzet
// Switch is een wrapping component die je gebruikt om te zorgen dat er per pagina maar 1 Route geladen wordt (de eerste die aan de eis voldoet), zodat je geen gezeik krijgt met /:d en /new-post - anders kun je niet van een :id naar new-post zonder dat die :id óók geladen wordt op dezelfde pagina. Je kunt ook Routes boven of onder Switch zetten, zodat die wel altijd geanalyseerd worden

import './Blog.css';
import Posts from './Posts/Posts';
// import FullPost from './FullPost/FullPost';  <-- is verhuisd naar Posts
//import NewPost from './NewPost/NewPost';      <-- doen we via lazy loading en dus de asyncComponent, dus willen we hem niet in webpack, dus kunnen we niet deze import gebruiken want dat komt webpack te weten. Dit is je reinste muiterij
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => {     // we gaan NewPost lui renderen via asyncComponent, die als argument een functie verwacht
    return import('./NewPost/NewPost');     // say waaaaaat  // import als functie, die alleen NewPost importeert als die arrowfunctie geactiveerd wordt
})

class Blog extends Component {
    state = {
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts" exact>Posts</NavLink></li> {/* Simpelste voorbeeld van to is een string als "/" zoals een href ook zou hebben. Maar je kunt ook een JS-object doorgeven met pairs als pathname: '/new-post' voor de basis van de link, hash: '#submit' voor specifieke punten op die pagina (zoals subkoppen in Wikipedia), of search: '?quick-submit=true' voor zoekopdrachten. Er moet ook een exact bij, anders slaat de styling op alles dat met / begint. Discount Jonas merkt op dat je deze basislink niet apart kunt stylen als je zou willen dat deze bv ook active is als je op een FullPost bent. Dat los je dan op door er /posts van te maken */}
                            <li><NavLink to="/new-post">New post</NavLink></li> {/* zo'n path in to is standaard absoluut: het wordt altijd achter de domeinnaam geplakt. Wil je een relatief path, met het path-stukje vastgeplakt aan je huidige locatie, dan gebruik je: pathname: this.props.match.url + '/rest-van-link' */}
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {/*<Route path="/" exact component={Posts} />  het path is de link waar we heen willen, en omdat alle andere links ook met / beginnen willen we exact (=boolean) deze. Zonder exact kun je bv handmatig dingen toevoegen aan je link en nog steeds op de pagina belanden die met het originele stuk begint, maar dan weet de browser wel dat het geen exacte match was. Je kunt meerdere Routes onder elkaar zetten, ook met hetzelfde path; Route is een soort if (path) {wat je eigenlijk wilt renderen}.  Een niet-component-specifieke mogelijkheid is render={() => <h1>ik hier?</h1> Render neemt een arrowfunctie en ipv function body kun je JSX invoeren.  */}
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null } {/* auth? de quick&dirty manier om een guard in te bouwen: waarmee je bepaalt wat een gebruiker wel of niet mag zien. New Post staat nog steeds op de header, maar wordt geredirect naar /posts.   Zo'n gerenderde component krijgt een zootje props mee, waaronder history, match etc */}
                    {/* <Route path="/:id" exact component={FullPost} /> met dynamische link, die :id is zoiets als {id}. Dat betekent wel dat alle absolute links die met hetzelfde stuk beginnen eerst moeten komen, anders denkt de browser dat NewPost ook een FullPost is */}
                    <Route path="/posts" component={Posts} /> {/* nieuwe plek onderaan voor '/' ZONDER exact, omdat anders Posts niet geladen wordt nu die ook FullPost laadt met een niet-exact path, namelijk '/:id'. Met deze volgorde wordt eerst NewPost eruit gefilterd en voorkomt Switch dat '/' óók wordt gerenderd voor NewPost omdat die ook aan het request voldoet. Ennn nog weer later maken we er '/posts' van */}
                    {/* <Route path="/" component={Posts} />   kun je doen als simpele manier om gebruikers die zelf naar '/' gaan te redirecten naar /posts (dat wél bestaat)  */}
                    {/* <Redirect from="/" to="/posts" />  Redirect (ook een named import van react-router-dom) om gebruikers van een niet-bestaande link door te sturen naar iets wat wel bestaat. Je kunt dit ook buiten de Switch zetten en de from weglaten, dan wordt alles wat niet in de switch staat dus daarheen geleid */}
                    <Route render={() => <h1>Page not found</h1>} /> {/* Ipv om te leiden naar een bestaande pagina kun je ook een 404 weergeven */}
                </Switch>
            </div>
        );
    }
}

export default Blog;