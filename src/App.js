import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Catalog from "./components/catalog/Catalog";
import Upload from "./components/upload/Upload";
import Settings from "./components/settings/Settings";
import Profile from "./components/profile/Profile";
import PageNotFound from "./components/PageNotFound";
import StampInfo from "./components/stampinfo/StampInfo";

function App() {
  // document.body.style = 'background: #2b2d2f; color: white';

  return (
    <div className="App">
      <h1>Stamp Catalog App</h1>
      <NavigationBar />
      <br />

      <Routes>
        <Route exact path="/" element={<Catalog />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/info/:id" element={<StampInfo />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
