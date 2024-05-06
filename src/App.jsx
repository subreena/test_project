import "bootstrap/dist/css/bootstrap.css";
import "./assets/stylesheets/style.css";
import "./assets/stylesheets/login.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
// import Student from "./pages/login/Student";
import Course from "./pages/ser1/Course";
import Remuneration from "./pages/ser2/Remuneration";
import ExamControl from "./pages/ser3/ExamControl";
import Footer from "./assets/components/Footer";
import TeacherDetails from "./pages/ser1/ser1_components/TeacherDetails";
import CreateRoutine from "./pages/ser1/ser1_components/CreateRoutine";
import TeacherDashboard from "./pages/ser1/TeacherDashboard";
import Routine from "./pages/ser1/Routine";
import DashboardTeacher from "./pages/Dashboard/DashboardTeacher";
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
import ReorderExamControl from "./pages/ser3/ReorderExamControl";
import ExamControlTeacherWise from "./pages/ser3/ExamControlTeacherWise";
import ScrollButton from "./assets/components/ScrollButton";
import Feedback from "./pages/Feedback/Feedback";
import NotFound from "./pages/NotFound";
import TravelBilling from './pages/ser2/TravelBilling/TravelBilling';
import Ser2Page2 from "./pages/ser2/TravelBilling/Ser2Page2";
import Billing from "./pages/ser2/ExamBilling/Billing";
import MiniNav from './assets/components/MiniNav';
import CourseDistribution from "./pages/CourseDistribution/CourseDistribution";
import PreviousDoc from "./pages/Prev/PreviousDoc";
import ExamService from "./pages/examservice/ExamService";
import TheoryDuty from "./pages/DutyRoaster/TheoryDuty";
import LabDuty from "./pages/DutyRoaster/LabDuty";
import TheoryRoutine from "./pages/ExamRoutine/TheoryRoutine";
import LabRoutine from "./pages/ExamRoutine/LabRoutine";
import Top from "./assets/components/Top";
import ExamBillingFront from "./pages/ser2/ExamBilling/ExamBillingFront";
import PendingRequests from "./pages/TeacherProfile/PendingRequests";
import TemporaryRoutineShow from "./pages/ser1/TemporaryRoutineShow";
import TemporaryCourseDistribution from "./pages/CourseDistribution/temporaryCourseDisContent";
import CreateTheoryDutyRoaster from "./pages/DutyRoaster/CreateTheoryDuty";
import DutyRoaster from "./pages/DutyRoaster/DutyRoaster";
import CreateTheoryExamRoutine from "./pages/ExamRoutine/CreateTheoryRoutine";
import ManualTheoryExamRoutine from "./pages/ExamRoutine/ManualTheoryExamRoutine";

export const UserContext = createContext();

const App = () => {
  
  
  const [userState, setUserState] = useState(false);
  const [pathname, setPathname] = useState("");
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
 
 
  // // to load all the vital data as soon as possible
  // useEffect(() => {
  //   const saveRoutineData = () => {
  //     fetch("https://ice-web-nine.vercel.app/routine")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       localStorage.setItem('routine', JSON.stringify(data[0].overall));
  //       localStorage.setItem('yearTerms', JSON.stringify(data[0].yearTerm));
  //       console.log(data);
  //     })
  //     .catch((error) => console.error(error));
  //   }
    
  //   const saveExamCommitteeData = () => {
  //     fetch(
  //       "https://ice-web-nine.vercel.app/examCommittee"
  //     )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       localStorage.setItem('theory', JSON.stringify(data[0].theory));
  //       localStorage.setItem('teacherCourses', JSON.stringify(data[0].teachers));
  //       console.log(data);
  //     })
  //     .catch((error) => console.error(error))
  //   }

  //   saveRoutineData();
  //   saveExamCommitteeData();
  // }, []);

  return (
    <>
    <UserContext.Provider value={[userState, setUserState]}>
   
      <BrowserRouter>
      
      <><Top/></>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection:"column" }}>
          <div >
          {pathname ==="/" | pathname ==="/home" ? <MiniNav/> : null }
            <SecondNav />
          </div>

        <div style={{paddingTop: "50px", minHeight: "80vh"}}>
        <Routes>
            <Route path="/teacher" element={<Teacher />} />
            {/* <Route path="/student" element={<Student />} /> */}

            <Route path="/dashboard" element={<DashboardTeacher />} />
            <Route path="/teacherdashboard" element={<TeacherDashboard />} />
            <Route path="/coursedetails" element={<Course />} />
            <Route path="/teacherdetails" element={<TeacherDetails/>} />
            <Route path="/coursedistribution" element={<CourseDistribution/>} />
            <Route path="/alldocuments" element={<PreviousDoc/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />

            <Route path="/team" element={<Team />} />
            <Route path="/feedback"  element={<Feedback/>} />
            
            <Route path="/login" element={<EmailPasswordLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword/>} />
            <Route path="/remuneration" element={<Remuneration/>} />

            <Route path="/exam-related-service" element={<ExamService/>}/>

            {/* Services that are shown to all the user */}
            <Route path="/routine" element={<Routine />} />
            <Route path="/examcontrol" element={<ExamControl />} />
            <Route path="/exam-control-teacher-wise" element={<ExamControlTeacherWise />} />
            
            <Route path="/theory-duty-roaster" element={<DutyRoaster/>}/>
            <Route path="/lab-duty-roaster" element={<LabDuty/>}/>

            <Route path="/create-theory-exam-routine" element={<CreateTheoryExamRoutine />} />
            <Route path="/theory-exam-routine" element={<TheoryRoutine/>}/>
            <Route path="/lab-exam-routine" element={<LabRoutine/>}/>

            <Route path="/routine/:state/:id" element={<TemporaryRoutineShow />} />
            <Route path="/course-distribution/:state/:id" element={<TemporaryCourseDistribution />} />
            <Route path="/exam-control/:state/:id" element={<ExamControl/>} />
            <Route path="/theory-duty-roaster/:state/:id" element={<DutyRoaster/>}/>
            <Route path="/theory-exam-routine/:state/:id" element={<TheoryRoutine/>}/>

            {/* Services that are shown only to the register user */}
            <Route path="/" element={<PrivateRoute />} >
              <Route path="/create-routine" element={<CreateRoutine/>} />
              <Route path="/create-routine/:id" element={<CreateRoutine/>} />
              <Route path="/teacherdashboard" element={<TeacherDashboard/>} />
              <Route path="/create-exam-control" element={<ReorderExamControl />} />
              <Route path="/create-theory-duty-roaster" element={<CreateTheoryDutyRoaster/>} />
              
              <Route path="/travelbilling" element={<TravelBilling/>}/>
              <Route path="/travelbilling-page-2" element={<Ser2Page2/>} />
              <Route path="/exambilling" element={<Billing/>} />
              <Route path="/exambillingfront" element={<ExamBillingFront/>} />
              
              <Route path="/profile" element={<TeacherProfile/>} />
              <Route path="/pending-requests" element={<PendingRequests/>} />
              <Route path="/profile/edit-teacher" element={<EditTeacherProfile/>} />

              <Route path="/manual-theory-exam-routine" element={<ManualTheoryExamRoutine/>} />
            </Route>


            
            <Route path="*" element={<NotFound/>}/>
    
            
          </Routes>
        </div>
          <ScrollButton></ScrollButton>
          <Footer />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
    </>
  );
};

export default App;