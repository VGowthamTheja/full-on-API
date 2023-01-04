import { Controller } from "@hotwired/stimulus"
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from "../src/App"

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    console.log('React is Connected')

    const app = document.getElementById('app');
    createRoot(app).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
    );
  }
}
