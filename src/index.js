import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "tailwindcss/tailwind.css"
import ContextProvider from "./context"

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById("root")
)
