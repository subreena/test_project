import Bill1 from "./Billing_components/Bill1";
import BillFinish from "./Billing_components/BillFinish";
import BillingFooter from "./Billing_components/BillingFooter";
import BillingHeader from "./Billing_components/BillingHeader";
import BillCalculation from "./Billing_components/BillCalculation";
import { Container } from "react-bootstrap";
import Download from './../../../assets/components/Download';
import { useRef } from "react";

const Billing = () => {
 

  const pdfRef = useRef();
  return (
    <>
      <Container>
        <div className="card"  ref={pdfRef}>
          <div className="card-body mb-5">
            <div className="scrollbar scrollbar-primary ">
              <BillingHeader />
              <hr />
              <p className="text-center">
                (প্রতি বিভাগ, বর্ষ ও টার্মের জন্য আলাদা বিল ফরম ব্যবহার করতে
                হবে)
              </p>
              <p>
                বিলের ক্রমিক নং: <input type="number" name="billno." id="" />{" "}
                <br /> <br />
                <br />
                <p className="text-center">
                  (পরীক্ষার ফল প্রকাশের এক মাসের মধ্যে নির্দিষ্ট বিভাগীয়
                  পরীক্ষা পরিষদের সভাপতির মাধ্যমে পরীক্ষা নিয়ন্ত্রকের অফিসের
                  পারিশ্রমিক বিল পেশ করতে হবে)
                </p>
              </p>
              <Bill1 />
              <p className="text-center">
                সনের পরীক্ষা সমূহের প্রশ্নপত্র প্রণয়ন সমন্বয় সাধন এবং
                উত্তরপত্র মূল্যয়ন ইত্যাদির জন্য আমার পারিশ্রমিকের দাবিসমূহ
                সন্নিবেশিত হল :-
              </p>

              <BillCalculation />
              <BillFinish />
              <BillingFooter />
            </div>
          </div>
         
        </div>
        <Download pdfRef={pdfRef} fileName={"Exam-Bill.pdf"}/>
      </Container>
    </>
  );
};

export default Billing;
