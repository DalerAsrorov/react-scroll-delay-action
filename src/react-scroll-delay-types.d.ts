declare interface ReactDelayedScrollProps {
  delayTime: number;
  id?: any;
  callOnce?: boolean;
  parentNode?: any | Window;
  onEnd?: (id: any) => void;
  onStart?: (id: any) => void;
}

declare interface ReactDelayedScrollState {
  parentNode: any;
}
