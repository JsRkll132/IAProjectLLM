import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import ChatBot from './components/ChatBot';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ChatBot></ChatBot>}></Route> 
      
      </Routes>

    </BrowserRouter>
  );
}

export default App;
