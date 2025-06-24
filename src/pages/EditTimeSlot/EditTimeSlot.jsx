import { useEffect, useState } from "react";

const EditTimeSlot = () => {
    const [timeslots, setTimeslots] = useState([]);
    const [selectedTimeslot, setSelectedTimeslot] = useState(null);
    const [newTimeSlot, setNewTimeSlot] = useState({
        start: "",
        end: "",
        isLunchHour: false
    });
    const [timeslotId, setTimeslotId] = useState(null);
    
    const handleNewSlotChange = (field, value) => {
        setNewTimeSlot((prev) => ({
          ...prev,
          [field]: value
        }));
    };
      
    const addTimeslot = () => {
        if (!newTimeSlot.start || !newTimeSlot.end) {
          alert("Start and End time are required!");
          return;
        }
      
        setTimeslots((prev) => [...prev, newTimeSlot]);
      
        // Reset new slot input fields
        setNewTimeSlot({
          start: "",
          end: "",
          isLunchHour: false
        });
    };
      

    useEffect(() => {
        const fetchTimeslot = async () => {
          try {
            const response = await fetch("https://teachercopilot.vercel.app/timeSlot");
            if (!response.ok) {
              throw new Error("Failed to fetch timeslots");
            }
            const data = await response.json();
            setTimeslots(data.data[0].timeSlot);
            setTimeslotId(data.data[0]._id);
          } catch (error) {
            console.error("Error fetching timeslots:", error);
          }
        };
    
        fetchTimeslot();
      }, []);

    // Handle removing a timeslot
    const removeTimeslot = (index) => {
        setTimeslots(timeslots.filter((_, i) => i !== index));
    };

      const [submitError, setSubmitError] = useState("");
      const [submitSuccess, setSubmitSuccess] = useState("");

      const handleSubmit = async (event) => {
        event.preventDefault();

        // to save it at pending service
        try {
          // Make a POST request to your endpoint
          const response = await fetch(`https://teachercopilot.vercel.app/timeSlot/${timeslotId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              timeSlot: timeslots
            }),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
          }
    
          const d = await response.json();
          console.log("response: ", d);
          if (!d.success) {
            setSubmitError(d.error);
            setSubmitSuccess("");
          } else {
            setSubmitError("");
            setSubmitSuccess("Data saved successfully!")
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const handleTimeSlotChange = (index, field, value) => {
        setTimeslots((prevSlots) =>
          prevSlots.map((slot, i) =>
            i === index ? { ...slot, [field]: value } : slot
          )
        );
      };
      
      const handleCheckboxChange = (index) => {
        setTimeslots((prevSlots) =>
          prevSlots.map((slot, i) =>
            i === index ? { ...slot, isLunchHour: !slot.isLunchHour } : slot
          )
        );
      };      

  return (
    <>
        <h2 className="text-center">Time-slot Dashboard</h2>
        <hr />

        <div className="d-flex justify-content-center">
            <div className="container d-flex justify-content-center m-3">
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="text-center">Start Time</th>
                            <th className="text-center">End Time</th>
                            <th className="text-center">State</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {timeslots.map((timeslot, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <input
                                    value={timeslot?.start}
                                    onChange={(e) => handleTimeSlotChange(index, "start", e.target.value)}
                                    className="form-control"
                                />
                            </td>
                            <td>
                                <input
                                    value={timeslot?.end}
                                    onChange={(e) => handleTimeSlotChange(index, "end", e.target.value)}
                                    className="form-control"
                                />
                            </td>
                            <td>
                                <div className="form-check">
                                    <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`LunchBreakCheck-${index}`}
                                    checked={timeslot?.isLunchHour}
                                    onChange={() => handleCheckboxChange(index)}
                                    />
                                    <label className="form-check-label" htmlFor={`LunchBreakCheck-${index}`}>
                                        {timeslot?.isLunchHour ? "Lunch Break" : "Class Hour"}
                                    </label>
                                </div>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => removeTimeslot(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-x-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        ))}
                        {/* Add new timeslot row */}
                        <tr>
                        <td>~</td>
                        <td>
                            <input
                            className="form-control"
                            placeholder="Enter Start Time"
                            value={newTimeSlot.start}
                            onChange={(e) => handleNewSlotChange("start", e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                            className="form-control"
                            placeholder="Enter End Time"
                            value={newTimeSlot.end}
                            onChange={(e) => handleNewSlotChange("end", e.target.value)}
                            />
                        </td>
                        <td>
                            <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="defaultCheck1"
                                checked={newTimeSlot.isLunchHour}
                                onChange={(e) => handleNewSlotChange("isLunchHour", e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Lunch Break
                            </label>
                            </div>
                        </td>
                            <td>
                                <button className="btn btn-success" onClick={addTimeslot}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        {submitError && 
            <div className="alert alert-danger text-center mx-2">
                {submitError}
            </div>
        }

        {submitSuccess && 
            <div className="alert alert-success text-center mx-2">
                {submitSuccess}
            </div>
        }

        <div className="text-center mb-3 d-flex justify-content-around ">
            <button
                className="btn btn-primary text-white bg-primary bg-gradient w-25"
                onClick={handleSubmit}
            >
                {" "}
                Publish
            </button>
        </div>
    </>
  );
};

export default EditTimeSlot;