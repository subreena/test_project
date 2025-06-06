import React, { useEffect } from "react";

const LoaderStatus = ({ status, loadingMessage, successMessage, errorMessage, successLink, errorLink }) => {

  const LOADING = 1, SUCCESS = 2, ERROR = 3;

  if (status === LOADING) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h6 className="text-center mx-2">
          {loadingMessage}
        </h6>
      </div>
    );
  }

  if (status === SUCCESS) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-check-circle-fill text-success" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
        <h6 className="text-center mx-2">{successMessage}</h6>
        {successLink && (
          <a href={successLink.href} target="_blank" rel="noopener noreferrer">
            {successLink.label}
          </a>
        )}
      </div>
    );
  }

  if (status === ERROR) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-file-excel-fill text-danger" viewBox="0 0 16 16">
          <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5.884 4.68 8 7.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 8l2.233 2.68a.5.5 0 0 1-.768.64L8 8.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 8 5.116 5.32a.5.5 0 1 1 .768-.64"/>
        </svg>
        <h6 className="text-center mx-2">{errorMessage}</h6>
        {errorLink && (
          <a href={errorLink.href} target="_blank" rel="noopener noreferrer">
            {errorLink.label}
          </a>
        )}
      </div>
    );
  }

  return null;
};

export default LoaderStatus;
