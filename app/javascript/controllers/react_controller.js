import { Controller } from "@hotwired/stimulus";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "../src/App";

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    console.log("React is Connected");

    const app = document.getElementById("app");
    createRoot(app).render(
      <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </React.StrictMode>
    );
  }
}
