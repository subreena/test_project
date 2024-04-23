import { useState } from "react";
import { Table } from "react-bootstrap";

const ManualTheoryRoutineTable = (props) => {
  const { routine, setRoutine } = props;
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  // Function to handle row mouse enter event
  const handleRowMouseEnter = (index) => {
    setHoveredRowIndex(index);
  };

  // Function to handle row mouse leave event
  const handleRowMouseLeave = () => {
    setHoveredRowIndex(null);
  };
  return (
    <>
      <Table style={{ borderStyle: "none" }}>
        <thead>
          <tr
            className="text-center"
            onMouseEnter={() => handleRowMouseEnter(-1)}
            onMouseLeave={handleRowMouseLeave}
          >
            <th style={{ border: "1px solid black" }}>#</th>
            <th style={{ border: "1px solid black" }}>Date</th>
            <th style={{ border: "1px solid black" }}>Course Code</th>
            {hoveredRowIndex === -1 ? (
              <th
                style={{
                  border: "none",
                  backgroundColor: "none",
                  width: "150px",
                }}
              >
                <button
                  className="btn"
                  onClick={() => {
                    const updatedData = [...routine.theoryExamRoutine];
                    const elementToAdd = { date: "", courseCode: "" };
                    updatedData.splice(0, 0, elementToAdd);
                    setRoutine({ ...routine, theoryExamRoutine: updatedData });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                </button>
              </th>
            ) : (
              <th
                style={{
                  border: "none",
                  backgroundColor: "none",
                  width: "150px",
                }}
              ></th>
            )}
          </tr>
        </thead>
        <tbody>
          {routine?.theoryExamRoutine?.map((data, index) => (
            <tr
              key={index}
              className="text-center"
              onMouseEnter={() => handleRowMouseEnter(index)}
              onMouseLeave={handleRowMouseLeave}
            >
              <td
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "rgb(242,242,242)" : "none",
                }}
              >
                {index + 1}
              </td>
              <td
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "rgb(242,242,242)" : "none",
                }}
              >
                <input
                  type="text"
                  value={data.date || ""}
                  onChange={(e) => {
                    const updatedData = [...routine.theoryExamRoutine];
                    updatedData[index].date = e.target.value;
                    setRoutine({ ...routine, theoryExamRoutine: updatedData });
                  }}
                />
              </td>
              <td
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "rgb(242,242,242)" : "none",
                }}
              >
                <input
                  type="text"
                  value={data.courseCode || ""}
                  onChange={(e) => {
                    const updatedData = [...routine.theoryExamRoutine];
                    updatedData[index].courseCode = e.target.value;
                    setRoutine({ ...routine, theoryExamRoutine: updatedData });
                  }}
                />
              </td>
              {hoveredRowIndex === index ? (
                <td
                  style={{
                    border: "none",
                    borderRadius: "5px",
                    width: "150px",
                  }}
                >
                  <button
                    className="btn"
                    style={{ marginRight: "20px" }}
                    onClick={() => {
                      const updatedData = [...routine.theoryExamRoutine];
                      const elementToAdd = { date: "", courseCode: "" };
                      updatedData.splice(index + 1, 0, elementToAdd);
                      setRoutine({
                        ...routine,
                        theoryExamRoutine: updatedData,
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-plus-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      const updatedData = [...routine.theoryExamRoutine];
                      updatedData.splice(index, 1);
                      setRoutine({
                        ...routine,
                        theoryExamRoutine: updatedData,
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-dash-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>
                  </button>
                </td>
              ) : (
                <td style={{ border: "none", width: "150px" }}></td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ManualTheoryRoutineTable;
