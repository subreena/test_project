import React from 'react';
import { Row } from 'react-bootstrap';

const BillCalculation10 = () => {
    return (
        <>
        <tr>
         <td>
         ১০. ডাক মাশুল অন্যান্য খরচ ( রশিদ বিলের সাথে সংযুক্ত করতে হবে) <br />
<Row>
০১. <input type="text" name="" id="" className='form-control' style={{width: '100px'}}/> 
</Row><br />
<Row>
০২. <input type="text" name="" id="" className='form-control' style={{width: '100px'}}/> 
</Row>
<br />
<Row>
০৩ <input type="text" name="" id="" className='form-control' style={{width: '100px'}}/>
    </Row> <br />
         </td>
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
                মোট
                </strong>
            </td>
            <td></td>
            <td></td>
        </tr>
        </>
    );
};

export default BillCalculation10;