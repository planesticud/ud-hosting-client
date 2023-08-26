import axios from "axios";
const repositoryUrl = 'http://localhost:3000'

class VulhubService {

    getVulhub() {
        const data = {}
        return axios.get(`${repositoryUrl}/envs`, { params: data })
    }
    deleteVulhubById(id) {
        return axios.delete(`${repositoryUrl}/envs`, { params: { id } })
    }

    getVulhubByid(id) {
        return axios.get(`${repositoryUrl}/envs`, { params: { id } })
    }
    getVulhubByEmail(email) {
        return axios.get(`${repositoryUrl}/envs`, { params: { email: email } })
    }
    createVulhub(data) {
        return axios.post(`${repositoryUrl}/envs`, data)
    }
    updateVulhub(data, id) {
        return axios.put(`${repositoryUrl}/envs`, data, { params: { id } })
    }
}
   
export default new VulhubService();