import {Routes, Route} from "react-router-dom"
import './App.css';
import NavigationBar from './components/NavigationBar'
import Catalog from './components/catalog/Catalog'
import Upload from './components/upload/Upload';
import PageNotFound from './components/PageNotFound';


function App() {
  return (
    <div className = 'App'>
      <h1>Stamp Catalog App</h1>
      <NavigationBar />
      <br />

      <Routes>
        <Route exact path="/" element={<Catalog />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      
    </div>
  );
}

export default App;
