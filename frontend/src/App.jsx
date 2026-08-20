import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Header from "./pages/components/Header";
import PrivateRoute from "./pages/components/PrivateRoute";

function App() {
  return (
    <div className="app d-flex flex-column vh-100 overflow-hidden">
      <Header />
      <div className="flex-grow-1 overflow-y-auto">
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
