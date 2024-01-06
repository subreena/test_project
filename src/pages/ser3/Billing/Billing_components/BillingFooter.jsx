
import { Container, Row } from "react-bootstrap";

const BillingFooter = () => {
  return (
    <>
      <Container fluid>
        <div style={{ borderTop: "2px dashed black", marginTop: "50px",padding:"50px 10px" }}>
          <h3 className="text-center">
            <u>হিসাব বিভাগের জন্য</u>
          </h3>
          <br /> <br />
          <p>
           <Row>
           পরীক্ষান্ত বর্ণিত পারিতোষিক বিল বাবদ কথায় মাত্র পরিশোধ করা হলো।{" "}
            <div className="col-2">
              <input type="text" name="" id="" />
            </div>{" "}
            কথায়{" "}
            <div className="col-2">
              <input type="text" name="" id="" /> 
             
            </div>
            মাত্র পরিশোধ করা হলো |
           </Row>
          </p>
<br />
<br />
       <Container>
       <Row>
     
          <div className="col-2 text-center">
            <input type="text" name="" id="" className="form-control" />
            <p className="text-center">
            সেকশন অফিসার/ সহকারী হিসাব পরিচালক
            </p>
          </div>
       
          <div className="col-2"></div>
         
          <div className="col-2 text-center">
          <input type="text" name="" id="" className="form-control" />
          <p className="text-center">
          উপ -- পরিচালক
          </p>
          </div>
        
          <div className="col-2"></div>
          <div className="col-2 text-center">
          <input type="text" name="" id="" className="form-control" />
          <p className="text-center">
          পরিচালক
          </p>
          </div>
          </Row>
       </Container>
<br /> <br />
          ব্যাংক এডভাইস/ চেক নং <input type="number" name="" id="" /> তারিখ: <input type="date" name="" id="" />
        </div>
      </Container>
    </>
  );
};

export default BillingFooter;
