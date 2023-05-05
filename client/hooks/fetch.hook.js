import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from '../helper/helper';

// set the base URL for all axios requests
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// custom hook that fetches data from the server
export default function useFetch(query) {
  // set initial state for the data
  const [data, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  console.log("query in use fetch", query)

  useEffect(() => {
    // function that fetches the data
    const fetchData = async () => {
      try {
        // set the state to indicate that data is loading
        setData((prevData) => ({ ...prevData, isLoading: true }));
  
        let endpoint, username = "";
  
        // if no query is provided, get the username and fetch the user's data
        if (!query) {
          username = await getUsername();
          endpoint = `api/user/${username}`;
        } else if (typeof query === "object" && query.hasOwnProperty("username")) {
          // if the query is an object with a username property, fetch that user's data
          username = query.username;
          endpoint = `api/user/${username}`;
        } else {
          // otherwise, use the query to determine the endpoint
          endpoint = `api/${query}`;
        }
  
        console.log("Use fetch query", query);
        console.log("endpoint", endpoint);
  
        // make the API call using axios
        const response = await axios.get(`http://localhost:8080/${endpoint}`);
        
        // set the state with the fetched data and status
        setData((prevData) => ({
          ...prevData,
          apiData: response.data,
          status: response.status,
          isLoading: false,
        }));
      } catch (error) {
        // set the state to indicate that an error occurred
        setData((prevData) => ({
          ...prevData,
          isLoading: false,
          serverError: error,
        }));
      }
    };
  
    fetchData();
  }, [query]);

  // return the data and setData function to update the data
  return [data, setData];
}
