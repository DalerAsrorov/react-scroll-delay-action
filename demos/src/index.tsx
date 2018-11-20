import * as React from 'react';
import { render } from 'react-dom';
import ReactDelayedScrollAction from '../../lib';

const App = () => (
  <div style={{ height: '5000px' }}>
    <div>
      <ReactDelayedScrollAction
        delayTime={3000}
        id="mine"
        onEnd={(id: any) => console.log('hello', id)}
      >
        <article>Hello</article>
      </ReactDelayedScrollAction>
    </div>
  </div>
);
render(<App />, document.getElementById('root'));
