import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import HelenMain from "./pages/HelenMain";
import Layout from "./pages/Layout";
import Session from "./pages/Session";
import { useEffect } from "react";
import { mixPanelTracking } from "./utils/mixPanel";
function App() {
  useEffect(() => {
    mixPanelTracking("page_view");
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HelenMain />} />
        <Route path="/helen" element={<Layout />} />
        <Route path="/session" element={<Session />} />
      </Routes>
    </Router>
  );
}

export default App;
