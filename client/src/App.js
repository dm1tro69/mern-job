import Landing from "./pages/Landing";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes >
     <Route path={'/'} element={<Dashboard/>}/>
     <Route path={'/register'} element={<Register/>}/>
     <Route path={'/landing'} element={<Landing/>}/>
     <Route path={'*'} element={<Error/>}/>
    </Routes>
  );
}

export default App;
