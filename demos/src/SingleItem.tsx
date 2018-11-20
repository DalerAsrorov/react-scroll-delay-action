import * as React from 'react';
import DelayedScrollAction from '../../src';

interface Props {
  delayTime: number;
}

interface State {
  boxText: string;
  shouldCongratulate: boolean;
}

const boxStyle = {
  height: '250px',
  width: '50%',
  background: 'orange',
  margin: '2000px auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default class SingleItem extends React.PureComponent<Props, State> {
  state = {
    boxText: 'Waiting for you...',
    shouldCongratulate: false
  };

  private handleDelayedAction = () => {
    const { delayTime } = this.props;

    this.setState({
      shouldCongratulate: true,
      boxText: `Tada!!! You stared at me for ${delayTime / 1000} seconds.`
    });
  };

  private handleDelayedStart = () => {
    this.setState({ boxText: 'You are finally here! Wait for it...' });
  };

  render() {
    const { boxText, shouldCongratulate } = this.state;
    const { delayTime } = this.props;

    return (
      <div style={{ height: '40000px' }}>
        <h1 style={{ textAlign: 'center' }}>Scroll down!!!</h1>
        <div style={boxStyle}>
          <DelayedScrollAction
            onStart={this.handleDelayedStart}
            onEnd={this.handleDelayedAction}
            delayTime={delayTime}
            id="banner"
            callOnce={true}
          >
            <article id="banner">{boxText}</article>
            {shouldCongratulate && <p style={{ textAlign: 'center' }}>😉</p>}
          </DelayedScrollAction>
        </div>
      </div>
    );
  }
}
