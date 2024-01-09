import { Container, Row } from "react-bootstrap";
import "../../assets/stylesheets/style.css";

const Contact = () => {
  return (
    <div className="contact-section" id="#contact">
      <Container fluid>
        <div className="contact text-center" id="contact">
          <h3>Contact us</h3>
          <p>
            Connect with us for inquiries, assistance, and meaningful
            conversations.
          </p>
        </div>

        <Row>
          <div
            className="col-lg-6 col-md-6 col-sm-12 mb-3"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <u>
              <strong>
                <h4 className="fs-4">
                  Department of Information and Communication Engineering,
                  <p className="h6 text-decoration-none">
                    Noakhali Science and Technology University
                  </p>
                </h4>
              </strong>
            </u>

            <br />

            <p className="text-start">
              The Department of Information and Communication Engineering (ICE)
              provides an outstanding opportunity to students to get quality
              education in Information and Communication Technology. It started
              its academic activities from 2012. Since then, it has been widely
              recognized for its excellent research and teaching capabilities.
              <br />
              <br />
            </p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
            <div className="contact-map ratio ratio-1x1">
             
              <iframe
              title="Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5394.670728816324!2d91.10300562222858!3d22.791747167616435!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3754af712aaac0b7%3A0x4bab3d112f6b6f3f!2sNoakhali%20Science%20and%20Technology%20University!5e0!3m2!1sen!2sbd!4v1704739372750!5m2!1sen!2sbd"
                width="300"
                height="200"
               
                className="contact-sec-map border-start-lg-2 border-start-sm-0"
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
