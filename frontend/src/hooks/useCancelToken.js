import { useRef, useEffect } from "react";
import axios from "axios";
export const useCancelToken = (value) => {
  const cancelToken = useRef();
  useEffect(() => {
    if (typeof cancelToken.current != typeof undefined) {
      cancelToken.current.cancel("Previous Request Canceled");
    }
    cancelToken.current = axios.CancelToken.source();
  }, [value]);
  return cancelToken;
};
