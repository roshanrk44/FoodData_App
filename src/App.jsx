import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Body from './components/Body.jsx';
import Info from './components/Info.jsx';
import NavBar from './components/NavBar.jsx';
import Input from './components/Input.jsx'
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
      <NavBar />
        <Routes>
          <Route path="/" element={<Body/>} />
          <Route path="/info/:id" element={<Info />} />
          <Route path="/input/:value/:stype" element={<Input />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
