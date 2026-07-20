import { useEffect, useState } from "react";

import projectService from "../services/project.service";

const useProject = () => {

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadProjects = async () => {

        try {

            const response = await projectService.getProjects();

            setProjects(response.data.data);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadProjects();

    }, []);

    return {

        loading,

        projects,

        reload: loadProjects

    };

};

export default useProject;