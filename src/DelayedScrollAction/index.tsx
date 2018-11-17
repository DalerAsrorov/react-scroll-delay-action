import React, { PureComponent } from 'react';
import { getParent, isScrolledIntoView } from './utils';

interface Props {
  id: any;
  delayTime: number;
  onEnd: (id: any) => void;
  onStart?: (id: any) => void;
  callOnce?: boolean;
  parentNode?: any | Window;
}

interface State {
  isVisible: boolean;
}

export default class DelayedScrollAction extends PureComponent<Props, {}> {
  private nodeRef: any;
  private delayTimeout: any;

  state = {
    isVisible: false
  };

  constructor(props: Props) {
    super(props);

    this.nodeRef = React.createRef();
  }

  componentDidMount() {
    const { id, delayTime, callOnce, parentNode, onStart, onEnd } = this.props;
    const parent = getParent(parentNode);

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
