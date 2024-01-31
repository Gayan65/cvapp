import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const UrlUpdater = () => {
  const prefix = "/cv_profile/";
  const [inputValue, setInputValue] = useState("");
  const [inputClicked, setInputClicked] = useState(false);

  useEffect(() => {
    if (inputClicked) {
      // Update the URL with the current input value
      const url = new URL(window.location.href);
      url.pathname = `${prefix}${inputValue}`;

      // Replace the current state in the browser's history
      window.history.replaceState({}, "", url.toString());
    }
  }, [inputValue, inputClicked]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputClick = () => {
    setInputClicked(true);
  };

  const handleNavigate = () => {
    // Navigate to the URL with the current input value
    const url = new URL(window.location.href);
    url.pathname = `${prefix}${inputValue}`;

    // Use window.location.href to navigate to the new URL
    window.location.href = url.toString();
  };

  return (
    <div className="input-group input-group-lg">
      <input
        type="text"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-lg"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputClick}
      />
      <button
        className="input-group-text magnifying-icon"
        id="inputGroup-sizing-lg"
        onClick={handleNavigate}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default UrlUpdater;
