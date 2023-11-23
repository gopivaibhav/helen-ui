import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import HelenMain from "./pages/HelenMain";
import Layout from "./pages/Layout";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Layout/>} />
        <Route path="/helen" element={<HelenMain/>} />
      </Routes>
    </Router>
  );
}

export default App;
