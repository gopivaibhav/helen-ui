import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import HelenMain from "./pages/HelenMain";
import Layout from "./pages/Layout";
import Loader from "./pages/Loader";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HelenMain />} />
        <Route path="/starting" element={<Loader />} />
        <Route path="/helen/:filename"  element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
