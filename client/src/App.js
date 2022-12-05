import Landing from "./pages/Landing";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Stats from "./pages/dashboard/Stats";
import AllJobs from "./pages/dashboard/AllJobs";
import AddJob from "./pages/dashboard/AddJob";
import Profile from "./pages/dashboard/Profile";
import SharedLayout from "./pages/dashboard/SharedLayout";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Routes >
     <Route path={'/'} element={<ProtectedRoute><SharedLayout/></ProtectedRoute>}>
         <Route index element={<Stats/>}/>
         <Route path={'all-jobs'} element={<AllJobs/>}/>
         <Route path={'add-jobs'} element={<AddJob/>}/>
         <Route path={'profile'} element={<Profile/>}/>

     </Route>
     <Route path={'/register'} element={<Register/>}/>
     <Route path={'/landing'} element={<Landing/>}/>
     <Route path={'*'} element={<Error/>}/>
    </Routes>
  );
}

export default App;
