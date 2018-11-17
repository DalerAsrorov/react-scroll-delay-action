import React from 'react';
import { mount } from 'enzyme';
import DelayedScrollAction from '../DelayedScrollAction';

const generateProps = ({
  id = 'temp',
  delayTime = 3000,
  callOnce = false,
  onStart = jest.fn(),
  onEnd = jest.fn(),
  parentNode = global
} = {}): ReactDelayedScrollProps => ({
  id,
  delayTime,
  parentNode,
  callOnce,
  onStart,
  onEnd
});
const MESSAGE = 'I am here!';

const renderComponent = (props?: any) => (
  <DelayedScrollAction {...generateProps(props)}>
    <article>
      <p>{MESSAGE}</p>
    </article>
  </DelayedScrollAction>
);

describe('Delayed Scroll Action component', () => {
  it('should mount properly', () => {
    mount(renderComponent());
  });

  it('sets window as default parent if parentNode is unkown', () => {
    const component = mount(renderComponent({ parentNode: null }));

    expect(component.state('parentNode')).toBe(window);
  });
});