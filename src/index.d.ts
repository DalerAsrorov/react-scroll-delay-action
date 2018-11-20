import * as React from 'react';

export interface ReactDelayedScrollProps {
  delayTime: number;
  id?: any;
  callOnce?: boolean;
  parentNode?: any | Window;
  onEnd?: (id: any) => void;
  onStart?: (id: any) => void;
}

export interface ReactDelayedScrollState {
  parentNode: any;
}

declare class ReactDelayedScrollAction extends React.PureComponent<
  ReactDelayedScrollProps,
  ReactDelayedScrollState
> {}

declare module 'react-scroll-delay-action' {

}

export default ReactDelayedScrollAction;
