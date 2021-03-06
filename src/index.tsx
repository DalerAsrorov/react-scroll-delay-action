import * as React from 'react';
import { getParent, isScrolledIntoView } from './utils';

export default class ReactDelayedScrollAction extends React.PureComponent<
  any,
  any
> {
  private nodeRef: any;
  private delayTimeout: any;

  constructor(props: any) {
    super(props);

    this.nodeRef = React.createRef();
    this.state = {
      parentNode: props.parentNode
    };
  }

  componentDidMount() {
    const { id, delayTime, callOnce, parentNode, onStart, onEnd } = this.props;
    const parent = getParent(parentNode);

    // update the state with current parentNode
    this.setState({
      parentNode: parent
    });

    // The event listeners are attached to the parent relative
    // to which the child component should compute the visibility
    if (parent && typeof parent === 'object') {
      parent.addEventListener('scroll', () => {
        // if the callbacks should be called only once
        // after the element is visible on scroll event,
        // we want to make sure that the timer wasn't triggered before
        if (this.checkIfViewIsReached() && !this.delayTimeout) {
          if (onStart) {
            onStart(id);
          }

          this.delayTimeout = setTimeout(() => {
            if (onEnd && this.checkIfViewIsReached()) {
              onEnd(id);
            }

            // prevent any following timeout from occuring
            clearTimeout(this.delayTimeout);

            // if callOnce is false, re-assign delayTimeout to undefined
            // to allow the new scroll event trigger onStart and onEnd callbacks continuosly
            if (!callOnce) {
              this.delayTimeout = undefined;
            }
          }, delayTime);
        }
      });
    } else {
      throw new Error(
        'Parent is either undefined or haveu unkown type. Please provide proper parent node.'
      );
    }
  }

  componentWillUnmount() {
    clearTimeout(this.delayTimeout);
  }

  private checkIfViewIsReached = () => {
    const { parentNode } = this.state;

    return isScrolledIntoView(this.nodeRef, parentNode);
  };

  render() {
    const { children } = this.props;

    return React.Children.map(children, (child: any) =>
      child
        ? React.cloneElement(child, {
            ref: (ref: any) => (this.nodeRef = ref)
          })
        : null
    );
  }
}
