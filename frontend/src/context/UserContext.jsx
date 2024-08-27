import  axios  from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get("/api/auth/refetch", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
