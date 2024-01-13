import React from "react";
import { Row } from "react-bootstrap";

const BillFinish = () => {
  return (
    <>
      <p>
        প্রত্যায়ন করা যাচ্ছে যে, উপর্যুক্ত বিবরণী আমার জানামতে সঠিক। বিল পরিশোধ
        করা যেতে পারে। <br />

       <div className="col-4">
       <input type="text" name="" className="form-control" id="" />
       </div>
<p>
স্বাক্ষর ( সীল সহ)
<br />
পরীক্ষা পরিষদের সভাপতি <br />
 বিভাগ <input type="text" name="" style={{width: '70px'}} id="" />
বর্ষ: <input type="text" name="" style={{width: '50px'}} id="" />
টার্ম: <input type="text" name="" style={{width: '50px'}} id="" />
</p>
<p>
    

</p>
<p>
প্রত্যায়ন করা যাচ্ছে যে অত্র বিলের টাকা পূর্বে গ্রহণ করা হয়নি <br />
অতিরিক্ত কোন অর্থ উত্তোলন করলে ফেরত দিতে বাধ্য থাকব। (কথায়: <input type="text" name="" id="" /> )
</p>
      </p>
      <Row>
        <div className="col-3">
            <br /><br />
            <input type="text" name="" className="form-control" id="" /> 
            প্রাপকের স্বাক্ষর ও তারিখ
            <br />
            <br />
            <br />
         <br />
         <br />
         <input type="text" name="" className="form-control" id="" /> 
         অফিস সহকারী


        </div>
        <div className="col-3">
            <p>
            বিলসমূহ নিরিক্ষান্তে পরিশোধ করা যেতে পারে|

            </p>
       
        <br />
            <br />
            <br />
         
         <div style={{border: '2px solid black', width: '50px', height: '60px'}}>
            stamp
         </div>
         <br />
         <input type="text" name="" className="form-control" id="" /> 
         সেকশন অফিসার/ সহকারী পরীক্ষা নিয়ন্ত্রক
        </div>
        <div className="col-3">
        <br />
            <br />
            <br />
         <br /> <br />
         <br />  <br />  <br />

        <input type="text" name="" className="form-control" id="" /> 
        উপ - পরীক্ষা নিয়ন্ত্রক
        </div>
        <div className="col-3">
        <br />
            <br />
            <br />
         <br />
          <br />
          <br />
          <br />
          <br />
        <input type="text" name="" className="form-control" id="" /> 
        পরীক্ষা নিয়ন্ত্রক
        </div>
      </Row>
    </>
  );
};

export default BillFinish;
