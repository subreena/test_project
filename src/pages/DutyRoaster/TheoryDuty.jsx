import { useRef, useState } from "react";
import Download from "../../assets/components/Download";
const TheoryDuty = () => {
  const [viewDuty, setViewDuty] = useState(false);
  const [dutyData, setDutyData] = useState({
    examYear: '2022',
    semester: '1',
  });

  const pdfRef = useRef();

  const handleInputChange = (e) => {
    const { value, name, id } = e.target;
    const newData = e.target.type === "radio" ? (id === "odd" ? '1' : '2') : value;
    setDutyData({
      ...dutyData,
      [name]: newData,
    });
  };
  const handleViewDuty = () => {
    setViewDuty(!viewDuty);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleViewDuty();
    console.log(dutyData);

    try {
      const response = await fetch(`https://ice-web-nine.vercel.app/generateTheoryDutyRoaster`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dutyData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      console.log(data);
      // setRoutine(data);
      // setErrorMessage("");
    } catch (error) {
      // setErrorMessage(error.message);
      console.error("Error creating exam routine:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div>
          <h2 className="text-center">Theory Exam Duty Roaster</h2>
        </div>
        <hr />
        <div className="mt-3 mb-3">
          <div>
            <form action="" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <div className="row">
                    <div className="col-auto">
                      <label htmlFor="examYear" className="form-label">
                        Exam Year
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="number"
                        name="examYear"
                        min="1900"
                        className="form-control"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row mb-3">
                    <div className="col-auto">
                      <label htmlFor="semester">Semester Selection</label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="radio"
                        className="btn-check"
                        id="odd"
                        name="semester"
                        autoComplete="off"
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
                        onChange={handleInputChange}
                      />
                      <label className="btn btn-outline-primary" htmlFor="even">
                        Even
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-3">
                <button
                  className="btn btn-success bg-success bg-gradient w-50"
                  type="submit"
                >
                  Submit to generate Duty Roaster
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <div
            className={viewDuty ? "w-75 d-block" : "d-none"}
            style={{ margin: "20px auto" }}
          >
            <div ref={pdfRef} className="text-center">
              <div className="card">
                <div className="card-body">
                  <p className="lead text-center">
                    Theory Exam Duty Roaster for year {dutyData.examYear}
                  </p>
                  <p>
                    Semester: {dutyData.semester === 1 ? "Odd" : "Even"}
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="text-center d-flex justify-content-around mt-3">
                <button className="btn btn-secondary bg-secondary bg-gradient ">
                  Manual Edit
                </button>

                <button className="btn btn-primary bg-primary bg-gradient">
                  Submit for Approve
                </button>

                <button className="btn btn-danger bg-danger bg-gradient">
                  Publish
                </button>
              </div>
              <Download pdfRef={pdfRef} fileName={"Theory-Duty-Roaster.pdf"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TheoryDuty;