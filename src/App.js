import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HelenMain from "./pages/HelenMain";
import Session from "./pages/Session";
import Companion from "./pages/Companion";
import SocketHelen from "./components/SocketHelen";
import SessionRating from "./pages/SessionRating";
import { useEffect } from "react";
import "./App.css";
import { mixPanelTracking } from "./utils/mixPanel";
import SocketCompanion from "./components/SocketCompanion";
function App() {
  useEffect(() => {
    mixPanelTracking("page_view");
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HelenMain />} />
        <Route path="/helen-therapy" element={<SocketHelen />} />
        <Route path="/companion-bot" element={<SocketCompanion />} />
        <Route path="/companion" element={<Companion />} />
        <Route path="/session" element={<Session />} />
        <Route path="/rating" element={<SessionRating />} />
      </Routes>
    </Router>
  );
}

export default App;
