import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App'

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080808] text-[#F2F0EC] flex items-center justify-center p-6 font-mono-code">
          <div className="max-w-lg w-full bg-[#121212] border border-[#E50914]/40 rounded-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
              SYSTEM NOTICE
            </div>
            <h2 className="font-bebas text-2xl tracking-wide text-white">PORTFOLIO INITIALIZING</h2>
            <p className="text-xs text-[#9E9B93] leading-relaxed">
              An unexpected render event occurred. Please refresh the page to reload the latest database assets.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#E50914] text-white rounded text-xs uppercase tracking-wider font-bold cursor-pointer hover:bg-[#FF2A2A] transition-colors"
            >
              Reload Portfolio
            </button>
          </div>
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
