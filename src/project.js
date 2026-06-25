import { manageProjectStorage } from './storage.js';

class Project {

    constructor (name) {
        this.id = generateUUID(),
        this.name = name,
        this.isCompleted = false
    };

    createProject () {
        manageProjectStorage.storeProject(this);
    };

    static deleteProject(projectId) {
        let projectArray = manageProjectStorage.getAllProjects();

        for (let i = 0; i < projectArray.length; i++) {
            if (projectArray[i].id === projectId) {
                projectArray.splice(i, 1);
            }
        }

        manageProjectStorage.updateProjects(projectArray);
    };

    static getProject(projectId) {
        let projectArray = manageProjectStorage.getAllProjects();

        for (let i = 0; i < projectArray.length; i++) {
            if (projectArray[i].id === projectId) {
                return projectArray[i];
            }
        }
    }

    static updateProjectStatus(projectId) {
        let projectArray = manageProjectStorage.getAllProjects();

        for (let i = 0; i < projectArray.length; i++) {
            if (projectArray[i].id === projectId) {
                if (projectArray[i].isCompleted === false) {
                    projectArray[i].isCompleted = true;
                } else {
                    projectArray[i].isCompleted = false;
                }
                // projectArray[i].isCompleted === false ? true: false;
                console.log(projectArray[i].isCompleted)
            }
        }

        manageProjectStorage.updateProjects(projectArray);
    };

    static updateProject(projectId, name) {
        
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

export default Project;