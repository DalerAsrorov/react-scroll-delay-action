import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MultipleItemsExample from './MultipleItemsExample';
import SingleItem from './SingleItem';

const wrapper: React.CSSProperties = {
  width: '100%',
  height: '100%'
};

const Menu = () => (
  <nav>
    <ul>
      <li>
        <Link to="/multiple-items">
          Multiple items - delayed actions for collection of elements.
        </Link>
      </li>
      <li>
        <Link to="/single-banner">
          Scroll event attached to a single element with delayed action.
        </Link>
      </li>
    </ul>
  </nav>
);

class App extends Component<{}, {}> {
  render() {
    return (
      <div style={wrapper}>
        <Router basename={process.env.PUBLIC_URL}>
          <React.Fragment>
            <Route exact path="/" component={Menu} />
            <Route
              exact
              path="/multiple-items"
              component={() => (
                <MultipleItemsExample nBoxes={15} delayTime={3000} />
              )}
            />
            <Route
              exact
              path="/single-banner"
              component={() => <SingleItem delayTime={5000} />}
            />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
