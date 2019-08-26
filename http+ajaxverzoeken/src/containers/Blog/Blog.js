import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'; // Link is ipv <a>, omdat als je gewone a's gebruikt voor je links in de header, er een request wordt gestuurd en de pagina dus opnieuw laadt, en dat wil je niet want dan ben je je state ook kwijt

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost'

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
                            <li><Link to="/">Home</Link></li> {/* Simpelste voorbeeld van to is een string als "/" zoals een href ook zou hebben. Maar je kunt ook een JS-object doorgeven met pairs als pathname: '/new-post' voor de basis van de link, hash: '#submit' voor specifieke punten op die pagina (zoals subkoppen in Wikipedia), of search: '?quick-submit=true' voor zoekopdrachten */}
                            <li><Link to="/new-post">New post</Link></li> {/* zo'n path in to is standaard absoluut: het wordt altijd achter de domeinnaam geplakt. Wil je een relatief path, met het path-stukje vastgeplakt aan je huidige locatie, dan gebruik je: pathname: this.props.match.url + '/rest-van-link' */}
                        </ul>
                    </nav>
                </header>
                <Route path="/" exact component={Posts} /> {/* het path is de link waar we heen willen, en omdat alle andere links ook met / beginnen willen we exact (=boolean) deze. Zonder exact kun je bv handmatig dingen toevoegen aan je link en nog steeds op de pagina belanden die met het originele stuk begint, maar dan weet de browser wel dat het geen exacte match was. Je kunt meerdere Routes onder elkaar zetten, ook met hetzelfde path; Route is een soort if (path) {wat je eigenlijk wilt renderen}.  Een niet-component-specifieke mogelijkheid is render={() => <h1>ik hier?</h1> Render neemt een arrowfunctie en ipv function body kun je JSX invoeren.  */}
                <Route path="/new-post" component={NewPost} /> {/* zo'n gerenderde component krijgt een zootje props mee, waaronder history, match etc */}
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