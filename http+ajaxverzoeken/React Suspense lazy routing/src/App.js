import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import User from './containers/User';
import Welcome from './containers/Welcome';

const Posts = React.lazy(() => import('./containers/Posts')); // dynamische import met nieuwere lazy-methode die dus dat hele hoc-element in het Posts-project vervangt. Import kan alleen default exports ontvangen

class App extends Component {
  state = { showPosts: false }

  modeHandler = () => {
    this.setState(prevState => {
      return { showPosts: !prevState.showPosts};
    })
  }

  render() {
    return (  // voorbeeld van async rendering met Suspense dat niet binnen BrowserRouter staat. Werkt nog niet bij serverside rendering?
      <React.Fragment>
          <button onClick={this.modeHandler}>Toggle mode</button>
          {this.state.showPosts ? (<Suspense fallback={<div>Loading...</div>}>
            <Posts />
          </Suspense>) : <User />}
      </React.Fragment>
      // <BrowserRouter>
      //   <React.Fragment> {/* dit doet hetzelfde als een aux: gewoon een wrapper die de inhoud zonder verandering teruggeeft zodat je meerdere elementen op hetzelfde niveau kunt renderen */}
      //     <nav>
      //       <NavLink to="/user">User Page</NavLink> |&nbsp;
      //       <NavLink to="/posts">Posts Page</NavLink>
      //     </nav>
      //     <Route path="/" component={Welcome} exact />
      //     <Route path="/user" component={User} />
      //     <Route path="/posts" render={() => <Suspense fallback={<div>Loading...</div>}><Posts /></Suspense>} /> {/* Posts alleen indien nodig, Suspense is kennelijk de async binnen de JSX, met een Plan B voor als het niet onmiddellijk laadt */}
      //   </React.Fragment>
      // </BrowserRouter>
    );
  }
}

export default App;
