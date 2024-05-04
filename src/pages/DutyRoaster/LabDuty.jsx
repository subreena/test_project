import { useRef, useState } from 'react';
import Download from '../../assets/components/Download';
import { Link } from 'react-router-dom';

const LabDuty = () => {
    const [viewDuty, setViewDuty] = useState(false);
    const [dutyData, setDutyData] = useState({
        examYear: "",
        semester: "",
      });

    const pdfRef = useRef();

    const handleInputChange = (e) => {
      const { value, name, id } = e.target;
      const newData =
        e.target.type === "radio" ? (id === "odd" ? "1" : "2") : value;
      setDutyData({
        ...dutyData,
        [name]: newData,
      });
      console.log("Duty")
      console.log(dutyData);
    };
    const handleViewDuty = () => {
        setViewDuty(!viewDuty);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleViewDuty();
       
        console.log(dutyData);
    
      };

    return (
       <>
       
       <div className="container">
        <div>
          <h2 className="text-center">Lab Exam Duty Roaster</h2>
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
                        type="text"
                        name="examYear"
                        className="form-control"
                        placeholder="e.g: 2023"
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
              <div className="row">
              <div className="col-6">
               <button
                  className="btn btn-success bg-success bg-gradient w-75 h-100"
                  type="submit"
                >
                  Submit to generate Duty Roaster
                </button> 
                </div> 
               <div className="col-6">
               <Link to="/alldocuments">
                <button
                  className="btn btn-success bg-success bg-gradient w-75 h-100"
                  type="button"
                >
                  All Documents
                </button> 
                </Link>  </div> </div>          
              </div>
            </form>
          </div>
        </div>
        <div>
          <div
            className={viewDuty ? " d-block" : "d-none"}
            style={{ margin: "20px auto" }}
          >
            <div ref={pdfRef} className="text-center">
              <div className="card">
                <div className="card-body">
                  <p className="lead text-center">
                    Theory Exam Duty Roaster for year {dutyData.examYear}
                  </p>
                  <p>
                    Semester: {dutyData.semester === "1" ? "Odd" : "Even"}
                    <br />
                    <>
                      
                    </>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="text-center d-flex justify-content-around mt-3">
                <button className="btn btn-secondary bg-secondary bg-gradient h-100">
                  Manual Edit
                </button>

                <button className="btn btn-primary bg-primary bg-gradient h-100">
                  Submit for Approve
                </button>

                <button className="btn btn-danger bg-danger bg-gradient h-100">
                  Publish
                </button>
              </div>
              <Download pdfRef={pdfRef} fileName={"Lab-Duty-Roaster.pdf"} />
            </div>
          </div>
        </div>
      </div>
       </>
    );
};

export default LabDuty;