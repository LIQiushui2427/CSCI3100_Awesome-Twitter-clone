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
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prevData) => ({ ...prevData, isLoading: true }));
        console.log()
        let username = ""
        if (!query) {
          await getUsername().then(res => {username = res});
        }

        const endpoint = !query ? `api/user/${username}` : `api/${query}`;
        console.log(endpoint)
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
