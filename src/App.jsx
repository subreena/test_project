import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./Home";
import Student from "./pages/login/student";
import Teacher from "./pages/login/teacher";
import Routine from "./pages/ser1/Routine";
import Course from "./pages/ser1/course";
import Renummeration from "./pages/ser2/Renummeration";
import ExamControl from "./pages/ser3/ExamControl";
import Ser2Page2 from "./pages/ser2/Ser2Page2";



const App = () => {
  return (

<div>
<BrowserRouter>
<Routes>
  
  <Route path="/student" element={<Student/>}/>
  <Route path="/teacher" element={<Teacher/>}/>
  <Route path="/routine" element={<Routine/>}/>
  <Route path="/course_details"element={<Course/>}/>
  <Route path="/renummeration" element={<Renummeration/>}/>
  <Route path="/renumeration-page-2" element={<Ser2Page2/>}/>
  <Route path="/examcontrol" element={<ExamControl/>}/>
  <Route path="/" element={<Home/>}/>
  <Route path="*" element={<NotFound/>}/>
</Routes>
</BrowserRouter>
</div>

  );
};

export default App;
