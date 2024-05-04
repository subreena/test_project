import { Container } from "react-bootstrap";
import BillCalculation2 from "./BillCalculation2";
import BillCalculation3 from "./BillCalculation3";
import BillCalculation6 from "./BillCalculation6";
import BillCalculation7 from "./BillCalculation7";
import BillCalculation8 from "./BillCalculation8";
import BillCalculation9 from "./BillCalculation9";
import BillCalculation10 from "./BillCalculation10";

const BillCalculation = () => {
  return (
    <div>
      <Container>
        <table>
          <tr>
            <td></td>
            <td>টাকা</td>
            <td>পয়সা</td>
          </tr>
          <tr>
            <td>
              <strong>১. প্রশ্নপত্র প্রণয়ন</strong>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>ক</td>
            <td>
              <input type="number" name="" id="" />
            </td>
            <td>
              <input type="number" name="" id="" />
            </td>
          </tr>
          <tr>
            <td>খ</td>
            <td>
              <input type="number" name="" id="" />
            </td>
            <td>
              <input type="number" name="" id="" />
            </td>
          </tr>

          <tr>
            <td>গ</td>
            <td>
              <input type="number" name="" id="" />
            </td>
            <td>
              <input type="number" name="" id="" />
            </td>
           
          </tr>
          <tr>
            <td>ঘ</td>
            <td>
              <input type="number" name="" id="" />
            </td>
            <td>
              <input type="number" name="" id="" />
            </td>
          </tr>
          <BillCalculation2 />
          <BillCalculation3 />
          <tr>
            <td>
              <strong>৪.উত্তর পত্র মূল্যায়ন:</strong>
            </td>
            <td>
              <input type="number" name="" id="" />
            </td>
            <td>
              <input type="number" name="" id="" />
            </td>
          </tr>
          <tr>
            <td>ক</td>
            <td>
              <input type="number" name="" id="" />
            </td>
            <td>
              <input type="number" name="" id="" />
            </td>
          </tr>
          <tr>
            <td>খ</td>
            <td>
              <input type="number" name="" id="" />
            </td>
            <td>
              <input type="number" name="" id="" />
            </td>
          </tr>
          <tr>
            <td>গ</td>
            <td>
              <input type="number" name="" id="" />
            </td>
            <td>
              <input type="number" name="" id="" />
            </td>
          </tr>
          <tr>
            <td>
          <strong>
          ৫. ব্যবহারিক পরীক্ষা:
          </strong>
              
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td> <input type="text" name="" id="" style={{ width: "50px" }} />{" "}
              পরীক্ষার{" "}
              <input type="text" name="" id="" style={{ width: "40px" }} />{" "}
              বিষয়{" "}
              <input type="text" name="" id="" style={{ width: "30px" }} /> টা
              প্রশ্নপত্র{" "}
              <input type="text" name="" id="" style={{ width: "30px" }} /> সনের{" "}
              <input type="text" name="" id="" style={{ width: "30px" }} />{" "}
              পরীক্ষায়{" "}
              <input type="text" name="" id="" style={{ width: "30px" }} />{" "}
              বিষয়ে{" "}
              <input type="text" name="" id="" style={{ width: "30px" }} /> দিন</td>
              <td>
              <input type="number" name="" id="" />
            </td>
            <td>
              <input type="number" name="" id="" />
            </td>
          </tr>
          <tr>
            <td> <input type="text" name="" id="" style={{ width: "50px" }} />{" "}
              পরীক্ষার{" "}
              <input type="text" name="" id="" style={{ width: "40px" }} />{" "}
              বিষয়{" "}
              <input type="text" name="" id="" style={{ width: "30px" }} /> টা
              প্রশ্নপত্র{" "}
              <input type="text" name="" id="" style={{ width: "30px" }} /> সনের{" "}
              <input type="text" name="" id="" style={{ width: "30px" }} />{" "}
              পরীক্ষায়{" "}
              <input type="text" name="" id="" style={{ width: "30px" }} />{" "}
              বিষয়ে{" "}
              <input type="text" name="" id="" style={{ width: "30px" }} /> দিন</td>
              <td>
              <input type="number" name="" id="" />
            </td>
            <td>
              <input type="number" name="" id="" />
            </td>
          </tr>
          <tr>
            <td> <input type="text" name="" id="" style={{ width: "50px" }} />{" "}
              পরীক্ষার{" "}
              <input type="text" name="" id="" style={{ width: "40px" }} />{" "}
              বিষয়{" "}
              <input type="text" name="" id="" style={{ width: "30px" }} /> টা
              প্রশ্নপত্র{" "}
              <input type="text" name="" id="" style={{ width: "30px" }} /> সনের{" "}
              <input type="text" name="" id="" style={{ width: "30px" }} />{" "}
              পরীক্ষায়{" "}
              <input type="text" name="" id="" style={{ width: "30px" }} />{" "}
              বিষয়ে{" "}
              <input type="text" name="" id="" style={{ width: "30px" }} /> দিন</td>
              <td>
              <input type="number" name="" id="" />
            </td>
            <td>
              <input type="number" name="" id="" />
            </td>
          </tr>
          <BillCalculation6/>
          <BillCalculation7/>
          <BillCalculation8/>
          <BillCalculation9/>
          <BillCalculation10/>
        </table>
      </Container>
    </div>
  );
};

export default BillCalculation;
