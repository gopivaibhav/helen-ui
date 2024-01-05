import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import HelenMain from "./pages/HelenMain";
import Layout from "./pages/Layout";
import Loader from "./pages/Loader";
import Session from "./pages/Session";
import Companion from "./pages/Companion";
import { useEffect } from "react";
import "./App.css";
import { mixPanelTracking } from "./utils/mixPanel";
function App() {
  useEffect(() => {
    mixPanelTracking("page_view");
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HelenMain />} />
        <Route path="/starting" element={<Loader />} />
        <Route path="/helen" element={<Layout />} />
        <Route path="/companion" element={<Companion />} />
        <Route path="/session" element={<Session />} />
      </Routes>
    </Router>
  );
}

export default App;
