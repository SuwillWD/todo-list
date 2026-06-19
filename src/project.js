import { manageProjectStorage } from './storage.js';

class project {

    constructor (name) {
        this.id = generateUUID(),
        this.name = name,
        this.isCompleted = false
    };

    createProject (name) {
        manageProjectStorage.storeProject(this);
    };

    deleteProject(projectId) {
        let projectArray = manageProjectStorage.getAllProjects();

        for (let i = 0; i < projectArray.length; i++) {
            if (projectArray[i].id === projectId) {
                projectArray.splice(i, 1);
            }
        }

        manageProjectStorage.updateProjects(projectArray);
    };

    updateProjectStatus(projectId) {
        let projectArray = manageProjectStorage.getAllProjects();

        for (let i = 0; i < projectArray.length; i++) {
            if (projectArray[i].id === projectId) {
                projectArray[i].isCompleted = true;
            }
        }

        manageProjectStorage.updateProjects(projectArray);
    };

    updateProject(projectId, name) {
        
        let projectArray = manageProjectStorage.getAllProjects();

        for (let i = 0; i < projectArray.length; i++) {
            if (projectArray[i].id === projectId) {
                projectArray[i].name = name
            }
        }
        manageProjectStorage.updateProjects(projectArray);
    }
};

// UUID : Universally Unique Identifier using crypto global object
const generateUUID = () => (crypto.randomUUID());

export default project;