import React, { PureComponent } from 'react';
import { getParent, isScrolledIntoView } from './utils';

export default class DelayedScrollAction extends PureComponent<
  ReactDelayedScrollProps,
  ReactDelayedScrollState
> {
  private nodeRef: any;
  private delayTimeout: any;

  constructor(props: ReactDelayedScrollProps) {
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
    if (parent) {
      parent.addEventListener('scroll', () => {
        if (this.checkIfViewIsReached() && !this.delayTimeout) {
          if (onStart) {
            onStart(id);
          }

          this.delayTimeout = setTimeout(() => {
            // cancel timeout
            clearTimeout(this.delayTimeout);

            if (onEnd && this.checkIfViewIsReached()) {
              onEnd(id);
            }

            if (!callOnce) {
              this.delayTimeout = undefined;
            }
          }, delayTime);
        }
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.delayTimeout);
  }

  private checkIfViewIsReached = () => {
    return isScrolledIntoView(this.nodeRef);
  };

  render() {
    const { children } = this.props;

    return <span ref={ref => (this.nodeRef = ref)}>{children}</span>;
  }
}
