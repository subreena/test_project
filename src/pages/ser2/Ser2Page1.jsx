import "../../assets/stylesheets/ser2-style.css";
import logo from "../../assets/images/nstu-logo.png";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
const Ser2Page1 = () => {
  return (
    <div className="front-page-full">
      <Container>
        <Row>
          <div className="col-8">
            <img
              src={logo}
              alt="NSTU LOGO"
              style={{
                width: "100px",
                marginLeft: "500px",
                marginBottom: "50px",
              }}
            />
          </div>
          <div className="col-4">
            <p>
              ভাউচার নং: <input type="text" name="voucher-number" id="" />
            </p>
            <p>
              ব্যয়ের খাত: <input type="text" name="voucher-number" id="" />
            </p>
          </div>
        </Row>

        <div className="mt-3">
          <div className="text-center">
            <h2>নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়</h2>
            <h3>ভ্রমন ভাতার বিল</h3>
            <br />
          </div>
          <p>
            ডঃ জনাবঃ জনাবাঃ ভ্রমন ভাতা:{" "}
            <input
              type="text"
              name="taka"
              id=""
              style={{ width: "77%", height: "50px" }}
            />
          </p>
          <p>
            দেয় টাকা মাত্র:{" "}
            <input
              type="text"
              name="taka"
              id=""
              style={{ width: "88%", height: "50px" }}
            />
          </p>
          <br />
          <br />
          <br />
          <p className="row">
            <span className=" col-6 text-start">
              <span> তারিখ</span>:{" "}
              <input
                type="date"
                name="taka"
                id=""
                style={{ width: "48%", height: "50px" }}
              />
            </span>

            <span className="col-6 text-end">
              {" "}
              হিসাব পরিচালক:{" "}
              <input
                type="text"
                name=""
                id=""
                style={{ width: "48%", height: "50px" }}
              />
            </span>
          </p>
        </div>
        <div className="top-down-border">
          <p>নিরীক্ষকের অনুমদন</p>
          <textarea
            name=""
            id=""
            style={{ width: "100%", height: "100px" }}
          ></textarea>
        </div>
        <div className="row">
          <div className="col-6">
            <p>
              প্রদত্ত চেক নং:{" "}
              <input
                type="text"
                name=""
                id=""
                style={{ width: "48%", height: "50px" }}
              />
              <br /> <br />
              তারিখ:{" "}
              <input
                type="date"
                name="taka"
                id=""
                style={{ width: "58%", height: "50px" }}
              />
            </p>
          </div>
          <div className="col-6">
            <p className="text-end">
              চেক বুঝিয়া পাইলাম
              <br />
              <span className="text-box text-center"> রাজস্ব টিকেট </span>
            </p>
          </div>
        </div>
        <div className="row" style={{ marginTop: "100px" }}>
            <div className="col-4 text-start">
              <input
                type="text"
                name=""
                id=""
                style={{ width: "50%", height: "50px" }}
              />
              <br />
              <span style={{ fontSize: "20px", textAlign:"center", }}>
              
                হিসাব পরিচালক
              </span>
            </div>
            <div className="col-4  text-center">
              <input
                type="text"
                name=""
                id=""
                style={{ width: "50%", height: "50px" }}
              />
              <br />
              <span style={{ fontSize: "20px",textAlign:"center",  }}>
                রেজিস্ট্রার
              </span>
            </div>
            <div className="col-4 text-end">
              <input
                type="text"
                name=""
                id=""
                style={{ width: "50%", height: "50px" }}
              />
              <br />
              <span style={{ fontSize: "20px", }}>
                প্রাপকের সাক্ষর
              </span>
            </div>
           <br /><br /><br />

          </div>
          <br /><br /><br /><br /><br /><br />
          

          <button type="button" className="btn btn-lg  btn-primary" style={{marginLeft:'90%'}}>
       <Link to="/renumeration-page-2" style={{textDecoration: "none", color: "#fff"}}>
       পরবর্তী
       </Link>
        </button>
      </Container>
    </div>
  );
};

export default Ser2Page1;
