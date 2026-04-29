import React from 'react';

interface ErrorButtonState {
  shouldThrow: boolean;
}

export default class ErrorButton extends React.Component<
  object,
  ErrorButtonState
> {
  state: ErrorButtonState = {
    shouldThrow: false,
  };

  handleClick = () => {
    this.setState({
      shouldThrow: true,
    });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('error');
    }
    return <button onClick={this.handleClick}>Trigger Error</button>;
  }
}
