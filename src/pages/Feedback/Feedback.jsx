import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const Feedback = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const feedLink = "https://ice-web-nine.vercel.app/feedback";
  useEffect(() => {
    fetch(feedLink)
      .then((res) => res.json())
      .then((data) => {
        setFeedData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // feeback return
  return (
    <div className="container-fluid mb-5">
      <div className="feedbacks">
        <div className="feedback-header text-center mb-4">
          <h2 className="fs-2">Our Feedbacks </h2>
          <p>
            We appreciate your valuable suggestions to enhance our service and
            gain essential insights for continuous improvement.
          </p>
        </div>
        <div className="feedback-body">
          <Container>
           <>
           {loading ? (
              <div
                className="spinner-border text-primary"
                role="status"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
             
               <div className="row">
                {feedData.map((feed, index) => (
                  <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                   <div className="card">
                   <div className="card-body">
                      <p>
                        By: {feed.firstName} {feed.lastName} <br />
                        Rating:{" "}
                        {[...Array(feed.rating)].map((star, index) => (
                          <span
                            key={index}
                            className="rating-star fs-3 cursor-pointer"
                            style={{
                              color: "#ffc107",
                            }}
                          >
                            &#9733;
                          </span>
                        ))}
                      </p>

                      <p>{feed.feedback}</p>
                    </div>
                   </div>
                  </div>
                ))}
              </div>
            
            )}
           </>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
