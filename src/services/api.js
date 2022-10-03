import axios from "axios";
import config from "../config";

const axiosLoginInst = axios.create({
    baseURL: config.api.authUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer(config.api.clientId + ':' + config.api.clientSecret).toString('base64'))
    },
    params: {
        grant_type: 'client_credentials'
    }
  });

  const axiosInst = axios.create({
    baseURL: config.api.baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem("spotifyToken")}`
    }
  });

  const login=()=> {
    return axiosLoginInst.post(
        "",
        'grant_type=client_credentials'
    ).then((response)=> {
        localStorage.setItem("spotifyToken", response.data.access_token)
    })
  }

const get=(url, queryParams)=> {
    return axiosInst.get(url, queryParams);
}

const post=(url, body)=> {
    return axiosInst.post(url, body);
}

export {
    get, post, login
}