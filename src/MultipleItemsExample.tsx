import React, { PureComponent } from 'react';
import DelayedScrollAction from './DelayedScrollAction';

const DEFAULT_COLOR = 'blue';
const ACTIVE_COLOR = 'lightblue';

const assignBackground = (isCurrentItem: boolean) => {
  const color = isCurrentItem ? ACTIVE_COLOR : DEFAULT_COLOR;

  return color;
};

const boxStyle: React.CSSProperties = {
  background: DEFAULT_COLOR,
  width: '100%',
  height: '300px',
  margin: '20px 0px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '24px',
  fontWeight: 600
};

interface Props {
  nBoxes: number;
  delayTime: number;
}

interface State {
  currentNodeIndex: number;
}

export default class MultipleItemsExample extends PureComponent<Props, State> {
  state = {
    currentNodeIndex: 0
  };

  private handleDelayedAction = (id: number) => {
    console.log(`onEnd called: ${id}`);
    this.setState({
      currentNodeIndex: id
    });
  };

  render() {
    const { currentNodeIndex } = this.state;
    const { delayTime, nBoxes } = this.props;
    const items = [...Array(nBoxes).map((d, i) => i)];

    return (
      <React.Fragment>
        {items.map((item, i) => (
          <DelayedScrollAction
            key={i}
            id={i}
            delayTime={delayTime}
            onEnd={this.handleDelayedAction}
          >
            <article
              style={{
                ...boxStyle,
                background: assignBackground(i === currentNodeIndex)
              }}
              key={i}
            >
              {i + 1}
            </article>
          </DelayedScrollAction>
        ))}
      </React.Fragment>
    );
  }
}
