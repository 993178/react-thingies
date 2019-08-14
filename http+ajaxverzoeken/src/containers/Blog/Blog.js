import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null, 
        error: false
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')     // axios om je get en post requests mee te doen (ik vind dit als introductie tot promises zo veel duidelijker dan dat gedoe met timers... serieus...). Die link is dummydata om mee te oefenen :-)
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
                this.setState({error: true})
            });
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id })
    }

    render () {
        let posts = <p style={{textAlign: "center"}}>Something FAILED</p>

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
            return <Post 
                        title={post.title} 
                        author={post.author} 
                        key={post.id} clicked={() => this.postSelectedHandler(post.id)} /* met dus een arrowfunctie erin, omdat je dan een argument kunt doorgeven */ 
                    />
            })
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;