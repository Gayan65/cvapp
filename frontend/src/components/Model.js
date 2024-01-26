import React from "react";

const Model = (props) => {
  const handleOkyClick = () => {
    window.location.reload();
  };

  return (
    <div>
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {props.title}
              </h1>
            </div>
            <div className="modal-body">{props.message}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOkyClick}
              >
                Oky
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
