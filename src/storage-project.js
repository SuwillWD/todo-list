function storeProjectToLocalStorage (projectObject) {
    if (localStorage["projectObjects"]) {
        const tempProjectArray = retrieveProjectsFromLocalStorage();
        tempProjectArray.push(projectObject);
        localStorage.setItem('projectObjects', JSON.stringify(tempProjectArray));        
    } else {
        localStorage.setItem('projectObjects', 
            JSON.stringify([projectObject])
        );
    }
};

function retrieveProjectsFromLocalStorage() {
    return [...JSON.parse(
        localStorage['projectObjects']
    )];
};

function updateProjectsOfLocalStorage(projectArray) {
    localStorage["projectObjects"] = JSON.stringify(projectArray);
}

function storeProjectIdInLocalStorage () {
    if (!localStorage["projectId"]) {
        localStorage["projectId"] = 0;
        return 0;
    } else {
        return localStorage["projectId"];
    }
}

function updateProjectIdInLocalStorage(projectId) {
    localStorage["projectId"] = projectId;
}

export { storeProjectToLocalStorage, retrieveProjectsFromLocalStorage, updateProjectsOfLocalStorage, storeProjectIdInLocalStorage, updateProjectIdInLocalStorage };