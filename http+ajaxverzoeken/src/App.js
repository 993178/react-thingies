import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'; // zodat de gebruiker meerdere pagina's ziet terwijl stiekem de app nog steeds maar 1 index.js heeft (single page app)

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (  // wrap het doelelement in de BrowserRouter, dit kan hier om Blog.js of in index.js rond App.js
      <BrowserRouter>
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
