import React from 'react';
// import { withRouter } from 'react-router-dom';


import './Post.css';
import Posts from '../../containers/Blog/Posts/Posts';

const post = (props) => (
    <article className="Post" onClick={props.clicked} >
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
);

//export default withRouter(post);  // deze hoc is om de render-gerelateerde props die we in Posts krijgen over de route, ook hier weer door te geven in de export
export default Posts;   // Meervoud - waarom was dit ook alweer? 