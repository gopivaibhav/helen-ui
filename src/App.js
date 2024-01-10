import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HelenMain from "./pages/HelenMain";
import Session from "./pages/Session";
import Companion from "./pages/Companion";
import SocketHelen from "./components/SocketHelen";
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
        <Route path="/helen-therapy" element={<SocketHelen />} />
        <Route path="/companion" element={<Companion />} />
        <Route path="/session" element={<Session />} />
      </Routes>
    </Router>
  );
}

export default App;
