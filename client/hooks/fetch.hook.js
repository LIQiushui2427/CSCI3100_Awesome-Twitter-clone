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

        const { username } = !query ? await getUsername() : '';
        console.log(username)
        const endpoint = !query ? `/api/user/${username}` : `/api/${query}`;
        const response = await axios.get(endpoint);

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
