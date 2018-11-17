declare interface ReactDelayedScrollProps {
  id: any;
  delayTime: number;
  onEnd: (id: any) => void;
  onStart?: (id: any) => void;
  callOnce?: boolean;
  parentNode?: any | Window;
}

declare interface ReactDelayedScrollState {
  parentNode: any;
}
