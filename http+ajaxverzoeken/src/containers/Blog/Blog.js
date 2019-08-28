import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom'; // Link is ipv <a>, omdat als je gewone a's gebruikt voor je links in de header, er een request wordt gestuurd en de pagina dus opnieuw laadt, en dat wil je niet want dan ben je je state ook kwijt
// Link voegt alleen geen class toe, dus vervangen we Link weer door NavLink (waar is Link dan nog goed voor?). NavLink houdt ook bij welke link active is en voegt dat toe als class (kun je veranderen naar iets anders met property activeClassName="andere-naam"), zodat je een active link apart kunt stylen. Achter de schermen is het overigens nog steeds gewoon een a met een href! Een andere stijlmogelijkheid is property activeStyle={{ color: 'purple'}}; die geldt dan natuurlijk alleen voor de NavLink waar je hem opzet

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';

class Blog extends Component {
    state = {
        selectedPostId: null, 
        error: false
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/" exact>Home</NavLink></li> {/* Simpelste voorbeeld van to is een string als "/" zoals een href ook zou hebben. Maar je kunt ook een JS-object doorgeven met pairs als pathname: '/new-post' voor de basis van de link, hash: '#submit' voor specifieke punten op die pagina (zoals subkoppen in Wikipedia), of search: '?quick-submit=true' voor zoekopdrachten. Er moet ook een exact bij, anders slaat de styling op alles dat met / begint*/}
                            <li><NavLink to="/new-post">New post</NavLink></li> {/* zo'n path in to is standaard absoluut: het wordt altijd achter de domeinnaam geplakt. Wil je een relatief path, met het path-stukje vastgeplakt aan je huidige locatie, dan gebruik je: pathname: this.props.match.url + '/rest-van-link' */}
                        </ul>
                    </nav>
                </header>
                <Route path="/" exact component={Posts} /> {/* het path is de link waar we heen willen, en omdat alle andere links ook met / beginnen willen we exact (=boolean) deze. Zonder exact kun je bv handmatig dingen toevoegen aan je link en nog steeds op de pagina belanden die met het originele stuk begint, maar dan weet de browser wel dat het geen exacte match was. Je kunt meerdere Routes onder elkaar zetten, ook met hetzelfde path; Route is een soort if (path) {wat je eigenlijk wilt renderen}.  Een niet-component-specifieke mogelijkheid is render={() => <h1>ik hier?</h1> Render neemt een arrowfunctie en ipv function body kun je JSX invoeren.  */}
                <Route path="/new-post" component={NewPost} /> {/* zo'n gerenderde component krijgt een zootje props mee, waaronder history, match etc */}
                <Route path="/:id" exact component={FullPost} /> {/* met dynamische link, die :id is zoiets als {id}. Dat betekent wel dat alle absolute links die met hetzelfde stuk beginnen eerst moeten komen, anders denkt de browser dat NewPost ook een FullPost is */}
            </div>
        );
    }
}

export default Blog;

/*

                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
*/