import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from '../helper/helper';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export default function useFetch(query) {
  const [data, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });
  console.log("query in use fetch", query)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prevData) => ({ ...prevData, isLoading: true }));
  
        let endpoint, username = "";
  
        if (!query) {
          username = await getUsername();
          endpoint = `api/user/${username}`;
        } else if (typeof query === "object" && query.hasOwnProperty("username")) {
          username = query.username;
          endpoint = `api/user/${username}`;
        } else {
          endpoint = `api/${query}`;
        }
  
        console.log("Use fetch query", query);
        console.log("endpoint", endpoint);
  
        const response = await axios.get(`http://localhost:8080/${endpoint}`);
        
        setData((prevData) => ({
          ...prevData,
          apiData: response.data,
          status: response.status,
          isLoading: false,
        }));
      } catch (error) {
        setData((prevData) => ({
          ...prevData,
          isLoading: false,
          serverError: error,
        }));
      }
    };
  
    fetchData();
  }, [query]);
  

  return [data, setData];
}
