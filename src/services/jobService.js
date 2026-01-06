import axios from 'axios'
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/jobs`

const index = async () => {
    const res = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${tokenService.getToken()}` }
    })
    return res.data
}

const create = async (formData) => {
    const res = await axios.post(BASE_URL, formData, {
        headers: { Authorization: `Bearer ${tokenService.getToken()}` }
    })
    return res.data
}

export {
    index,
    create
}