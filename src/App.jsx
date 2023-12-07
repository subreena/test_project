import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./Home";
import Student from "./pages/login/Student";
import Course from "./pages/ser1/Course";
import Renummeration from "./pages/ser2/Renummeration";
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

import { createContext, useState } from 'react';
import PrivateRoute from "./pages/login/Teacher/PrivateRoute";
import Teacher from "./pages/login/Teacher/Teacher";
import ForgotPassword from "./pages/login/Teacher/ForgotPassword";
export const UserContext = createContext();

const App = () => {
  const [userState, setUserState] = useState({});

  return (
    <UserContext.Provider value={[userState, setUserState]}>
      <BrowserRouter>
        <div>
          <SecondNav />
        </div>

        <div style={{ minHeight: "100vh", marginTop: "100px", width: "100%" }}>
          <Routes>
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/student" element={<Student />} />
            <Route path="/dashboard" element={<DashboardTeacher />} />
            <Route path="/routine" element={<Routine />} />
            <Route path="/teacherdashboard" element={<TeacherDashboard />} />
            <Route path="/coursedetails" element={<Course />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<EmailPasswordLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword/>} />

            <Route 
              path="/create-routine" 
              element={ <PrivateRoute> <CreateRoutine /> </PrivateRoute>} 
            />
            <Route 
              path="/examcontrol" 
              element={<PrivateRoute> <ExamControl /> </PrivateRoute>} 
            />
            <Route 
              path="/renummeration" 
              element={<PrivateRoute> <Renummeration /> </PrivateRoute>} 
            />
            <Route 
              path="/renumeration-page-2" 
              element={<PrivateRoute> <Ser2Page2 /> </PrivateRoute>} 
            />
            <Route 
              path="/billing" 
              element={<PrivateRoute> <Billing /> </PrivateRoute>} 
            />
            <Route
              path="/teacherDetails" 
              element={<PrivateRoute> <TeacherDetails /> </PrivateRoute>} />
          </Routes>
        </div>
        
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
