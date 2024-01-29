import { useState } from 'react';

export const RoutineFunction = () => {
    const [totalBatch, setTotalBatch] = useState(0);
    const [formData, setFormData] = useState({
        examYear: null,
        semester: null,
        startDate: "",
        totalBatch: 1,
        routineDetails: [{session: "", totalStudents: ""}],
    });

    const handleYearChange = (event) => {
        const inputValue = event.target.value;
        const parsedYear = parseInt(inputValue, 10);
    
        if (!isNaN(parsedYear) && parsedYear >= 1900 && parsedYear <= 2100) {
          setFormData({
            ...formData,
            examYear: parsedYear,
          });
        } else {
          // Handle invalid input (optional)
          setFormData({
            ...formData,
            examYear: "",
          });
        }
      };

      const handlebatchRow = (e) => {
        setTotalBatch(parseInt(e.target.value));
        formData.tBatch = e.target.value;
      };

      const handleRoutineArray = (e, i) => {
        const { value, name } = e.target;
        const routineArray = [...formData.routineDetails];
        routineArray[i] = {
          ...routineArray[i],
          [name]: value,
        };
        setFormData({...formData, routineDetails: routineArray });
      };

      const generateRow = () => {
        let row = [];
        for (let i = 1; i <= totalBatch; i++) {
          row.push(
            <tr key={i}>
              <td>
                <label htmlFor={`session`} className="form-label">
                  Session
                </label>
                <input
                  type="text"
                  name={`session`}
                  id={`session-${i}`}
                  className="form-control "
                  required
                  onChange={(e) => handleRoutineArray(e, i)}
                />
              </td>
              <td>
                <label htmlFor={`totalStudent`} className="form-label">
                  Total Student
                </label>
                <input
                  type="number"
                  min="0"
                 
                  className="form-control"
                  name={`totalStudent`}
                  id={`totalStudent-${i}`}
                  onChange={(e) => handleRoutineArray(e, i)}
                  required
                />
              </td>
            </tr>
          );
        }
        return row;
      };
    

    const handleInputChange = (event, index) => {
        const { name, value, id } = event.target;
      
        const newValue =
          event.target.type === "radio" ? (id === "odd" ? 1 : 2) : value;

        console.log(name, value, id, newValue);
      
        setFormData({
          ...formData,
          [name]: newValue,
        });
      };
      
      const handleSubmit =  (event) => {
        event.preventDefault();
      console.log(formData);         
      };

    return {
        formData,
        handleInputChange,
        handleYearChange,
        generateRow,
        handleRoutineArray,
        handlebatchRow,
        handleSubmit
    }
};

export default RoutineFunction;
