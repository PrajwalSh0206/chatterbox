import React, { useEffect, useState } from "react";
import "./SideBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { storeSelectedRecieverDetails } from "../../../store/reducers/recieverReducer";
import { RootState } from "../../../store/store";
import { ReceiverDto, socketUserDto } from "../../../../dto/socket";
import { useNavigate } from "react-router-dom";

const SideBar: React.FC = () => {
  const recieverDetails = useSelector((state: RootState) => state.receiever.receivers);
  const [userDetails, setUserDetails] = useState<Array<ReceiverDto>>([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (recieverDetails.length) {
      setUserDetails(recieverDetails);
    }
  }, [recieverDetails]);

  const setReciever = (receiver: socketUserDto) => {
    const payload = {
      userId: receiver.userId,
      online: receiver.online,
      username: receiver.username,
      socketId: receiver.socketId,
      messages: receiver.messages,
    };
    dispatch(storeSelectedRecieverDetails(payload));
    console.log(recieverDetails, "new connection");
  };

  const handleSearch = (e: any) => {
    const name = e.target.value;
    setSearchText(name);
    const filterDetails = recieverDetails.filter((value) => value.username.toUpperCase().includes(name.toUpperCase()));
    setUserDetails(filterDetails);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
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

          <input type="text" value={searchText} onChange={(e) => handleSearch(e)} placeholder="Search Friends" />
        </div>
      </div>
      <div id="users">
        {userDetails.length > 0 &&
          userDetails.map((value) => {
            return (
              <button className="contact" key={value.userId} onClick={() => setReciever(value)}>
                <img src={`https://api.dicebear.com/8.x/shapes/svg?seed=${value.username}`} alt={value.username} />
                <div className="userInfo">
                  <p>{value.username}</p>
                  {value.messages.length > 0 && (
                    <div className="recentMessage">
                      <small>{value.messages[value.messages.length - 1].content.substring(0, 30)} - </small>
                      <small>
                        {new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "numeric" }).format(
                          new Date(value.messages[value.messages.length - 1].timeStamp)
                        )}
                      </small>
                    </div>
                  )}
                </div>
                <div className={`${value.online ? "green" : ""} status`}></div>
                {/* Online Status */}
              </button>
            );
          })}
      </div>
      <div className="btn-grp">
        <button id="logout" onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
          <p>Logout</p>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
