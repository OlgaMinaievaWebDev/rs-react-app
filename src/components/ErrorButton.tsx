import React from 'react';
import './ErrorButton.css';

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
      throw new Error('Test error');
    }
    return (
      <button className="error-button" onClick={this.handleClick}>
        Trigger Error
      </button>
    );
  }
}
