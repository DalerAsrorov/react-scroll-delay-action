import * as React from 'react';
import { mount, shallow } from 'enzyme';
import ReactDelayedScrollAction from './';
import { ReactDelayedScrollProps } from './index.d';
import { getParent } from './utils';
import '../setupTests';

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
  <ReactDelayedScrollAction {...generateProps(props)}>
    <article>
      <p>{MESSAGE}</p>
    </article>
  </ReactDelayedScrollAction>
);

describe('Delayed Scroll Action component', () => {
  describe('component', () => {
    it('should mount properly', () => {
      mount(renderComponent());
    });

    it('sets window as default parent if parentNode is unkown', () => {
      const component = mount(renderComponent({ parentNode: null }));

      expect(component.state('parentNode')).toBe(window);

      component.unmount();
    });

    it('should preserve children content', () => {
      const component = mount(renderComponent());

      expect(component.find('p').prop('children')).toBe(MESSAGE);

      component.unmount();
    });

    it('should call onStart callback on scroll when element is mounted and visible', () => {
      const onStart = jest.fn();
      const id = '1';
      const component = mount(renderComponent({ onStart, id }));

      window.dispatchEvent(new Event('scroll'));

      expect(onStart).toHaveBeenCalledWith(id);

      component.unmount();
    });

    it('should call onEnd callback on scroll when element is mounted and visible', () => {
      const onEnd = jest.fn();
      const id = '1';
      const wrapper = mount(renderComponent({ onEnd, id }));
      const component = wrapper.instance();

      jest.useFakeTimers();

      window.dispatchEvent(new Event('scroll'));

      jest.runAllTimers();

      expect(onEnd).toHaveBeenCalledWith(id);
    });

    it('should throw an error if parent is not object, ie node', () => {
      let error = null;

      try {
        shallow(renderComponent({ parentNode: 'str' }));
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('utils', () => {
    it('getParent should return window if undefined', () => {
      expect(getParent(undefined)).toBe(window);
    });
    it('getParent should return window if undefined', () => {
      const component = mount(<div style={{ height: '100px' }} />);
      const domNode = component.getDOMNode();

      expect(getParent(domNode)).toBe(domNode);

      component.unmount();
    });
  });
});
