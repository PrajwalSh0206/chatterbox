const Sidebar = ({ users = {}, userId, setSelectedUser }) => {
  const handleSelectedUser = (key) => {
    setSelectedUser(key);
  };

  return (
    <div className="h-full px-3 bg-white w-3/12 flex flex-col space-y-2 items-center rounded-md border-2 border-gray-300">
      <div className="flex space-x-2 items-center mt-2 p-2 rounded-md bg-gray-100 border-2 border-gray-300 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>

        <input className="text-sm bg-gray-100 outline-none w-full" placeholder="Search Contact"></input>
      </div>

      {Object.keys(users).map(
        (key) =>
          key != userId && (
            <button
              key={users[key]["userId"]}
              onClick={() => handleSelectedUser(key)}
              className="w-full text-sm hover:bg-gray-100 p-2 flex space-x-3 items-start border-b-2"
            >
              <div className="flex flex-col items-center">
                <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${users[key]["username"]}`} className="w-8 h-8 rounded-md" alt="avatar" />
                <p className={`-mt-1 border-2 border-white w-3 h-3 rounded-full ${users[key]["status"] == "online" ? "bg-green-500" : "bg-red-700"}`}></p>
              </div>

              <p>{users[key]["username"]}</p>
            </button>
          )
      )}
    </div>
  );
};

export default Sidebar;
