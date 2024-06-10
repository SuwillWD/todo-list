import { storeProjectToLocalStorage, retrieveProjectsFromLocalStorage, updateProjectsOfLocalStorage,  storeProjectIdInLocalStorage, updateProjectIdInLocalStorage  } from './storage-project.js';

class project {

    constructor (name) {
        this.id = generateProjectId(),
        this.name = name,
        this.isCompleted = false
    };

};

class manageProjects {

    createProject (name) {
        const projectObject = new project(name);
        storeProjectToLocalStorage(projectObject);
    };

    deleteProject (projectId) {
        let projectArray = retrieveProjectsFromLocalStorage();

        for (let i = 0; i < projectArray.length; i++) {
            if (projectArray[i].id === projectId) {
                projectArray.splice(i, 1);
            }
        }

        updateProjectsOfLocalStorage(projectArray);
    };

    updateProjectStatus(projectId) {
        let projectArray = retrieveProjectsFromLocalStorage();

        for (let i = 0; i < projectArray.length; i++) {
            if (projectArray[i].id === projectId) {
                projectArray[i].isCompleted = true;
            }
        }

        updateProjectsOfLocalStorage(projectArray);
    };

    editProject (name, projectId) {
        this.createProject(name);
        this.deleteProject(projectId);
    }
};

function generateProjectId() {
    let projectId = storeProjectIdInLocalStorage();
    projectId++;
    updateProjectIdInLocalStorage(projectId);
    return projectId;
};

const mgtProject = new manageProjects;
mgtProject.updateProjectStatus(4);
export { manageProjects };