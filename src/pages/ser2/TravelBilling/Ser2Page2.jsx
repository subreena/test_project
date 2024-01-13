import { Row } from "react-bootstrap";
import "../../../assets/stylesheets/ser2-style.css";
import { useState } from "react";
const Ser2Page2 = () => {
  const [formData2, setFormData2] = useState({
    zilla1: "",
    zilla2: "",
    name1: "",
    salary1: "",
    podobi1: "",
    travelmotive1: "",
    fund1: "",
    costpermile: "",
    travelclass: "",
    month1: "",
    hisab: "",
    sign1: "",
    sign2: "",
    addr: "",
    fromplace1: "",
    fromdate1: "",
    fromtime1: "",
    toplace1: "",
    todate1: "",
    totime1: "",
    medium1: "",
    medium2: "",
    mediumsign1: "",
    tk1: "",
    p1: "",
    tk2: "",
    p2: "",
    tk3: "", p3: "", tk4: "", p4: "", tk5: "", p5: "",
    explain1: "", explain2: "", explain3: "",
    comment1: "", commentsign1: "",
    totaltaka: "",

  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData2((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData2);
  };
  return (
    <>
      <section className="ser2">
        <div>
          <div className="ser2-heading mt-4 mb-5">
            <h1 className="text-center">ভ্রমন ভাতার বিল</h1>
          </div>
        </div>
      </section>

      <form action="" onSubmit={handleSubmit} className="mb-5">
        <div className="container-fluid">
          {/* table start */}
          <div className="scrollbar scrollbar-primary ">
            <div className=" pt-2 pb-2">
              <table className="table remuneration-2-table">
                <tbody>
                  <tr className="remuneration-2-table-tr">
                    <td colSpan="4">
                      <div className="col-12">
                        {/* zilla1 */}
                       <div className="row mb-3">
                       <div className="col-auto">
                       <label htmlFor="zilla1" className="form-label">
                         জিলা
                      </label>
                       </div>
                        <div className="col-auto">
                        <input
                          type="text"
                          name="zilla1"
                          placeholder=""
                          onChange={handleChange}
                          className="form-control"
                          id="zilla1"
                        />
                        </div>
                       </div>
                       <div className="row mb-3">
                       <div className="col-auto">
                        {/* zilla2  */}
                      <label htmlFor="zilla2" className="form-label">
                         জিলা
                      </label>
                       </div>
                        <div className="col-auto">
                        <input
                          type="text"
                          name="zilla2"
                          placeholder=""
                          onChange={handleChange}
                          className="form-control"
                          id="zilla2"
                        />
                        </div>
                       </div>

                        

                      
                      </div>
                    </td>
                    <td colSpan="5">
                      <div className="col-12">
                       <div className="row mb-4">
                       <div className="col-auto">
                        {/* name1  */}
                          <label htmlFor="name1" className="form-label">
                          নাম
                          </label>
                        </div>
                        <div className="col-auto">
                        <input
                          type="text"
                          placeholder=""
                          name="name1"
                          id="name1"
                          onChange={handleChange}
                          className="form-control w-100"
                         />{" "}
                        </div>
                       </div>
                       <div className="row mb-3">
                        <div className="col-auto">
                          <label htmlFor="podobi1" className="form-label">
                          পদবী
                          </label>
                        </div>
                        {/* podobi1 */}
                        <div className="col-auto">
                        <input
                          type="text"
                          name="podobi1"
                          placeholder=""
                          id="podobi1"
                          onChange={handleChange}
                          className="form-control"
                        />
                        </div>
                       </div>
                       {/* salary1  */}
                       <div className="row mb-3">
                        <div className="col-auto">
                          <label htmlFor="salary1" className="form-label">
                          মূল বেতন
                          </label>
                        </div>
                        <div className="col-auto">
                        <input
                          type="text"
                          name="salary1"
                          placeholder=""
                          id="salary1"
                          className="form-control"
                          onChange={handleChange}
                        />
                        </div>
                       </div>
                      </div>
                    </td>
                    <td colSpan="7">
                      <div className="col-12">
                       <div className="row">
                       {/* travelmotive1  */}
                       <div className="col-auto">
                          <label htmlFor="travelmotive1" className="form-label">
                          ভ্রমণ ও অবস্থানের উদ্দেশ্য
                          </label>
                        </div>
                        <div className="col-auto">
                        <input
                          type="text"
                          name="travelmotive1"
                          id="travelmotive1"
                          onChange={handleChange}
                          className="form-control"
                        />
                        </div>
                        {" "}
                       
                       </div>
                        
                      </div>
                    </td>
                    <td colSpan="5">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-auto">
                          {/* month1 */}
                            <label htmlFor="month1" className="form-label">
                            মাস
                            </label>
                          </div>
                          <div className="col-auto">
                          <input
                          type="text"
                          name="month1"
                          placeholder=""
                          id="month1"
                         onChange={handleChange}
                         className="form-control"
                        />{" "}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr className="remuneration-2-table-tr">
                    <td colSpan="6">
                      <p className="text-center">ভ্রমণ ও অবস্থানের বিবরণ: </p>
                    </td>
                    <td rowSpan="3" className="text-center">
                      <p>ভ্রমণের ধরন রেলঃ স্টিমারঃ বিমান: </p>
                    </td>
                    <td rowSpan="3">
                      <p className="text-center">স্থল পথে ভ্রমণের দূরত্ব মাইলঃ কিলোমিটার:</p>
                    </td>
                    <td rowSpan="3">
                      <p>অবস্থানের দিন সংখ্যা</p>
                    </td>
                    <td rowSpan="3" colSpan="2">
                      <p>
                        রেলঃ স্টিমার ও বিমানের ভাড়া{" "}
                        <input
                          type="text"
                          name="travelclass"
                          id="travelclass"
                          className="form-control"
                          onChange={handleChange}
                        />{" "}
                        শ্রেণী
                      </p>
                    </td>
                    <td rowSpan="3" colSpan="2">
                      <p>
                        মাইল প্রতিঃ কিলোমিটার প্রতি ভাড়া
                        <input
                          type="text"
                          name="costpermile"
                          id=""
                         className="form-control"
                         onChange={handleChange}
                        />
                        <br />
                      </p>
                    </td>
                    <td rowSpan="3" colSpan="2">
                      <p>
                        অবস্থান ভাতা{" "}
                        <input
                          type="text"
                          name="fund1"
                          id="fund1"
                         className="form-control"
                         onChange={handleChange}
                        />{" "}
                        <br />
                      </p>
                    </td>
                    <td colSpan="3">
                      <p  className="text-center">প্রকৃত খরচ</p>
                    </td>
                    <td rowSpan="3" colSpan="2">
                      <p  className="text-center">মোট</p>
                    </td>
                    <td rowSpan="3" colSpan="2">
                      <p className="text-center">মন্তব্য</p>
                    </td>
                  </tr>

                  <tr className="remuneration-2-table-tr">
                    <td colSpan="3"> প্রস্থান</td>
                    <td colSpan="3">
                      <p className="text-center">উপস্থিত</p>
                    </td>
                    <td rowSpan="2">
                      <p className="text-center">বিবরণ</p>
                    </td>
                    <td rowSpan="2" colSpan="2">
                      <p  className="text-center">পরিমাণ</p>
                    </td>
                  </tr>

                  <tr className="remuneration-2-table-tr">
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

                  <tr className="remuneration-2-table-tr">
                    <td className="text-center">১</td>
                    <td className="text-center">২</td>
                    <td className="text-center">৩</td>
                    <td className="text-center">৪</td>
                    <td className="text-center">৫</td>
                    <td className="text-center">৬</td>
                    <td className="text-center">৭</td>
                    <td className="text-center">৮</td>
                    <td className="text-center">৯</td>
                    <td colSpan="2" className="text-center">১০</td>
                    <td colSpan="2" className="text-center">১১</td>
                    <td colSpan="2" className="text-center">১২</td>
                    <td className="text-center">১৩</td>
                    <td colSpan="2" className="text-center">১৪</td>
                    <td colSpan="2" className="text-center">১৫</td>
                    <td>১৬</td>
                  </tr>

                  <tr className="remuneration-2-table-tr">
                    <td rowSpan="4" style={{width: "100px"}}>
                    <p className="mb-3">
                      {/* fromplace1  */}
                    <input
                        type="text"
                        name="fromplace1"
                        id="fromplace1"
                        placeholder="From place"
                        onChange={handleChange}
                        className="form-control width-150"
                      />
                    </p>

                     
                    </td>
                    <td rowSpan="4">
                      {/* fromdate1 */}
                      <p className="mb-3">
                      <input
                        type="date"
                        name="fromdate1"
                        id="fromdate1"
                        className="form-control"
                        onChange={handleChange}
                      />
                      </p>
                     
                    </td>
                    <td rowSpan="4">
                      <p className="mb-3">
                        {/* fromtime1 */}
                      <input
                        type="time"
                        name="fromtime1"
                        id="fromtime1"
                       className="form-control"
                       onChange={handleChange}
                      />
                      </p>
                    
                    </td>
                    <td rowSpan="4">
                      {/* toplace1  */}
                      <input
                        type="text"
                        name="toplace1"
                        id="toplace1"
                        placeholder="To place"
                        className="form-control width-150"
                        onChange={handleChange}
                      />
                     
                    </td>
                    <td rowSpan="4">
                      {/* todate1  */}
                      <input
                        type="date"
                        name="todate1"
                        id="todate1"
                        className="form-control"
                        onChange={handleChange}
                      />
                     
                    </td>
                    <td rowSpan="4">
                      {/* totime1  */}
                      <input
                        type="time"
                        name="totime1"
                        
                        id="totime1"
                        className="form-control"
                        onChange={handleChange}
                      />
                      
                    </td>
                    <td rowSpan="4">
                       {/* totime1  */}
                       <input
                        type="text"
                        name="medium1"
                        placeholder="medium"
                        id="totime1"
                        className="form-control mb-5 width-150"
                        onChange={handleChange}
                      />

                      <p >
                        প্রত্যয়ন করিতেছি যে, আমি
                        <input
                          type="text"
                          name="medium2"
                          id=""
                          className="form-control"
                          onChange={handleChange}
                        />
                        শ্রেণীতে ভ্রমণ করিয়াছি এবং এই জন্য কোন বিল পূর্বে গ্রহণ
                        করি নাই এবং এই ভ্রমণের জন্য অন্য কোন উৎস হইতে কোন আর্থিক
                        সুবিধা গ্রহণ করি নাই।
                       
                      </p>
                      <p>
                        স্বাক্ষর:{" "}
                        <input
                          type="text"
                          name="mediumsign1"
                          id=""
                          className="form-control"
                          onChange={handleChange}
                        />
                      </p>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      টাঃ{" "}
                      <input
                        type="text"
                        name="tk1"
                        id="tk1"
                        className="form-control width-50"
                          onChange={handleChange}
                      />
                    
                    </td>
                    <td>
                      পঃ{" "}
                      <input
                        type="text"
                        name="p1"
                        id="p1"
                        className="form-control width-50"
                          onChange={handleChange}
                      />
                    
                    </td>
                    <td>
                      টাঃ{" "}
                      <input
                        type="text"
                        name="tk2"
                        id="tk2"
                        className="form-control width-50"
                        onChange={handleChange}
                      />
                     
                    </td>
                    <td>
                      পঃ{" "}
                      <input
                        type="text"
                        name="p2"
                        id="p2"
                        className="form-control width-50"
                          onChange={handleChange}
                      />
                     
                    </td>
                    <td>
                      টাঃ{" "}
                      <input
                        type="text"
                        name="tk3"
                        id="tk3"
                        className="form-control width-50"
                        onChange={handleChange}
                      />
                   
                    </td>
                    <td>
                      পঃ 
                      <input
                        type="text"
                        name="p3"
                        id="p3"
                        className="form-control width-50"
                        onChange={handleChange}
                      />
                   
                     
                    </td>
                    <td rowSpan="4">
                    <input
                          type="text"
                          name="explain1"
                          id="explain1"
                          className="form-control mb-5" 
                        onChange={handleChange}
                        />
                      <p>
                        বাদ অগ্রিম ভ্রমণ ভাতা
                        <br />
                        <input
                          type="text"
                          name="explain2"
                          id=""
                          className="form-control width-50"
                        onChange={handleChange}
                        />
                        <br /> <br />
                        প্রকৃত প্রধানযোগ্য টাকা
                        <br />
                        <input
                          type="text"
                          name="explain3"
                          id="explain3"
                          className="form-control"
                        onChange={handleChange}
                        />
                      </p>
                    </td>
                    <td>
                      টাঃ{" "}
                      <input
                        type="text"
                        name="tk4"
                        id=""
                        className="form-control width-50"
                        onChange={handleChange}
                      />
                      
                    </td>
                    <td>
                      পঃ{" "}
                      <input
                        type="text"
                        name="p4"
                        id=""
                        className="form-control width-50"
                        onChange={handleChange}
                      />
                   
                    </td>
                    <td>
                      টাঃ{" "}
                      <input
                        type="text"
                        name="tk5"
                        id=""
                        className="form-control width-50"
                        onChange={handleChange}
                      />
                     
                    </td>
                    <td>
                      পঃ{" "}
                      <input
                        type="text"
                        name="p5"
                        id=""
                        className="form-control width-50"
                        onChange={handleChange}
                      />
                     
                    </td>
                    <td rowSpan="4">
                      <p >
                        প্রত্যয়ন করিতেছি যে,{" "}
                        <input
                          type="text"
                          name="comment1"
                          id="comment1"
                          className="form-control mb-5"
                          onChange={handleChange}
                        />{" "}
                        আমি কলেজঃ বিশ্ববিদ্যালয়ঃ সংস্থার অতিথি ভবনে অবস্থান
                        করিয়াছিঃ করি নাই
                      </p>
                      
                      <p>
                        স্বাক্ষর:{" "}
                        <input
                          type="text"
                          name="commentsign1"
                          id="commentsign1"
                          className="form-control"
                        onChange={handleChange}
                        />
                      </p>
                    </td>
                  </tr>

                  <tr className="remuneration-2-table-tr">
                    <td colSpan="2" rowSpan="2">
                      <p>
                        মোট টাকা:{" "}
                        <input
                          type="number"
                          name="totaltaka"
                          id="totaltaka"
                          className="form-control mb-3"
                       onChange={handleChange}
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

                  <tr className="remuneration-2-table-tr">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* table end */}
        </div>
        <div className="container">
          <div className="mt-4">
            <Row className="d-lg-flex justify-content-between ">
              <div className="col-lg-3 col-sm-12 mb-3">
                <p className="mb-3">
                  বিঃদ্রঃ- বিভিন্ন প্রকারের ভ্রমণ, অর্থাৎ সড়ক, রেল , নৌ, বিমান
                  ইত্যাদি এবং অবস্থান একই লাইনে দেখাবেন না। বিমানের টিকেট বিলের
                  সঙ্গে সংযোগ করতে হবে।
                </p>
              </div>
              <div className="col-lg-5 col-sm-12 mb-3">
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-auto">
                      {/* sign  */}
                      <label htmlFor="sign1" className="form-label">
                        প্রতি স্বাক্ষর:{" "}
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        name="sign1"
                        id="sign1"
                        onChange={handleChange}
                        value={formData2.sign1}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    {/* hisab porichalok */}
                    <div className="col-auto">
                      <label htmlFor="hisab" className="form-label">
                        হিসাব পরিচালক:{" "}
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        name="hisab"
                        id="hisab"
                        value={formData2.hisab}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-12 mb-3">
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-auto">
                      {/* sign2  */}
                      <label htmlFor="sign2" className="form-label">
                        {" "}
                        স্বাক্ষর:{" "}
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        name="sign2"
                        id="sign2"
                        value={formData2.sign2}
                        onChange={handleChange}
                        className="form-control"
                      />{" "}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-auto">
                      {/* date 1 */}
                      <label htmlFor="date1" className="form-label">
                        তারিখ:{" "}
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="date"
                        name="date1"
                        id="date1"
                        value={formData2.date1}
                        onChange={handleChange}
                        className="form-control"
                      />{" "}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-auto">
                      {/* addr */}
                      <label htmlFor="addr" className="form-label">
                        ঠিকানা:{" "}
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        name="addr"
                        id="addr"
                        className="form-control"
                        value={formData2.addr}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </div>

       <div className="d-flex align-items-center justify-content-center">
       <button type="submit" className="btn btn-primary w-50">
          Submit
        </button>
       </div>
      </form>
    </>
  );
};

export default Ser2Page2;
