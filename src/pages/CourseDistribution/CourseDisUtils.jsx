import { useEffect, useState } from "react";
export const CourseDisUtils = () => {
  const [courseData, setCourseData] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [view, setView] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [formData, setFormData] = useState({
    examYear: null,
    semester: null,
    courseDetails: [
      {
        courseCode: "",
        teacherCode: ["", ""],
      },
    ],
    totalBatch: 0,
    sessions: [
      { session: "", totalStudents: "", startDate: "", year: "0", term: "0" },
    ],
  });

  const [courseDetailsError, setCourseDetailsError] = useState("");
  const [teacherError, setTeacherError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/courseDetails");
        const data = await response.json();
        console.log(data);

        
        if (data.success) {
          setCourseData(data.data);
          setCourseDetailsError("");
        } else setCourseDetailsError(data.error);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/teachers");
        const data = await response.json();
        if (data.success) {
          setTeacher(data.data);
          setTeacherError("");
        } else setTeacherError(data.error);
      } catch (error) {
        setTeacherError(error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData])

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
    const { value } = event;
    console.log(event);
    const updatedCourseDetails = [...formData.courseDetails];
    // Ensure teacherCode is initialized as an array
    if (!updatedCourseDetails[index].teacherCode) {
      updatedCourseDetails[index].teacherCode = ["", ""];
    }
    // Map 'teacher1' to index 0, 'teacher2' to index 1
    const arrayIndex = teacherNumber === "teacher1" ? 0 : 1;
    updatedCourseDetails[index].teacherCode[arrayIndex] = value;
    setFormData({
      ...formData,
      courseDetails: updatedCourseDetails,
    });
  };

  const filterCourseData = () => {
    // console.log(formData);
    let filteredCourses = [];
    if (formData.sessions) {
      courseData.forEach((course) => {
        // if (course.type === "theory") {
        formData.sessions.forEach((session) => {
          if (course.year == session.year && course.term == session.term) {
            // Push only if the course is not already in filteredCourses
            if (
              !filteredCourses.some(
                (filteredCourse) => filteredCourse === course
              )
            ) {
              filteredCourses.push(course);
            }
          }
        });
        // }
      });

      // Create new courseDetails objects for each filtered course
      const newCourseDetailsArray = filteredCourses.map((course) => ({
        courseCode: course.code,
        teacherCode: ["", ""],
      }));

      // Determine the difference in length between the existing and new courseDetails arrays
      const lengthDifference =
        newCourseDetailsArray.length - formData.courseDetails.length;
      if (lengthDifference > 0) {
        // If there is a difference, append empty objects to formData.courseDetails
        setFormData({
          ...formData,
          courseDetails: newCourseDetailsArray,
        });
      }
      return filteredCourses;
    } else {
      return courseData;
    }
  };

  const [fetchError, setFetchError] = useState("");
  const [courseDistributionData, setCourseDistributionData] = useState(false);

  const fetchCourseDistribution = async (year, semester) => {
    try {
        // Validate input
        if (!year) {
          setFetchError('Exam year is required!');
          return;
        }
        if (!semester) {
          setFetchError('Please select the above semester!');
          return;
        }

        const response = await fetch(`http://localhost:5000/courseDistribution/update/${year}/${semester}`);
        const data = await response.json();
        
        if (data.success) {
            console.log('Course Distribution:', data.data);
            setCourseDistributionData(data.data);
            setFetchError("");
        } else {
            console.error('Error:', data.error);
            setView(view^1);
            setFilteredCourses(filterCourseData());
            setFetchError("");
        }
    } catch (error) {
        console.error('Request failed:', error);
    }
  };


  const handleView2 = (event) => {
    event.preventDefault();

    const year = formData.examYear;
    const semester = formData.semester;

    console.log("year: ", year, " semester: ", semester);

    fetchCourseDistribution(year, semester);
  };

  const [senderName, setSenderName] = useState("");
  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    const name = `${teacher?.firstName} ${teacher?.lastName}`;
    console.log(name);
    setSenderName(name);
  }, []);

  const [loading, setLoading] = useState(false);
  const [defaults, setDefaults] = useState(false);
  const [courseDistributionError, setCourseDistributionError] = useState("");
  let serviceId = null;

  const handleSave = async(event) => {
    try {
      setLoading(true);
      event.preventDefault();

      console.log(formData);

      const response = await fetch("http://localhost:5000/courseDistribution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const d = await response.json();
      console.log(d);
      if (d.success) {
        const data = d.data;
        serviceId = data._id;
        console.log(data);
        setCourseDistributionError("");
        console.log(serviceId);
      } else {
        setCourseDistributionError(d.error);
      }
      // setErrorMessage("");
    } catch (error) {
      // setErrorMessage(error.message);
      console.error("Error creating exam routine:", error);
    } finally {
      setLoading(false);
      setDefaults(false);
    }
  }

  const handleSubmit = async (event) => {
    // to save it at temporary course distribution
    handleSave(event);

    // to save it at pending service
    try {
      // Make a POST request to your endpoint
      const response = await fetch("http://localhost:5000/pendingService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: serviceId,
          serviceName: "Course Distribution",
          senderName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const d = await response.json();
      console.log("pending: ", d);
      if (!d.success) {
        setCourseDistributionError(d.error);
      }
    } catch (error) {
      console.error("Error:", error);
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
    filteredCourses,
    handleTeacherDetailsChange,
    handleSave,
    fetchError,
    courseDistributionData
  };
};

export default CourseDisUtils;
