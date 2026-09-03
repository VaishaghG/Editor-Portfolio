import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.tsx'

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  render() {
    if ((this.state as any).hasError) {
      return (
        <div style={{ padding: 20, color: 'red', backgroundColor: 'black', height: '100vh', zIndex: 99999, position: 'relative' }}>
          <h1>React Crashed!</h1>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{(this.state as any).error?.stack || (this.state as any).error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
