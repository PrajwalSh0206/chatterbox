const Snackbar = ({ message, visible = false }) => {
  return (
    <div id="snackbar" className={`${visible && "show"}`}>
      {message}
    </div>
  );
};

export default Snackbar;
