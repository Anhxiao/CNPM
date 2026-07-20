import api from "./api";

const taskService = {

    getTasks() {

        return api.get("/tasks");

    },

    getTask(id) {

        return api.get(`/tasks/${id}`);

    },

    createTask(data) {

        return api.post("/tasks", data);

    },

    updateTask(id, data) {

        return api.put(

            `/tasks/${id}`,

            data

        );

    },

    deleteTask(id) {

        return api.delete(

            `/tasks/${id}`

        );

    },

    completeTask(id) {

        return api.patch(

            `/tasks/${id}/complete`

        );

    }

};

export default taskService;