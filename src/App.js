import React from "react"
import LoginPage from "./pages/LoginPage"
import MiniLoginPage from "./pages/MiniLoginPage"
function App() {
  return (
    <div className="App">
      <LoginPage />
      <hr />
      <div>mini</div>
      <MiniLoginPage />
    </div>
  )
}

export default App
