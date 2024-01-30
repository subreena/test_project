import { Link } from "react-router-dom";

const Remuneration = () => {
  return (
    <div className="container m-auto">
      <div className="remu-header text-center">
        <h2 className="text-dark">Remuneration</h2>
        <p className="mb-5">
          Digitilized and Simplified Remuneration services like travel billing
          and exam billing
        </p>
      </div>
      <div className="remu-links mt-5">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Travel Billing</h5>
            <p className="card-text">
              We have made the lengthy process of travel billing easy and quick
              by switching from manual processes to a digital system. You can explore this service only by clicking on the button below.
            </p>
            <Link className="card-link" to="/travelbilling">
              <button className="btn btn-primary">Click Here</button>
            </Link>
          </div>
        </div>
        <div className="card mt-3 mb-3">
          <div className="card-body">
            <h5 className="card-title">Exam Billing</h5>
            <p className="card-text">
              The exam billing process is now efficient and straightforward,
              transitioning from manual handwritten methods to a faster digital
              system. Click on the button below to check out this service.
            </p>
            <Link className="card-link" to="/exambillingfront">
              <button className="btn btn-primary">Click Here</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Remuneration;
