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
        <Route path="/" element={<HelenMain />} />
        <Route path="/helen" exact element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
