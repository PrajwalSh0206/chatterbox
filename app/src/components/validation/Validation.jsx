import React, { useEffect } from "react";
import "./Validation.scss";

const Validation = ({ value, validationConditions, setError }) => {
  const handleValidation = (regex) => {
    return regex instanceof RegExp ? regex.test(value) : regex == value;
  };

  useEffect(() => {
    let result = [];
    validationConditions.map((element) => result.push(handleValidation(element.regex)));
    setError(result.includes(false));
  }, [value]);

  return (
    <div id="validation">
      {validationConditions.map((element) => (
        <div key={element.message}>
          {handleValidation(element.regex) ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <p> {element.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Validation;
