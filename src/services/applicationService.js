import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/applications`;


export const apply = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(BASE_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response?.data || err.message);
    throw new Error(err.response?.data?.err || "Failed to apply for job");
  }
};


export const getMyApplications = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${BASE_URL}/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


export const getHrApplications = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${BASE_URL}/hr`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
