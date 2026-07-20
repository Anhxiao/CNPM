import { useEffect, useState } from "react";

import taskService from "../services/task.service";

const useTask = () => {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadTasks = async () => {

        try {

            const response = await taskService.getTasks();

            setTasks(response.data.data);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadTasks();

    }, []);

    return {

        loading,

        tasks,

        reload: loadTasks

    };

};

export default useTask;