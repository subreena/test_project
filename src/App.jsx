import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./Home";
import Student from "./pages/login/student";
import Routine from "./pages/ser1/Routine";
import Course from "./pages/ser1/course";
import Renummeration from "./pages/ser2/Renummeration";
import ExamControl from "./pages/ser3/ExamControl";
import Ser2Page2 from "./pages/ser2/Ser2Page2";
import MiniNav from "./assets/components/miniNav";
import SecondNav from "./assets/components/secondNav";
import Footer from "./assets/components/Footer";
import Teacher from "./pages/login/Teacher";
import TeacherDetails from "./pages/ser1/ser1_components/TeacherDetails";
import CreateRoutine from "./pages/ser1/ser1_components/CreateRoutine";
import TeacherDashboard from './pages/ser1/TeacherDashboard';





const App = () => {
  return (

<div>
<BrowserRouter>
<MiniNav/>
<SecondNav/>
<Routes>
  
  <Route path="/student" element={<Student/>}/>
  <Route path="/teacher" element={<Teacher/>}/>

  <Route path="/routine" element={<Routine/>}/>
  <Route path="/create-routine" element={<CreateRoutine/>}/>
  <Route path="/teacherdasboard" element={<TeacherDashboard/>}/>
  <Route path="/coursedetails"element={<Course/>}/>
  <Route path="/renummeration" element={<Renummeration/>}/>
  <Route path="/renumeration-page-2" element={<Ser2Page2/>}/>
  <Route path="/examcontrol" element={<ExamControl/>}/>
<Route path="/teacherDetails" element={<TeacherDetails/>}/>
  <Route path="/home" element={<Home/>}/>
  <Route path="/" element={<Home/>}/>
  <Route path="*" element={<NotFound/>}/>
</Routes>
<Footer/>
</BrowserRouter>
</div>

  );
};

export default App;
