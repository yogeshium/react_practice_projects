import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home, About} from "./pages";
import SharedLayout from "./components/SharedLayout"
import Dashboard from "./components/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import { useState } from "react";

function App() {
  const [user,setUser]=useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="about" element={<About/>} />
          <Route path="dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user}/>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div>Error</div>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
