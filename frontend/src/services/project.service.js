import api from "./api";

const projectService = {
    getProjects() {
        return api.get("/projects");
    },

    getProject(id) {
        return api.get(`/projects/${id}`);
    },

    createProject(data) {
        return api.post("/projects", data);
    },

    updateProject(id, data) {
        return api.put(`/projects/${id}`, data);
    },

    deleteProject(id) {
        return api.delete(`/projects/${id}`);
    }
};

export default projectService;