import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-charcoal text-ivory flex flex-col items-center justify-center px-8 text-center">
          <h1 className="font-display text-4xl mb-4">Something went wrong.</h1>
          <p className="text-mute mb-8">
            Refresh the page, or head back home. If this keeps happening, let us know.
          </p>
          <a href="/" className="btn-primary">
            Back to Home →
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}