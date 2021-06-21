
// Bootstrapped from react official docs

import { Component, ErrorInfo } from "react";
import {Props, State} from "./ErrorBoundary.types"
import {styles} from "./ErrorBoundary.styles"

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({error:error})
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={styles.fullPage as React.CSSProperties}>
          <h2>Something went wrong</h2>
          <p>{this.state.error}</p>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;