import React, { useEffect } from "react";
import "./Snackbar.scss";
import { useDispatch } from "react-redux";
import { disableSnackbar } from "../../store/reducers/snackBarReducer";
import { SnackbarDto } from "../../dto/components/snackbar";

const Snackbar: React.FC<SnackbarDto> = ({ message, visible = false }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        dispatch(disableSnackbar());
      }, 3000);
    }
  }, [visible]);
  return (
    <div id="snackbar" className={`${visible && "show"}`}>
      {message}
    </div>
  );
};

export default Snackbar;
