import * as React from 'react';
import DelayedScrollAction from '../../src';

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

export default class MultipleItemsExample extends React.PureComponent<
  Props,
  State
> {
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
    const items = Array.apply(null, Array(nBoxes)).map((d: any, i: any) => i);

    console.log(items);
    return (
      <React.Fragment>
        {items.map((item: any, i: any) => (
          <DelayedScrollAction
            key={i}
            id={i}
            delayTime={delayTime}
            onEnd={this.handleDelayedAction}
          >
            <article
              key={i}
              style={{
                ...boxStyle,
                background: assignBackground(i === currentNodeIndex)
              }}
            >
              {i + 1}
            </article>
          </DelayedScrollAction>
        ))}
      </React.Fragment>
    );
  }
}
