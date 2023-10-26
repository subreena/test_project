import { Row } from "react-bootstrap";
import "../../assets/stylesheets/ser2-style.css";
const Ser2Page2 = () => {
  return (
    <>
    
    
        <div className="m-4">
          <section className="ser2">
            <div>
              <div className="ser2-heading mt-4 mb-5">
                <h1 className="text-center">ভ্রমন ভাতার বিল</h1>
              </div>
            </div>
            {/* table start */}
            <table>
              <tbody>
                <tr>
                  <td colSpan="4">
                    <p>
    
                      <input
                        type="text"
                        name="taka"
                        placeholder="জিলা"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />
                      <br />
                      <br />
                   
                      <input
                        type="text"
                        name="taka"
                        placeholder="জিলা"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />
                    </p>
                  </td>
                  <td colSpan="5">
                    <p>
                    
                      <input
                        type="text"
                        placeholder=" নাম "
                        name="taka"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />{" "}
                      <br /> <br />
                      {" "}
                      <input
                        type="text"
                        name="taka"
                        placeholder="পদবী"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />{" "}
                      <br /> <br />
                      {" "}
                      <input
                        type="text"
                        name="taka"
                        placeholder="মূল বেতন"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />{" "}
                      <br />
                    </p>
                  </td>
                  <td colSpan="7">
                    <p>
                      {" "}
                      <input
                        type="text"
                        name="taka"
                        placeholder="ভ্রমণ ও অবস্থানের উদ্দেশ্য"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />
                      <br />
                    </p>
                  </td>
                  <td colSpan="5">
                    <p>
                      
                      <input
                        type="text"
                        name="taka"
                        placeholder="মাস"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />{" "}
                      <br />
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colSpan="6">
                    <p>
                      ভ্রমণ ও অবস্থানের বিবরণ:{" "}
                      
                    </p>
                  </td>
                  <td rowSpan="3" style={{ width: "300px" }}>
                    <p>
                      ভ্রমণের ধরন রেলঃ স্টিমারঃ বিমান:{" "}

                    </p>
                  </td>
                  <td rowSpan="3">
                    <p>
                      স্থল পথে ভ্রমণের দূরত্ব মাইলঃ কিলোমিটার:
                      
                    </p>
                  </td>
                  <td rowSpan="3">
                    <p>অবস্থানের দিন সংখ্যা</p>
                  </td>
                  <td rowSpan="3" colSpan="2">
                    <p>
                      রেলঃ স্টিমার ও বিমানের ভাড়া{" "}
                      <input
                        type="text"
                        name="taka"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />{" "}
                      শ্রেণী
                    </p>
                  </td>
                  <td rowSpan="3" colSpan="2">
                    <p>
                      মাইল প্রতিঃ কিলোমিটার প্রতি ভাড়া
                      <input
                        type="text"
                        name="taka"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />
                      <br />
                    </p>
                  </td>
                  <td rowSpan="3" colSpan="2">
                    <p>
                      অবস্থান ভাতা <input
                        type="text"
                        name="taka"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      /> <br />
                    </p>
                  </td>
                  <td colSpan="3">
                    <p>প্রকৃত খরচ</p>
                  </td>
                  <td rowSpan="3" colSpan="2">
                    <p>মোট</p>
                  </td>
                  <td rowSpan="3" colSpan="2">
                    <p>মন্তব্য</p>
                  </td>
                </tr>

                <tr>
                  <td colSpan="3"> প্রস্থান</td>
                  <td colSpan="3">
                    <p>উপস্থিত</p>
                  </td>
                  <td rowSpan="2">
                    <p>বিবরণ</p>
                  </td>
                  <td rowSpan="2" colSpan="2">
                    <p>পরিমাণ</p>
                  </td>
                </tr>

                <tr>
                  <td>
                    <p>স্থান</p>
                  </td>
                  <td>
                    <p>তারিখ</p>
                  </td>
                  <td>
                    <p>সময়</p>
                  </td>
                  <td>
                    <p>স্থান</p>
                  </td>
                  <td>
                    <p>তারিখ</p>
                  </td>
                  <td>
                    <p>সময়</p>
                  </td>
                </tr>

                <tr>
                  <td>১</td>
                  <td>২</td>
                  <td>৩</td>
                  <td>৪</td>
                  <td>৫</td>
                  <td>৬</td>
                  <td>৭</td>
                  <td>৮</td>
                  <td>৯</td>
                  <td colSpan="2">১০</td>
                  <td colSpan="2">১১</td>
                  <td colSpan="2">১২</td>
                  <td>১৩</td>
                  <td colSpan="2">১৪</td>
                  <td colSpan="2">১৫</td>
                  <td>১৬</td>
                </tr>

                <tr>
                  <td rowSpan="4">
                  <input
                        type="text"
                        name="taka"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />
                        <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                  <td rowSpan="4">
                  <input
                        type="text"
                        name="taka"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />
                        <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                  <td rowSpan="4">
                  <input
                        type="text"
                        name="taka"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />
                        <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                  <td rowSpan="4">
                  <input
                        type="text"
                        name="taka"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />
                        <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                  <td rowSpan="4">
                  <input
                        type="text"
                        name="taka"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />
                        <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                  <td rowSpan="4">
                  <input
                        type="text"
                        name="taka"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />
                        <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                  <td rowSpan="4">
                    <p style={{ width: "216px" }}>
                      প্রত্যয়ন করিতেছি যে, আমি
                      <input
                        type="text"
                        name="taka"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />
                       শ্রেণীতে ভ্রমণ করিয়াছি এবং এই
                      জন্য কোন বিল পূর্বে গ্রহণ করি নাই এবং এই ভ্রমণের জন্য অন্য
                      কোন উৎস হইতে কোন আর্থিক সুবিধা গ্রহণ করি নাই।
                      <br />
                      <br />
                      <br />
                      <br />
                    </p>
                    <p>
                      স্বাক্ষর:{" "}
                      <input
                        type="file"
                        name="taka"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />
                    </p>
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    টাঃ{" "}
                    <input
                      type="text"
                      name="taka"
                      id=""
                      style={{ width: "88%", height: "35px" }}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                  <td>
                    পঃ{" "}
                    <input
                      type="text"
                      name="taka"
                      id=""
                      style={{ width: "88%", height: "35px" }}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                  <td>
                    টাঃ{" "}
                    <input
                      type="text"
                      name="taka"
                      id=""
                      style={{ width: "88%", height: "35px" }}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                  <td>
                    পঃ{" "}
                    <input
                      type="text"
                      name="taka"
                      id=""
                      style={{ width: "88%", height: "35px" }}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                  <td>
                    টাঃ{" "}
                    <input
                      type="text"
                      name="taka"
                      id=""
                      style={{ width: "88%", height: "35px" }}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                  <td>
                    পঃ
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                  <td rowSpan="4">
                    <p style={{ width: "216px" }}>
                      বাদ অগ্রিম ভ্রমণ ভাতা
                      <br />
                      <input
                        type="text"
                        name="taka"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />
                      <br /> <br />
                      প্রকৃত প্রধানযোগ্য টাকা
                      <br />
                      <input
                        type="text"
                        name="taka"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />
                    </p>
                  </td>
                  <td>
                    টাঃ{" "}
                    <input
                      type="text"
                      name="taka"
                      id=""
                      style={{ width: "88%", height: "35px" }}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                  <td>
                    পঃ{" "}
                    <input
                      type="text"
                      name="taka"
                      id=""
                      style={{ width: "88%", height: "35px" }}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                  <td>
                    টাঃ{" "}
                    <input
                      type="text"
                      name="taka"
                      id=""
                      style={{ width: "88%", height: "35px" }}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                  <td>
                    পঃ{" "}
                    <input
                      type="text"
                      name="taka"
                      id=""
                      style={{ width: "88%", height: "35px" }}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </td>
                  <td rowSpan="4">
                    <p style={{ width: "196px" }}>
                      প্রত্যয়ন করিতেছি যে,{" "}
                      <input
                        type="text"
                        name="taka"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />{" "}
                      আমি কলেজঃ বিশ্ববিদ্যালয়ঃ সংস্থার অতিথি ভবনে অবস্থান
                      করিয়াছিঃ করি নাই
                    </p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <p>
                      স্বাক্ষর:{" "}
                      <input
                        type="file"
                        name="sign"
                        id=""
                        style={{ width: "88%", height: "35px" }}
                      />
                    </p>
                  </td>
                </tr>

                <tr>
                  <td colSpan="2" rowSpan="2">
                    <p>
                      মোট টাকা:{" "}
                      <input
                        type="text"
                        name="taka"
                        id=""
                        style={{ width: "50%", height: "35px" }}
                      />
                    </p>
                  </td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  <td rowSpan="2"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>

            {/* table end */}
          </section>
        </div>

        <div className="mt-5 ml-3 mr-3">
          <Row>
            <div className="col-3 text-start">
              <br />
              <p>
                বিঃদ্রঃ- বিভিন্ন প্রকারের ভ্রমণ, অর্থাৎ সড়ক, রেল , নৌ, বিমান
                ইত্যাদি এবং অবস্থান একই লাইনে দেখাবেন না।
                <br /> <br />
                বিমানের টিকেট বিলের সঙ্গে সংযোগ করতে হবে।
              </p>
            </div>
            <div className="col-5 text-center">
              <p>
                প্রতি স্বাক্ষর:{" "}
                <input type="file" name="" id="" style={{ width: "50%" }} />
              </p>
              <br />
              <p>
                হিসাব পরিচালক: <input type="text" style={{ width: "50%" }} />
              </p>
            </div>
            <div className="col-4 text-end">
              <p>
                স্বাক্ষর:{" "}
                <input type="file" name="" id="" style={{ width: "70%" }} />{" "}
              </p>

              <p>
                তারিখ:{" "}
                <input type="date" name="" id="" style={{ width: "70%" }} />{" "}
              </p>

              <p>
                ঠিকানা:{" "}
                <input type="text" name="" id="" style={{ width: "70%" }} />
              </p>
            </div>
          </Row>
        </div>
   

  
    </>
  );
};

export default Ser2Page2;
