import { useState } from "react";
import "../stylesheets/style.css";
import { Link } from "react-router-dom";

const FeedbackSection = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    feedback: '',
    rating: 0,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
    setFormData((prevData) => ({
      ...prevData,
      rating: selectedRating,
    }));
  };
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    
    try{
      const response = await fetch('https://ice-web-nine.vercel.app/feedback',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if(response.ok){
        console.log('Success');
      }else{
        console.log('Failed!');
      }
    }
    catch(error){
      console.log('Error: ', error);
    }
    setSubmitSuccess(true);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      feedback: "",
      rating: null,
    });
    setRating(null);
  };

  return (
    <>
      <div className="container">
        <div className="feed-header text-center mt-5">
          <h3>Send us your Feedback! {' '}
            <Link to='/feedback' style = {{
              fontSize: "0.6em",
              verticalAlign: "super"
            }}> More </Link> 
          </h3>
          <p>
            We highly value your feedback as it plays a crucial role in
            improving and maintaining the quality of our service.
          </p>
        </div>
        <div className="card mb-5">
          <div className="card-body">
            <form action="" onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      placeholder=""
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      placeholder=""
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  placeholder=""
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label>Rate us &nbsp; </label>
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1;
                  const uniqueId = `rating${currentRating}`;
                  return (
                    <label key={index} htmlFor={uniqueId}>
                      &nbsp;
                      <input
                        type="radio"
                        name="rating"
                        id={uniqueId}
                        className="d-none"
                        value={currentRating}
                        onClick={() => handleRatingChange(currentRating)}
                      />
                      <span
                        className="rating-star fs-1 cursor-pointer"
                        style={{
                          color:
                            currentRating <= (hover || rating)
                              ? "#ffc107"
                              : "lightgray",
                        }}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                      >
                        &#9733;
                      </span>
                    </label>
                  );
                })}{" "}
                &nbsp;{" "}
                <span className="badge text-bg-warning"> {rating}/5</span>
              </div>
              <div className="mb-3">
                <label htmlFor="textarea" className="form-label">
                  Feedback
                </label>
                <textarea
                  className="form-control"
                  id="textarea"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleInputChange}
                  rows="2"
                ></textarea>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
            {submitSuccess ? (
              <div className="modal" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <p>Modal body text goes here.</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackSection;
