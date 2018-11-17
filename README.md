# react-delayed-scroll-action

A component that contains a callback with the delay seconds after which the callback is called.

## Props

Todo: (list of props).

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
