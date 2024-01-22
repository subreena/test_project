import { useEffect, useState } from 'react';

export const CourseDisUtils = () => {
    const [courseData, setCourseData] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [view, setView] = useState(false);
    const [formData, setFormData] = useState({
      examYear: 2024,
      semester: "",
      courseDetails: {
        courseCode: "",
        courseTitle: "",
        credit: "",
        courseType: "",
        teacherName: {
          teacherName1: "",
          teacherName2: "",
        },
      },
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://ice-web-nine.vercel.app/courseDetails"
          );
          const data = await response.json();
          setCourseData(data);
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
            "https://ice-web-nine.vercel.app/teachers"
          );
          const data = await response.json();
          setTeacher(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);
  
    const handleInputChange = (event) => {
      const { name, value, id } = event.target;
  
      const newValue =
        event.target.type === "radio" ? (id === "odd" ? 1 : 2) : value;
  
      setFormData({
        ...formData,
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
  
    const filterCourseData = () => {
      if (formData.semester) {
        return courseData.filter((course) => {
          // Assuming that the 'term' property exists in each course object
          return course.term === formData.semester;
        });
      }
      else{
        return courseData;
      } // If semester is not selected, return all courses
    };
  
    const handleView = () => {
      setView(!view);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Add logic to submit the form data or perform other actions
      console.log("Form Data:", formData);
    };
    return {
        courseData,
        formData,
        teacher,
        view,
        handleInputChange,
        handleSubmit,
        handleView,
        handleYearChange,
        filterCourseData, 
    }
};

export default CourseDisUtils;