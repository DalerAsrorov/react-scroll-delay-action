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

    this.setState({
      parentNode: getParent(parent)
    });

    if (onEnd) {
      parent.addEventListener('scroll', () => {
        if (this.checkIfViewIsReached() && !this.delayTimeout) {
          if (onStart) {
            onStart(id);
          }
          this.delayTimeout = setTimeout(() => {
            if (this.checkIfViewIsReached()) {
              onEnd(id);
            }

            if (!callOnce) {
              clearTimeout(this.delayTimeout);
              this.delayTimeout = undefined;
            } else {
              clearTimeout(this.delayTimeout);
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
