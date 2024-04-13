import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {data} from "autoprefixer";
import { getItemFromLocalStorage } from '../utils';

export const UserContext = createContext({});

export function UserProvider({children}) {
  const [user,setUser] = useState(null);
  const [ready,setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      const token = getItemFromLocalStorage('token');
      if (token) {
        axios
          .get('/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(({ data }) => {
            setUser(data);
            setReady(true);
          });
      }
    }
  }, [user]);

  return (
    <UserContext.Provider value={{user,setUser,ready}}>
      {children}
    </UserContext.Provider>
  );
}