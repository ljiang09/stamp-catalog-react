import {Routes, Route} from "react-router-dom"
import './App.css';
import NavigationBar from './components/NavigationBar'
import Catalog from './components/catalog/Catalog'
import Upload from './components/upload/Upload';

function App() {
  return (
    <div className = 'App'>
      <h1>Stamp Catalog App</h1>
      <NavigationBar />
      <br />

      <Routes>
        <Route exact path="/" element={<Catalog />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
      
    </div>
  );
}

export default App;
