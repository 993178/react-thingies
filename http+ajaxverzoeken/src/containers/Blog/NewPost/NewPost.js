import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Discount Jonas',
        submitted: false
    }

    // componentDidMount () {
    //      geschikte plek om if-statement in te zetten om te checken of gebruiker ingelogd is, zoniet redirect naar iets wat ie wel mag zien
    //      Discount Jonas benadrukt dat dit dé manier is om gedeeltes van je app af te sluiten voor niet-ingelogde gebruikers: gewoon überhaupt niet mounten (waarbij de voorwaarden voor het mounten natuurlijk veilig in de backend moeten staan)            
    // }

    postDataHandler = () => {
        const post = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }
        axios.post('/posts', post)    // normaalgesproken is dat niet dezelfde link... Tweede argument is de data die we willen opsturen en eerst in state en dan in const post gooien. Dat hele ding wordt automatisch in een json-string omgezet door axios. Aardig van ze lol
            .then(response => {
                console.log(response);
                this.setState({submitted: true})          // deze - de <Redirect /> - vervangt de huidige pagina op de stack, eenmaal weer bij /posts kom je, bij klikken op de <-- terugpijl, weer waar je was vóór je naar NewPost ging
                //this.props.history.redirect('/posts');  // doet hetzelfde als redirect hierboven (maar dan met minder code, want je hebt geen state.submitted nodig en geen let redirect, if-statement en {redirect} in de JSX). Gebruik bijvoorbeeld als een ingelogde user naar login gaat of naar een pagina die niet bestaat (want gebruiker verwacht niet terug te gaan naar niet-bestaande pagina)
                //this.props.history.push('/posts');      // deze pusht een nieuwe pagina op de stack, bij <- ga je terug naar NewPost. Gebruik bv hier in bij formulieren, waar de gebruiker zelf de doorverwijzing initieert (want hij verwacht terug te kunnen naar het formulier)
            })
    }

    render () {
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to="/posts" />;    // we willen dat de gebruiker na het posten van zijn/haar epistel weer wordt teruggeleid naar /posts... maar niet onmiddellijk bij het laden van de NewPost component, anders lopen we dat epistel mis. Dus we laten het afhangen van de state, die wordt geüpdatet zodra het epistel gepost is. Met ook een {redirect} in de render, beetje bovenaan
        } 

        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Jonas">Jonas</option>
                </select>
                <button onClick={this.postDataHandler} >Add Post</button>
            </div>
        );
    }
}

export default NewPost;