import React from 'react';
import URLShortener from './components/URLShortener';

function App() {
  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        <h1 className="text-center mb-4 fw-bold text-primary">URL Shortener</h1>
        <URLShortener />    
      </div>
    </div>
  );
}

export default App;