import React, { useEffect, useState } from "react";
import "./Chat.scss";
import { REGEX } from "../../constants/common";
import CustomError from "../../services/CustomError";
import { useDispatch } from "react-redux";
import { UserApiService } from "../../services/Users";
import { enableSnackbar } from "../../store/reducers/snackBarReducer";
import { useNavigate } from "react-router-dom";

interface UserDto {
  userId: string;
  username: string;
}

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState<Array<UserDto>>([]);

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
        <aside>
          <div className="group">
            <div className="title">
              <div className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                  />
                </svg>
              </div>
              <p>Connect</p>
            </div>
            <div className="searchbar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>

              <input type="text" placeholder="Search Friends" />
            </div>
          </div>
          <div id="users">
            {users.map((value) => {
              return (
                <div className="contact" key={value.userId}>
                  <img src={`https://api.dicebear.com/8.x/shapes/svg?seed=${value.username}`} alt={value.username} />
                  <p>{value.username}</p>
                </div>
              );
            })}
          </div>
          <div className="btn-grp">
            <button id="logout">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>
              <p>Logout</p>
            </button>
            <button id="setting">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                  clipRule="evenodd"
                />
              </svg>

              <p>Setting</p>
            </button>
          </div>
        </aside>
        <section>
          <nav>
            <img src={`https://api.dicebear.com/8.x/shapes/svg?seed=${"Megaman226"}`} alt={"Megaman226"} />
            <p>{"Megaman226"}</p>
          </nav>
          <div id="chat"></div>
          <footer>
            <input type="text" placeholder="Type something" />
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
