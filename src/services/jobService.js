import axios from "axios";
import * as tokenService from "./tokenService";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/jobs`;

const index = async () => {
  try {
    const res = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const create = async (formData) => {
  try {
    const res = await axios.post(BASE_URL, formData, {
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const show = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    });

    return response.data.job;
  } catch (error) {
    console.error(error);
  }
};

const update = async (jobId, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${jobId}`, formData);
    return response.data.job;
  } catch (error) {
    console.error(error);
  }
};

const deleteOne = async (jobId, formData) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${jobId}`);
    return response.data.job;
  } catch (error) {
    console.error(error);
  }
};



export { index, create, show, update, deleteOne };
