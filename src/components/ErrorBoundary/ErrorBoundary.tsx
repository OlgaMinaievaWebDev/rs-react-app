import React from 'react';
import { StyledErrorBoundaryTitle } from './ErrorBoundary.styles';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}
export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError = () => {
    return { hasError: true };
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <StyledErrorBoundaryTitle>
          Something went wrong
        </StyledErrorBoundaryTitle>
      );
    }
    return this.props.children;
  }
}
