import React from 'react';
import './ErrorBoundary.css';

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
      return <h1 className="error-boundary">Something went wrong</h1>;
    }
    return this.props.children;
  }
}
