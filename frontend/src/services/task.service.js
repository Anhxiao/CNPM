import api from "./api";

const taskService = {
    getTasks(params = {}) {
        return api.get("/tasks", {
            params
        });
    },

    getTask(id) {
        return api.get(`/tasks/${id}`);
    },

    createTask(data) {
        return api.post("/tasks", data);
    },

    updateTask(id, data) {
        return api.put(`/tasks/${id}`, data);
    },

    deleteTask(id) {
        return api.delete(`/tasks/${id}`);
    },

    restoreTask(id) {
        return api.patch(`/tasks/${id}/restore`);
    }
};

export default taskService;