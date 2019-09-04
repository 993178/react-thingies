import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'; // zodat de gebruiker meerdere pagina's ziet terwijl stiekem de app nog steeds maar 1 index.js heeft (single page app)

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (  // wrap het doelelement in de BrowserRouter, dit kan hier om Blog.js of in index.js rond App.js
      <BrowserRouter> {/* bij het deployen van de app is het nog belangrijk hoe het basisadres er uitziet: is dat gewoon www.blabla.com, dan wordt de basename standaard gewoon '/' en is er niks aan de hand, maar is het www.serverdienst.com/my-app, dan moet je hier als property dat meegeven: basename="/my-app" zodat de rest van de links daarop voortbouwen */}
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
