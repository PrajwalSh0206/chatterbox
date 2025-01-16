const Feedback = ({ sentiment, sentimentResponse, handleMessage }) => {
  {
    return (
      sentiment != "neutral" && (
        <div className="flex justify-end b space-x-2 p-2">
          {sentimentResponse.map((value) => (
            <button
              onClick={() => {
                handleMessage("", value);
              }}
              className="border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-100 text-sm p-2 bg-white rounded-md shadow-md "
            >
              {value}
            </button>
          ))}
        </div>
      )
    );
  }
};

export default Feedback;
