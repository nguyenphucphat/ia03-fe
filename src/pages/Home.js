import React, { useEffect, useState } from "react";
import { getMe } from "../service/userApi";
import Navbar from "./NavBar";

const Home = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        if (response.status === 200) {
          setUser(response.data.data);
          setMessage("");
        } else {
          setMessage("Please login to see your profile.");
        }
      } catch (err) {
        console.log(err);
        setMessage("Please login to see your profile.");
      }
    };

    fetchUser();
  }, []);

  function formatDateTime(isoString) {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {user ? (
          <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md text-gray-800">
            <h1 className="text-3xl font-bold text-center mb-4">
              Welcome, {user.name}
            </h1>
            <div className="text-left space-y-2">
              <p>
                <span className="font-semibold">User ID:</span> {user.id}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Account Created:</span>{" "}
                {formatDateTime(user.createdAt)}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-red-500 p-4 text-lg font-medium">
            {message}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
