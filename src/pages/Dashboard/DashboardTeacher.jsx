import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import user from "../../assets/images/user.png";

const DashboardTeacher = () => {
  return (
    <>
      <Row>
        <div className="col-2" style={{ minHeight: "100vh" }}>
          <div>
            <div className="circle mt-5 text-center">
              <img
                src={user}
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
            </div>
            <h3 className=" text-center">User</h3>
          </div>
        </div>
        <div className="col-6 mt-5">
          <Container>
            <Link to="/create-routine">
              <button
                className="btn btn-success"
                style={{
                  margin: "10px",
                  padding: "10px",
                  width: "80%",
                }}
              >
                Generate Routine
              </button>
            </Link>
            <Link to="/examcontrol">
              <button
                className="btn btn-success"
                style={{
                  margin: "10px",
                  padding: "10px",
                  width: "80%",
                }}
              >
                Exam Control
              </button>
            </Link>

            <Link to="/billing">
              <button
                className="btn btn-success"
                style={{
                  margin: "10px",
                  padding: "10px",
                  width: "80%",
                }}
              >
                Billing
              </button>
            </Link>
          </Container>
        </div>
      </Row>
    </>
  );
};

export default DashboardTeacher;
