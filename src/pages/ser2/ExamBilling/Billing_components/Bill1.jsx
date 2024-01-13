
import { Container, Row } from "react-bootstrap";

const Bill1 = () => {
  return (
    <div className="mt-5 mb-3">
      <Container fluid>
        <Row>
          <div className="col-4">
            <p>
              <input
                type="text"
                placeholder="পরীক্ষকের নাম:"
                name="name"
                id=""
                className="form-control"
              />{" "}
              <br />
              <input
                type="text"
                placeholder="পদবি সহকারে ঠিকানা:"
                className="form-control"
                name="address"
                id=""
              />{" "}
              <br />
              পরীক্ষা অনুষ্ঠানের তারিখ:{" "}
              <input type="date" name="fromDate" id="" /> থেকে{" "}
              <input type="date" name="toDate" id="" /> পর্যন্ত <br />
            </p>
          </div>
          <div className="col-4"></div>
          <div className="col-4">
            <p>
           


                <input type="text" className="form-control" placeholder=" যে বিভাগের পরীক্ষা" name="" id="" /> <br />
               <Row>
              <div className="col-4">
              <select name="" id="" className="form-select">
                    <option value="-1">
                    বর্ষ
                    </option>
                    <option value="4">04</option>
                    <option value="3">03</option>
                    <option value="2">02</option>
                    <option value="1">01</option>
                </select>
              </div>
              <div className="col-4">
              <select name="" id="" className="form-select">
                    <option value="-1">
                    টার্ম
                    </option>
                    <option value="2">02</option>
                    <option value="1">01</option>
                </select>
              </div>
              <div className="col-4">
              <select name="" id="" className="form-select">
                    <option value="-1">
                    শিক্ষাবর্ষ
                    </option>
                    <option value="2">2017-18</option>
                    <option value="1">2018-19</option>
                    <option value="1">2019-20</option>
                    <option value="1">2020-21</option>
                    <option value="1">2021-22</option>
                </select>
              </div>
               
               
               </Row>
            </p>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Bill1;
