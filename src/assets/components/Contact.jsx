import { Container, Row } from "react-bootstrap";
import "../../assets/stylesheets/style.css";

const Contact = () => {
  return (
    <div className="contact-section">
      <Container>
        <div className="contact text-center" id="contact">
          <h3>Contact us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, optio.
          </p>
        </div>

        <Row>
          <div className="col-6 col-lg-6 col-md-6 col-sm-12 mt-5 p-5">
            <u><strong><h4>Department of Information and Communication Engineering,</h4></strong></u>
            <h5>Noakhali Science and Technology University</h5>
            <br />

            <p className="text-start">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
              repudiandae voluptas incidunt natus harum porro placeat, fuga aut
              itaque libero.
            </p>
          </div>
          <div className="col-6 col-lg-6 col-md-6 col-sm-12">
            <div className="contact-map">
              <iframe
                title="Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.2928602864513!2d91.10019587427648!3d22.791609779336284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3754af712aaac0b7%3A0x4bab3d112f6b6f3f!2sNoakhali%20Science%20and%20Technology%20University!5e0!3m2!1sen!2sbd!4v1696962431712!5m2!1sen!2sbd"
                style={{
                  borderLeft: "1px solid black",
                  padding: "50px",
                  width: "100%",
                  height: "500px",
                  margin: "10px",
                }}
                allowFullScreen=""
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
