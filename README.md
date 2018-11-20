# react-delayed-scroll-action

[![npm version](https://badge.fury.io/js/react-scroll-delay-action.svg)](https://badge.fury.io/js/react-scroll-delay-action)
[![CircleCI](https://circleci.com/gh/DalerAsrorov/react-scroll-delay-action.svg?style=svg)](https://circleci.com/gh/DalerAsrorov/react-scroll-delay-action)

A React wrapper component that triggers callbacks (`onStart` and `onEnd`) right after element is visible during scroll event and right after the delay time has passed since the element first became visible on scroll. The second callback (`onEnd`) is exposed only when the element is still visible after `delayTime` seconds has passed.

## Installation

```shell
yarn add react-scroll-delay-action
```

## Props

| Prop          |                                                                                                                                     Description                                                                                                                                      |               Type |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -----------------: |
| `delayTime`   |                                                                                                             Time (in ms) after which the `onEnd` callback will be called                                                                                                             |           `number` |
| `onStart?`    |                                           Once the element is visible on scroll event, the component timer starts to count until the specified `delayTime` is reached. The `onStart` callback is triggered right before the timer starts.                                            | `(id: any) => any` |
| `onEnd?`      | The `onEnd` callback is called after the `delayTime` is reached since element became visibile after scrolling. If the element is still visible after `delayTime` _seconds_ since the last scroll, the `onEnd` callback will be called with passed in `id` (or non if not specified). | `(id: any) => any` |
| `id?`         |                               Identifier for the component that will be passed to `onStart` and `onEnd` prop callbacks. This is helpful when you want attach delayed scroll events to collection of items to be able to update the states accordingly.                               |              `any` |
| `callOnce?`   |                          `false` by default. The callbacks (`onStart` and `onEnd`) will be called only once once the element is visible on scroll. If set to `true`, the callbacks will be triggered every time the element is visible on scrolling event.                           |          `boolean` |
| `parentNode?` |                                                                                           `window` by default. The parent node relative to which element visibility should be calculated.                                                                                            |              `any` |

## Usage

- Attaching delayed actions, `onStart` and `onEnd`, after specified `delayTime`.

```javascript
<div style={{ height: '40000px' }}>
  <h1 style={{ textAlign: 'center' }}>Scroll down!!!</h1>
  <div style={boxStyle}>
    <DelayedScrollAction
      onStart={() =>
        this.setState(() => {
          shouldCongratulate: false,
        })
      }}
      onEnd={() =>
        this.setState({
          shouldCongratulate: true,
        })
      }
      delayTime={delayTime}
      id="banner"
      callOnce={true}
    >
      <article>{boxText}</article>
        {shouldCongratulate && <p style={{ textAlign: 'center' }}>Congratulations!/p>}
    </DelayedScrollAction>
  </div>
</div>
```

- Attaching delayed actions for each item in collection.

```javascript
<div style={wrapper}>
  {items.map(({ id }) => (
    <DelayedScrollAction
      key={id}
      id={id}
      delayTime={3000}
      onEnd={id => {
        this.setState({
          currentTarget: id
        });
      }}
    >
      <article
        style={{
          ...articleStyle,
          background: id === currentTarget ? 'red' : 'white'
        }}
        key={id}
      >
        This article has ID #{id}.
      </article>
    </DelayedScrollAction>
  ))}
</div>
```

## License

[MIT](./LICENSE)
