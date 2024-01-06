import React from "react";
import { Row } from "react-bootstrap";

const BillCalculation2 = () => {
  return (
    <>
      <tr>
        <td>
          <strong>
            ২. প্রশ্নপত্র সমন্বয় সাধন:{" "}
            <input type="text" name="" id="" style={{ width: "50px" }} />{" "}
            পরীক্ষার{" "}
            <input type="text" name="" id="" style={{ width: "40px" }} /> বিষয়{" "}
            <input type="text" name="" id="" style={{ width: "30px" }} /> টা
            প্রশ্নপত্র{" "}
            <input type="text" name="" id="" style={{ width: "30px" }} /> জন
            সদস্য করেন।
          </strong>
        </td>
        <td>
              <input type="number" name="" id="" />
            </td>
            <td>
              <input type="number" name="" id="" />
            </td>
      </tr>
    </>
  );
};

export default BillCalculation2;
