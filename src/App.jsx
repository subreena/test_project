import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./Home";
import Student from "./pages/login/Student";
import Course from "./pages/ser1/Course";
import Remuneration from "./pages/ser2/Remuneration";
import ExamControl from "./pages/ser3/ExamControl";
import Ser2Page2 from "./pages/ser2/Ser2Page2";
import Footer from "./assets/components/Footer";
import TeacherDetails from "./pages/ser1/ser1_components/TeacherDetails";
import CreateRoutine from "./pages/ser1/ser1_components/CreateRoutine";
import TeacherDashboard from "./pages/ser1/TeacherDashboard";
import Routine from "./pages/ser1/Routine";
import DashboardTeacher from "./pages/Dashboard/DashboardTeacher";
import Billing from "./pages/ser3/Billing/Billing";
import SecondNav from "./assets/components/SecondNav";
import EmailPasswordLogin from "./pages/login/Teacher/EmailPasswordLogin";
import Signup from "./pages/login/Teacher/Signup";

import { createContext, useEffect, useState } from 'react';
import PrivateRoute from "./pages/login/Teacher/PrivateRoute";
import Teacher from "./pages/login/Teacher/Teacher";
import ForgotPassword from "./pages/login/Teacher/ForgotPassword";
import Team from "./pages/Team/Team";
import TeacherProfile from "./pages/TeacherProfile/TeacherProfile";
import EditTeacherProfile from "./pages/TeacherProfile/EditTeacherProfile";
import TravelBilling from './pages/ser2/TravelBilling';
import ReorderExamControl from "./pages/ser3/ReorderExamControl";
import ExamControlTeacherWise from "./pages/ser3/ExamControlTeacherWise";
import TeacherWiseRoutine from "./pages/ser1/ser1_components/TeacherWiseRoutine";
export const UserContext = createContext();

const App = () => {
  const [userState, setUserState] = useState(false);
  // to set user is logged in or not
  useEffect(() => {
    const setData = async () => {
      try {
        const storedUserData = localStorage.getItem('user');
        if(storedUserData) {
          setUserState(true);
        }
      } catch(error) {
        console.error('Error set data', error);
      }
    };

    setData();
  }, []);

  // to load all the vital data as soon as possible
  useEffect(() => {
    const saveRoutineData = () => {
      fetch("http://localhost:5005/routine")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('routine', JSON.stringify(data[0].overall));
        localStorage.setItem('yearTerms', JSON.stringify(data[0].yearTerm));
        console.log(data);
      })
      .catch((error) => console.error(error));
    }
    
    const saveExamCommitteeData = () => {
      fetch(
        "http://localhost:5005/examCommittee"
      )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('theory', JSON.stringify(data[0].theory));
        localStorage.setItem('teacherCourses', JSON.stringify(data[0].teachers));
        console.log(data);
      })
      .catch((error) => console.error(error))
    }

    saveRoutineData();
    saveExamCommitteeData();
  }, []);

  return (
    <UserContext.Provider value={[userState, setUserState]}>
      <BrowserRouter>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection:"column" }}>
          <div style={{marginBottom: "100px"}}>
            <SecondNav />
          </div>

          <Routes>
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/student" element={<Student />} />

            <Route path="/dashboard" element={<DashboardTeacher />} />
            <Route path="/routine" element={<Routine />} />
            <Route path="/teacherdashboard" element={<TeacherDashboard />} />
            <Route path="/coursedetails" element={<Course />} />
            <Route path="/teacherdetails" element={<TeacherDetails/>} />
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            
            <Route path="/login" element={<EmailPasswordLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword/>} />

            <Route path="/" element={<PrivateRoute />} >
              <Route path="/create-routine" element={<CreateRoutine/>} />
              <Route path="/teacher-wise-routine" element={<TeacherWiseRoutine/>} />
              <Route path="/teacherdashboard" element={<TeacherDashboard/>} />
              <Route path="/examcontrol" element={<ExamControl />} />
              <Route path="/create-exam-control" element={<ReorderExamControl />} />
              <Route path="/exam-control-teacher-wise" element={<ExamControlTeacherWise />} />
              <Route path="/remuneration" element={<Remuneration/>} />
              
              <Route path="/travelbilling" element={<TravelBilling/>}/>
              <Route path="/exambilling" element={<Billing/>} />
              
              <Route path="/profile" element={<TeacherProfile/>} />
              <Route path="/profile/edit-teacher" element={<EditTeacherProfile/>} />
            </Route>
            
          </Routes>
          
          <Footer />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;