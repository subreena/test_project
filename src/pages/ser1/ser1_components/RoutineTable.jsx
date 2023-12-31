import "bootstrap/dist/css/bootstrap.css";
import "../../../assets/stylesheets/ser1-style.css"


const RoutineTable = () => {
  return (
    <>
    
      
        {/* routine table */}
   
          <table className="routine-table">
            <tr>
              <td className="routine-header-tr">Day</td>
              <td className="routine-header-tr">Term,Year</td>
              <td className="routine-header-tr">9:00-9:45</td>
              <td className="routine-header-tr">9:50-10:35</td>
              <td className="routine-header-tr">10:40-11:25</td>
              <td className="routine-header-tr">11:30-12:15PM</td>
              <td className="routine-header-tr">12:15-1:00PM</td>
              <td className="routine-header-tr">1:00-2:00PM</td>
              <td className="routine-header-tr">2:00-2:50PM</td>
              <td className="routine-header-tr">2:55-3:45PM</td>
            </tr>
      
            {/* <!-- Heading end
        Sunday -->
            <!-- 1-1 --> */}
            <tr>
              <td rowSpan="5">
                <strong><span className="vertical">Sunday</span></strong>
              </td>
              <td><span>Y-1,T-1</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowSpan="25" className="vertical">Lunch Break</td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 1-2 --> */}
            <tr>
              <td><span>Y-1,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 2-2 --> */}
            <tr>
              <td><span>Y-2,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 3-2 --> */}
            <tr>
              <td><span>Y-3,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 4-2 --> */}
            <tr>
              <td><span>Y-4,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
      
            {/* <!-- Heading end
        Monday -->
            <!-- 1-1 --> */}
            <tr>
              <td rowSpan="5">
                <strong><span className="vertical">Monday</span></strong>
              </td>
              <td><span>Y-1,T-1</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 1-2 --> */}
            <tr>
              <td><span>Y-1,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 2-2 --> */}
            <tr>
              <td><span>Y-2,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
      
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 3-2 --> */}
            <tr>
              <td><span>Y-3,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 4-2 --> */}
            <tr>
              <td><span>Y-4,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
      
            {/* <!-- Heading end
        Tueday --> */}
            {/* <!-- 1-1 --> */}
            <tr>
              <td rowSpan="5">
                <strong><span className="vertical">Tuesday</span></strong>
              </td>
              <td><span>Y-1,T-1</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
      
              <td></td>
            </tr>
            {/* <!-- 1-2 --> */}
            <tr>
              <td><span>Y-1,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 2-2 --> */}
            <tr>
              <td><span>Y-2,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 3-2 --> */}
            <tr>
              <td><span>Y-3,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 4-2 --> */}
            <tr>
              <td><span>Y-4,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
      
            {/* <!-- Heading end
        Wednesday -->
            <!-- 1-1 --> */}
            <tr>
              <td rowSpan="5">
                <strong><span className="vertical">Wednesday</span></strong>
              </td>
              <td><span>Y-1,T-1</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 1-2 --> */}
            <tr>
              <td><span>Y-1,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 2-2 --> */}
            <tr>
              <td><span>Y-2,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 3-2 --> */}
            <tr>
              <td><span>Y-3,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 4-2 --> */}
            <tr>
              <td><span>Y-4,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
      
            {/* <!-- Heading end
        Thursday --> */}
            {/* <!-- 1-1 --> */}
            <tr>
              <td rowSpan="5">
                <strong><span className="vertical">Thursday</span></strong>
              </td>
              <td><span>Y-1,T-1</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 1-2 --> */}
            <tr>
              <td><span>Y-1,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 2-2 --> */}
            <tr>
              <td><span>Y-2,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 3-2 --> */}
            <tr>
              <td><span>Y-3,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* <!-- 4-2 --> */}
            <tr>
              <td><span>Y-4,T-2</span></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
      
          {/*  */}
          </table>
     
       {/* end of routine table */}
       {/* menu */}
       
    </>
  );
};

export default RoutineTable;
