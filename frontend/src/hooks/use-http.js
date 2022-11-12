import { useCallback, useEffect, useState } from "react";
import axios from "axios";
const useHttp = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const get = useCallback(async (configs) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get(configs.url, {
        params: configs.params ? configs.params : {},
      });
      setData(response.data);
      //console.log(response);
    } catch (error) {
      setError(error.message);
      //console.log(error);
    }
    setLoading(false);
  }, []);
  const post = useCallback(async (configs) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post(configs.url, configs.body);
      setData(response.data);
      //console.log(response);
    } catch (error) {
      setError(error.message);
      //console.log(error);
    }
    setLoading(false);
  }, []);

  const patch = useCallback(async (configs) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.patch(configs.url, configs.body);
      setData(response.data);
    } catch (error) {
      // console.log(error.response.data);
      setError(error.response.data);
    }
    setLoading(false);
  }, []);
  const del = useCallback(async (configs) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.delete(configs.url);
      setData(response.data);
    } catch (error) {
      setError(error.response.data);
    }
    setLoading(false);
  }, []);
  return { data, loading, error, get, post, patch, del, setError };
};

export default useHttp;
