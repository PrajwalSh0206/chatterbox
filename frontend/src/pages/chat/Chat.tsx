import React, { useEffect, useState } from "react";
import "./Chat.scss";
import { REGEX } from "../../constants/common";
import CustomError from "../../services/CustomError";
import { useDispatch } from "react-redux";
import { UserApiService } from "../../services/Users";
import { enableSnackbar } from "../../store/reducers/snackBarReducer";
import { useNavigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface UserDto {
  userId: string;
  username: string;
}

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState<Array<UserDto>>([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const authObj = new UserApiService();
          const response = await authObj.getUser({}, token);
          console.log(response);

          if (REGEX.SUCCESS_CODE.test(response.status.toString())) {
            setUsers(response.data.userDetails);
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        let snackBarpayload = {
          message: "Api Failed In Get Details With Status 500",
          visible: true,
        };
        if (error instanceof CustomError) {
          snackBarpayload.message = error.message;
        }
        dispatch(enableSnackbar(snackBarpayload));
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div id="chat">
      <main>
        <SideBar users={users}></SideBar>
        <section>
          <nav>
            <img src={`https://api.dicebear.com/8.x/shapes/svg?seed=${"Megaman226"}`} alt={"Megaman226"} />
            <p>{"Megaman226"}</p>
          </nav>
          <div id="chat">

          {showPicker && (
            <div id="picker">
              <Picker data={data} onSelect={console.log} />
            </div>
          )}
          </div>
          <footer>
            <input type="text" placeholder="Type something" />
            <button onClick={() => setShowPicker(!showPicker)}>
              {showPicker ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                  />
                </svg>
              )}
            </button>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Chat;
