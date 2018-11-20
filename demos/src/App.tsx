import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MultipleExample from './MultipleExample';
import SingleItem from './SingleItem';

const wrapper: React.CSSProperties = {
  width: '100%',
  height: '100%'
};

const Menu = () => (
  <nav>
    <ul>
      <li>
        <Link to="/multiple-items/">
          Multiple items - delayed actions for collection of elements.
        </Link>
      </li>
      <li>
        <Link to="/single-banner/">
          Scroll event attached to a single element with delayed action.
        </Link>
      </li>
    </ul>
  </nav>
);

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div style={wrapper}>
        <Router basename="/">
          <React.Fragment>
            <Route exact path="/" component={Menu} />
            <Route
              path="/multiple-items"
              component={() => <MultipleExample nBoxes={15} delayTime={3000} />}
            />
            <Route
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
