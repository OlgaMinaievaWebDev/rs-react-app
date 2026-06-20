'use client';

import React from 'react';
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from './ErrorBoundary.interfaces';
import { StyledErrorBoundaryTitle } from './ErrorBoundary.styles';

export class ErrorBoundary extends React.Component<
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
