import { useEffect, useState } from 'react';
export const CourseDisUtils = () => {
    const [courseData, setCourseData] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [view, setView] = useState(false);
    const [formData, setFormData] = useState({
      examYear: null,
      semester: null,
      courseDetails: [
        {
          courseCode: '',
          teacherCode: [
            '',''
          ]
        },
      ],
      totalBatch: 0,
      sessions: [
        { session: "", totalStudents: "", startDate: "", year: '0', term: '0' },
      ]
    });
     
  const [courseDetailsError, setCourseDetailsError] = useState('');
  const [teacherError, setTeacherError] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/courseDetails"
          );
          const data = await response.json();
          if(data.success) {
            setCourseData(data.data);
            setCourseDetailsError('');
          }
          else setCourseDetailsError(data.error);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          
          const response = await fetch(
            "http://localhost:5000/teachers"
          );
          const data = await response.json();
          if(data.success) {
            setTeacher(data.data);
            setTeacherError('');
          }
          else setTeacherError(data.error);
        } catch (error) {
          setTeacherError(error);
        }
      };
      fetchData();
    }, []);

    useEffect(() => {
      console.log(formData);
    }, [formData])


    const handleInputChange = (event, index) => {
      const { name, value, id } = event.target;
    
      const newValue =
        event.target.type === "radio" ? (id === "odd" ? 1 : 2) : value;
    
      const updatedCourseDetails = [...formData.courseDetails];
      updatedCourseDetails[index] = {
        ...updatedCourseDetails[index],
        [name]: value,
      };
    
      setFormData({
        ...formData,
        courseDetails: updatedCourseDetails,
        [name]: newValue,
      });
    };

    const handleYearChange = (event) => {
      const inputValue = event.target.value;
      const parsedYear = parseInt(inputValue, 10);
      if (!isNaN(parsedYear) && parsedYear >= 2004 && parsedYear <= 2100) {
        setFormData({
          ...formData,
          examYear: parsedYear,
        });
      } else {
        // Handle invalid input (optional)
        setFormData({
          ...formData,
          examYear: "",
        });
      }
    };

    const handleTeacherDetailsChange = (event, index, teacherNumber) => {
      const { value } = event; console.log(event);
      const updatedCourseDetails = [...formData.courseDetails];
      // Ensure teacherCode is initialized as an array
      if (!updatedCourseDetails[index].teacherCode) {
        updatedCourseDetails[index].teacherCode = ['', ''];
      }
      // Map 'teacher1' to index 0, 'teacher2' to index 1
      const arrayIndex = teacherNumber === 'teacher1' ? 0 : 1;
      updatedCourseDetails[index].teacherCode[arrayIndex] = value;
      setFormData({
        ...formData,
        courseDetails: updatedCourseDetails,
      });
    };
  
    const filterCourseData = () => {
      // console.log(formData);
      let filteredCourses = [];
      if(formData.sessions) {
        courseData.forEach(course => {
          if (course.type === "theory") {
            formData.sessions.forEach(session => {
              if (course.year == session.year && course.term == session.term) {
                // Push only if the course is not already in filteredCourses
                if (!filteredCourses.some(filteredCourse => filteredCourse === course)) {
                  filteredCourses.push(course);
                }
              }
            });
          }
        });

        // Create new courseDetails objects for each filtered course
        const newCourseDetailsArray = filteredCourses.map((course) => ({
          courseCode: course.code,
          teacherCode: ['','']
        }));

        // Determine the difference in length between the existing and new courseDetails arrays
        const lengthDifference = newCourseDetailsArray.length - formData.courseDetails.length;
        if (lengthDifference > 0) {
          // If there is a difference, append empty objects to formData.courseDetails
          setFormData({
            ...formData,
            courseDetails: newCourseDetailsArray
          });
        }
        return filteredCourses;
      } else {
        return courseData;
      }
    };
    

 
   
    const handleView2 = (event) => {
      event.preventDefault(); 
      setView(!view);
    };

    
    const handleSubmit = async (event) => {
      event.preventDefault();
      alert('Submission Successful');
      console.log(formData);
      try {
        const response = await fetch("http://localhost:5000/courseDistribution", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          console.log("Data submitted successfully");
        } else {
          console.error("Failed to submit data. Server responded with:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error during data submission:", error.message);
      }
    };
    
 
    return {
        courseData,
        formData,
        setFormData,
        teacher,
        view,
        handleInputChange,
        handleSubmit,
        handleView2,
        handleYearChange,
        filterCourseData, 
        handleTeacherDetailsChange,
    }
};

export default CourseDisUtils;