import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HelenMain from "./pages/HelenMain";
import Layout from "./pages/Layout";
import Loader from "./pages/Loader";
import Session from "./pages/Session";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HelenMain />} />
        <Route path="/starting" element={<Loader />} />
        <Route path="/helen/:filename"  element={<Layout />} />
        <Route path="/session" element={<Session />} />
      </Routes>
    </Router>
  );
}

export default App;
