import React, { Component } from 'react';
import axios from 'axios';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Discount Jonas'
    }

    postDataHandler = () => {
        const post = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }
        axios.post('https://jsonplaceholder.typicode.com/posts', post)    // normaalgesproken is dat niet dezelfde link... Tweede argument is de data die we willen opsturen en eerst in state en dan in const post gooien. Dat hele ding wordt automatisch in een json-string omgezet door axios. Aardig van ze lol
            .then(response => {
                console.log(response);
            })
    }

    render () {
        return (
            <div className="NewPost">
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