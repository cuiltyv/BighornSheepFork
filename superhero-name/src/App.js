import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SuperName from './pages/SuperName';
import Store from './pages/Store';
import './App.css';
import Navigation from './components/Navigation';



export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/superhero-name" element={<SuperName />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </BrowserRouter>
  );
}