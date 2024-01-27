import { useRef, useState } from "react";
import Select from "react-select";
import Download from "../../assets/components/Download";

const PreviousDoc = () => {
  const pdfRef = useRef();
  const [cardTitle, setCardTitle] = useState("");
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2003 }, (_, index) => {
    const year = 2004 + index;
    return { value: year, label: year.toString() };
  });
  const sessionOptions = [
    { value: "2012-13", label: "2012-13" },
    { value: "2013-14", label: "2013-14" },
    { value: "2014-15", label: "2014-15" },
    { value: "2015-16", label: "2015-16" },
    { value: "2016-17", label: "2016-17" },
    { value: "2017-18", label: "2017-18" },
    { value: "2018-19", label: "2018-19" },
    { value: "2019-20", label: "2019-20" },
    { value: "2019-20", label: "2019-20" },
    { value: "2020-21", label: "2020-21" },
    { value: "2021-22", label: "2021-22" },
    // Add more options as needed
  ];

  const handleSelectChange = (selectedOptions) => {
    console.log(selectedOptions);
  };

  const handleCard = (title) => {
    setCardTitle(title);
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center fs-1 mb-4">Previous Documents</h1>
      </div>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <>
              <>
                <label htmlFor="session" className="form-label">
                  Select session
                </label>
                <>
                  <Select
                    name="session"
                    isMulti
                    options={sessionOptions}
                    onChange={handleSelectChange}
                    className="w-75"
                  />
                </>
              </>
            </>
          </div>
          <div className="col-lg-6 col-sm-12">
            <>
              <>
                <label htmlFor="examYear" className="form-label">
                  Select Exam Year
                </label>
              </>
              <>
                <Select
                  name="session"
                  isMulti
                  options={years}
                  onChange={handleSelectChange}
                  className="w-75"
                />
              </>
            </>
          </div>
        </div>

        <div className="prev-doc text-center mt-5 mb-5">
          <h3 className="display-6 mb-5">See Previous Documents</h3>
          <div className="d-flex justify-content-evenly m-5">
            <button
              className="btn btn-primary w-25"
              onClick={() => handleCard("Previous Routine Documents")}
            >
              Routine
            </button>
            <button
              className="btn btn-primary w-25"
              onClick={() => handleCard("Previous Exam Documents")}
            >
              Exam
            </button>
          </div>
          <div>
            <div className="card" ref={pdfRef}>
              <div className="card-body">
                <h4>{cardTitle ? cardTitle : "Routine and Exam Document"}</h4>
              </div>
            </div>
            {cardTitle ? (
              <Download pdfRef={pdfRef} fileName={"Previous Documenet"} />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviousDoc;
