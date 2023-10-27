import RoutineTable from "./ser1_components/RoutineTable";
import "bootstrap/dist/css/bootstrap.css";
import "../../assets/stylesheets/style.css";
import "../../assets/stylesheets/ser1-style.css";
import { Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Routine = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const [showTeacherMenu, setTeacherShowMenu] = useState(false);
  const toggleTeacherMenu = () => {
    setTeacherShowMenu(!showTeacherMenu);
  };

  const [showMR, setshowMR] = useState(true);
  const [showR, setShowR] = useState(false);
  const [term, setTerm] = useState("");

  const toggleR = (event) => {
    const { name } = event.target;
    setTerm(name);
    setshowMR(!showMR);
    setShowR(!showR);
  };
  const toggleRT = () => {
    setshowMR(!showMR);
    setShowR(!showR);
  };

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ice-ps2h27s05-sajib-baruas-projects.vercel.app/teachers")
      .then((response) => response.json())
      .then((data) => {
        setTeachers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="routine-header">
        <h2>Routine</h2>
      </div>
      <Container>
        <Row>
          <div className="col-8">
            <div style={{ display: showMR ? "block" : "none" }}>
              <RoutineTable />
            </div>

            {/* Another table */}
            <div style={{ display: showR ? "block" : "none" }}>
              <table className="routine-table">
                <tr>
                  <td className="routine-header-tr">Day</td>
                  <td className="routine-header-tr">Term,Year</td>
                  <td className="routine-header-tr">9:00-9:45</td>
                  <td className="routine-header-tr">9:50-10:35</td>
                  <td className="routine-header-tr">10:40-11:25</td>
                  <td className="routine-header-tr">11:30-12:15PM</td>
                  <td className="routine-header-tr">12:15-1:00PM</td>
                  <td className="routine-header-tr">1:00-2:00PM</td>
                  <td className="routine-header-tr">2:00-2:50PM</td>
                  <td className="routine-header-tr">2:55-3:45PM</td>
                </tr>

                {/* <!-- Heading end
        Sunday -->
            <!-- 1-1 --> */}
                <tr>
                  <td>
                    <strong>
                      <span className="vertical">Sunday</span>
                    </strong>
                  </td>
                  <td>
                    <strong>
                      <span className="text-center">{term}</span>
                    </strong>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td rowSpan="5" className="vertical">
                    Lunch Break
                  </td>
                  <td></td>
                  <td></td>
                </tr>

                {/* <!-- Heading end
        Monday -->
            <!-- 1-1 --> */}
                <tr>
                  <td>
                    <strong>
                      <span className="vertical">Monday</span>
                    </strong>
                  </td>
                  <td>
                    <strong>
                      <span className="text-center">{term}</span>
                    </strong>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>

                {/* <!-- Heading end
        Tueday --> */}
                {/* <!-- 1-1 --> */}

                <tr>
                  <td>
                    <strong>
                      <span className="vertical">Tuesday</span>
                    </strong>
                  </td>
                  <td>
                    <strong>
                      <span className="text-center">{term}</span>
                    </strong>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                {/* <!-- Heading end
        Wednesday -->
            <!-- 1-1 --> */}
                <tr>
                  <td>
                    <strong>
                      <span className="vertical">Wednesday</span>
                    </strong>
                  </td>
                  <td>
                    <strong>
                      <span className="text-center">{term}</span>
                    </strong>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>

                {/* <!-- Heading end
        Thursday --> */}
                {/* <!-- 1-1 --> */}
                <tr>
                  <td>
                    <strong>
                      <span className="vertical">Thursday</span>
                    </strong>
                  </td>
                  <td>
                    <strong>
                      <span className="text-center">{term}</span>
                    </strong>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                {/* <!-- 1-2 --> */}

                {/*  */}
              </table>
            </div>
            {/* another table end */}
          </div>

          <div className="col-4">
            {/* <h1>BTNSSS</h1> */}
            {/* create btn */}
            <div className="row">
              <div className="col-12">
                <Link to="/create-routine">
                  <button
                    className="btn btn-primary"
                    style={{
                      margin: "30px 10px 10px 30px",
                      padding: "10px",
                      width: "100%",
                    }}
                  >
                    Generate Routine
                  </button>
                </Link>
              </div>
              {/* end of create btn */}
              {/* student btn */}
              <div className="col-12">
                <button
                  className="btn btn-primary"
                  style={{
                    margin: "10px 10px 10px 30px",
                    padding: "10px",
                    width: "100%",
                  }}
                  onClick={toggleMenu}
                >
                  Show Student Routine
                </button>
                {/* all semester */}
              
                  <div
                    style={{
                      display: showMenu ? "block" : "none",
                    }}
                  >
                    <div className="row">
                      {/* 1-1 1-2 */}
                      <div className="col-6">
                        <button
                          className="btn btn-success"
                          style={{
                            margin: "10px 10px 10px 30px",
                            padding: "10px",
                            width: "100%",
                          }}
                          name="1-1"
                          onClick={toggleR}
                        >
                          1-1
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          className="btn btn-success"
                          style={{
                            margin: "10px",
                            padding: "10px",
                            width: "100%",
                          }}
                          name="1-2"
                          onClick={toggleR}
                        >
                          1-2
                        </button>
                      </div>
                      {/* 1-1 1-2 over */}
                      {/* 2 1 2-2 */}
                      <div className="col-6">
                        <button
                          className="btn btn-success"
                          style={{
                            margin: "10px 10px 10px 30px",
                            padding: "10px",
                            width: "100%",
                          }}
                          name="2-1"
                          onClick={toggleR}
                        >
                          2-1
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          className="btn btn-success"
                          style={{
                            margin: "10px",
                            padding: "10px",
                            width: "100%",
                          }}
                          name="2-2"
                          onClick={toggleR}
                        >
                          2-2
                        </button>
                      </div>
                      {/* 3-1 3-2 */}
                      <div className="col-6">
                        <button
                          className="btn btn-success"
                          style={{
                            margin: "10px 10px 10px 30px",
                            padding: "10px",
                            width: "100%",
                          }}
                          name="3-1"
                          onClick={toggleR}
                        >
                          3-1
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          className="btn btn-success"
                          style={{
                            margin: "10px",
                            padding: "10px",
                            width: "100%",
                          }}
                          name="3-2"
                          onClick={toggleR}
                        >
                          3-2
                        </button>
                      </div>
                      {/* 4-1 4-2 */}
                      <div className="col-6">
                        <button
                          className="btn btn-success"
                          style={{
                            margin: "10px 10px 10px 30px",
                            padding: "10px",
                            width: "100%",
                          }}
                          name="4-1"
                          onClick={toggleR}
                        >
                          4-1
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          className="btn btn-success"
                          style={{
                            margin: "10px",
                            padding: "10px",
                            width: "100%",
                          }}
                          name="4-2"
                          onClick={toggleR}
                        >
                          4-2
                        </button>
                      </div>
                    </div>
                  </div>
              
                {/* all semester end */}
              </div>
              {/* std btn edn teacher btn start */}
              <div className="col-12">
              <button
                className="btn btn-primary"
                style={{
                  margin: "10px 10px 10px 30px",
                  padding: "10px",
                  width: "100%",
                }}
                onClick={toggleTeacherMenu}
              >
                Show Teacher Routine
              </button>
              {/* specific teacher */}
              <div
                style={{
                  display: showTeacherMenu ? "block" : "none",
                }}
              >
                <div className="row">
                  {teachers.map((c) => (
                    <div key={c.id} className="col-6">
                      <button
                        className="btn btn-success"
                        style={{
                          margin: "10px 10px 10px 30px",
                          padding: "10px",
                          width: "100%",
                          fontSize: "15px",
                        }}
                        onClick={toggleRT}
                      >
                        {c.firstName} {c.lastName} - {c.teacherCode}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* teacher btn end */}
            </div>

          

            {/* col end */}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Routine;
