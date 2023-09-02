import axios from "axios";
const vulhubUrl = 'https://desarrollo.planestic.udistrital.edu.co/vulhubapi'
//'http://localhost:3000'

class VulhubService {

    getVulhub() {
        const data = {}
        return axios.get(`${vulhubUrl}/envs`, { params: data })
    }
    deleteVulhubById(id) {
        return axios.delete(`${vulhubUrl}/envs`, { params: { id } })
    }

    getVulhubByid(id) {
        return axios.get(`${vulhubUrl}/envs`, { params: { id } })
    }
    getVulhubByEmail(email) {
        return axios.get(`${vulhubUrl}/envs`, { params: { email: email } })
    }
    createVulhub(data) {
        return axios.post(`${vulhubUrl}/envs`, data)
    }
    updateVulhub(data, id) {
        return axios.put(`${vulhubUrl}/envs`, data, { params: { id } })
    }
}
   
export default new VulhubService();