import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { Button } from "react-bootstrap";

const PreviousDoc = () => {
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [serviceData, setServiceData] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { value, name, id } = e.target;
    const newValue =
      e.target.type === "radio" ? (id === "odd" ? "1" : "2") : value;

    if (name === "examYear") {
      setYear(newValue);
    } else if (name === "semester") {
      setSemester(newValue);
    }
  };

  const options = [
    { value: "course distribution", label: "Course Distribution" },
    { value: "class routine", label: "Class Routine" },
    { value: "theory exam routine", label: "Theory Exam Routine" },
    { value: "therory exam duty roaster", label: "Theory Exam Duty Roaster" },
    { value: "theory exam committee", label: "Theory Exam Committee" },
  ];

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption])

  const getApiString = (serviceName) => {
    let apiString = "";
    if(serviceName === "course distribution") {
      apiString = "CourseDistributionManagemen";
    } else if(serviceName === "class routine") {
      apiString = "classRoutineManagement";
    } else if(serviceName === "theory exam routine") {
      apiString = "TheoryExamRoutineManagement";
    } else if(serviceName === "therory exam duty roaster") {
      apiString = "TheoryDutyRoasterManagement";
    } else if(serviceName === "theory exam committee") {
      apiString = "TheoryExamCommitteeManagement";
    } else {
      console.error("There is an error in getApiString() method!!!");
    }

    return apiString;
  }

  const handleSearch = async() => {
    let error = true;
    if(!year) setErrorMessage("Cannot proceed! Year is not selected yet!");
    else if(!semester) setErrorMessage("Cannot proceed! Semester is not selected yet!");
    else if(!selectedOption) setErrorMessage("Cannot proceed! Service is not selected yet!");
    else {
      setErrorMessage("");
      error = false;
    }
    if(error) return;

    const databaseName = getApiString(selectedOption.value);
    if(databaseName === "") {
      setErrorMessage("Selected service name is not found! Try another one.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/${databaseName}/data/${year}/${semester}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (!response.ok) {
        // Handle non-successful response here
        console.log("Response is not OK:", response);
      }

      const data = await response.json();

      if (data.success) {
        console.log("Data received:", data.data);
        setServiceData(data.data);
        setServiceId(data.data._id);
        setErrorMessage("");
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error("Error creating manage service:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="text-center fs-1 mb-4">Previous Documents</h1>
      </div>
      <div className="container">
        <div className="row">
          <hr />
          <div className="col-6">
            {/* exam year */}
            <div className="row">
              <div className="col-auto ">
                <label htmlFor="examYear" className="form-label">
                  Year:{" "}
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="number"
                  id="yearInput"
                  name="examYear"
                  onChange={handleInputChange}
                  placeholder="e.g., 2022"
                  min="2004"
                  required
                  max="2100"
                  className="form-control"
                />
                <p
                  className={
                    year ? "text-success text-sm" : "text-danger text-sm"
                  }
                >
                  Selected Year: {year || "No year selected"}
                </p>
              </div>
            </div>
          </div>
          <div className="col-6">
            {/* semester selection */}
            <div className="row">
              <div className="col-auto">
                <label htmlFor="semester">Semester Selection: </label>
              </div>
              <div className="col-auto">
                <input
                  type="radio"
                  className="btn-check"
                  id="odd"
                  name="semester"
                  autoComplete="off"
                  required
                  onChange={handleInputChange}
                />
                <label className="btn btn-outline-primary" htmlFor="odd">
                  Odd
                </label>
                &nbsp; &nbsp;
                <input
                  type="radio"
                  className="btn-check"
                  id="even"
                  name="semester"
                  autoComplete="off"
                  required
                  onChange={handleInputChange}
                />
                <label className="btn btn-outline-primary" htmlFor="even">
                  Even
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="col-auto">
              <label htmlFor="semester">Service Selection: </label>
            </div>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              className="w-75"
            />
          </div>
          <div className="col-6">
            {
              loading ? (
                <div className="d-flex justify-content-center mt-2 w-75">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <Button 
                  variant="success" 
                  className="w-75 mt-4"
                  onClick={handleSearch}
                > 
                Search Documents 
                </Button>
              )
            }
            <div className="w-75">
              <p className="text-danger text-center">{`${errorMessage}`}</p>
            </div>
          </div>
        </div>

        {
          serviceData && <div className="prev-doc text-center mt-5 mb-5">
            <h3 className="display-6 mb-5">{`${selectedOption?.label} Document`}</h3>
          </div>
        }
      </div>
    </>
  );
};

export default PreviousDoc;
