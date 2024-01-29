import React from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

// Assuming you have a state for selectedCourse and a function handleSelectChange

const CustomDropdown = ({ coursesName, selectedCourse, handleSelectChange, title }) => {
  const options = [
    { value: "", label: `All ${title}...` },
    ...coursesName.map((course) => ({ value: course, label: course })),
  ];

  return (
    <div className="d-flex justify-content-center">
      <Form.Group controlId="courseSelect" className="">
        <Form.Label> Search or Select {title}</Form.Label>
        <Select
          options={options}
          value={options.find((option) => option.value === selectedCourse)}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption.value)
          }
          isSearchable={true}
          styles={{
            control: (provided) => ({
              ...provided,
              width: "60vw",
              height: "5vh",
            }),
          }}
        />
      </Form.Group>
    </div>
  );
};

export default CustomDropdown;