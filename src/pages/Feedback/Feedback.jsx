import React from "react";
import FeedbackSection from "./../../assets/components/FeedbackSection";
import { Link } from "react-router-dom";

const Feedback = () => {
  return (
    <div className="container  mb-5">
      <div className="feedbacks">
        <div className="feedback-header text-center">
          <h2 className="fs-2">Our Feedbacks</h2>
          <p>
            We appreciate your valuable suggestions to enhance our service and
            gain essential insights for continuous improvement.
          </p>
        </div>
        <div className="feedback-body">
          <div className="col-lg-3">
            <div className="card">
              <div className="card-body">
                <p>
                  By: Name <br />
                  Rating:{" "}
                  {[...Array(5)].map((star, index) => (
                    <span
                      key={index}
                      className="rating-star fs-1 cursor-pointer"
                      style={{
                        color: "#ffc107",
                      }}
                    >
                      &#9733;
                    </span>
                  ))}
                </p>

                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
                  veritatis sit repellat corrupti enim consequatur dignissimos
                  rem odit magnam dolores?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

   
    </div>
  );
};

export default Feedback;
