import axios from 'axios';
import Config from "react-native-config";

const axiosClient = axios.create({
  //baseURL: Config.API_URL,
  baseURL: 'http://192.168.0.193/desidrop/apis/',
  timeout: 120000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

axiosClient.interceptors.response.use(
  (response) => {
    console.log('Axios Response Success:', response);
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log('Axios Request Canceled:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
