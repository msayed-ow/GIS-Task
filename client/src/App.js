
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './components/Main'
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
