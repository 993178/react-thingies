import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        if (this.props.id) {
            if ( !this.state.loadedPost || this.state.loadedPost.id !== this.props.id) {  // om de loop te voorkomen een extra if: we willen alleen de request indienen als er 1) !niks is geladen of als 2) dat wat er is geladen niet dezelfde post.id is als de nieuwe props.id
                axios.get('https://jsonplaceholder.typicode.com/posts/'+ this.props.id)
                    .then(response => {
                        //console.log(response);  //niet meer nodig, maar wel handig om te zien dat er een loop is ontstaan!
                        this.setState({ loadedPost: response.data });   // setState in CompddUp! setState triggert een rerender, dus daarna is de component geüpdatet en loopt deze compddup dus ook weer, etc.
                });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/'+ this.props.id)
            .then(response => {
                console.log(response);
            })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>
        }
        if (this.state.loadedPost) {        // was eerst check this.props.id, maar die is er vóór de promise oplost met de ontvangen data > error. Dus we moeten kijken of de data al in de state staat, ofwel of die al truthy is
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button  onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;