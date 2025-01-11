const Sidebar = ({ users = {} }) => {
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"];

  return (
    <div className="h-full bg-white w-3/12 flex flex-col items-center rounded-md border-2 border-gray-300">
      {Object.keys(users).map((key) => (
        <button key={users[key]["userId"]} className="w-full hover:bg-gray-100 p-4 flex space-x-2 items-center border-b-2">
          <p className={`p-2 w-8 h-8 flex items-center justify-center text-white rounded-full ${colors[Math.floor(Math.random() * colors.length)]}`}>
            {users[key]["username"].charAt(0)}
          </p>
          <p>{users[key]["username"]}</p>
          <div className="flex-grow"></div>
          <p className={users[key]["status"] == "online" ? "bg-green-500 w-3 h-3 rounded-full" : "bg-red-500 w-3 h-3 rounded-full"}></p>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
