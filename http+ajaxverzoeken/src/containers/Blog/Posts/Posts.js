import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import './Posts.css';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';  // dit is dus instance! 
// nu gebruiken we specifieke instance-axios settings voor posts, en nog de defaults in index.js voor de rest. Bij het laden van posts zien we ook niet langer de request logs van de interceptors in index.js


class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('/posts')     // axios om je get en post requests mee te doen (ik vind dit als introductie tot promises zo veel duidelijker dan dat gedoe met timers... serieus...). Die link is dummydata om mee te oefenen :-)
            .then(response => {
                const posts = response.data.slice(0, 4);        // Discount Jonas houdt niet zo van een hele pagina vol data/zoekresultaten/posts. Dus hij neemt de responses.data en slaat alleen de eerste 4 op om te renderen...
                const updatedPosts = posts.map(post => {        // onze dummy backend, omdat we geen server hebben, als ik het goed heb begrepen
                    return {...post,
                    author: 'Discount Jonas'
                    }
                })
                this.setState({ posts: updatedPosts })      // dus hier nog maar 4 posts :-/
                console.log(response.data);
            }).catch(error => {
                //this.setState({error: true})
                console.log(error)
            });
    }

    postSelectedHandler = (id) => {
        // this.setState({ selectedPostId: id })
        this.props.history.push({ pathname: '/' + id });    // zelfde als to="/" + post.id maar met propsmethode. In de methode kun je ook nog push('/' + id) doen > deze manier is 'programmatically', meestal gedaan na een ander proces is afgerond
    }

    render() {
        let posts = <p style={{textAlign: "center"}}>Something FAILED</p>

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/' + post.id} key={post.id}>      // Link is een methode om een link aan te brengen, denk erom dat in zo'n .map de key altijd op het buitenste element moet zitten
                        <Post 
                            title={post.title} 
                            key={post.id}
                            author={post.author /* een manier om de props zoals isMatch etc van de Link door te geven is {...this.props}, of natuurlijk specifieke props, maar het kan ook met een hoc genaamd withRouter, zie Post.js */}
                            clicked={() => this.postSelectedHandler(post.id)} /* met dus een arrowfunctie erin, omdat je dan een argument kunt doorgeven */ />
                    // </Link>
                )
            })
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts; 