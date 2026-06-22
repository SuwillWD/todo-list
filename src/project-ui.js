import { de } from 'date-fns/locale';
import Project from './project';
import { manageProjectStorage } from './storage';

// On each reload
const showAllProject = () => {
    const projectsDiv = document.querySelector('.projects');
    const storedProjects = manageProjectStorage.getAllProjects();
    projectsDiv.textContent = '';

    for (let i = 0; i < storedProjects.length; i++) {
        const projectElement = document.createElement('button');
        const deleteBtn = document.createElement('i');
        projectElement.textContent = storedProjects[i].name;
        projectElement.dataset.id = storedProjects[i].id;

        if ( i == 0) {
            projectElement.classList.add('seleted-project');
        }

        projectsDiv.appendChild(projectElement);
    }

    projectsDiv.addEventListener('click', (event) => {
        if (event.target !== event.currentTarget) {
            Array.from(projectsDiv.children).forEach(child => {
                child.className = '';
            });
            event.target.classList.add('seleted-project');  
            displayCurrentProjectTitle();
        }
    })
};

showAllProject();

const createNewProject = (() => {
    const addProjectBtn = document.getElementById('add-project');
    const projectsDiv = document.querySelector('.projects');
    let projectName = '';
    const addProjectInput = document.createElement('input');
    addProjectInput.place = 'Project Name';

    addProjectInput.addEventListener('keydown', (event) => {
        if (event.key == 'Enter') {
            projectName = addProjectInput.value;
            projectsDiv.lastElementChild.remove();

            const project = new Project(projectName);
            project.createProject();

            showAllProject();
        }
    })

    addProjectBtn.addEventListener('click', () => {
        projectsDiv.appendChild(addProjectInput);
        addProjectInput.focus();
    })

})();

// Get currently selected project
const getCurrentSelectedProjectId = () => {
    const projectsDiv = document.querySelector('.projects');

    const arr = Array.from(projectsDiv.children);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].className == 'seleted-project') {
            return arr[i].dataset.id;
        }
    }

}

const updateProjectStatus = (() => {
    const projectStatusSelect = document.querySelector('#project-status');

    projectStatusSelect.addEventListener('change', (event) => {
        let currentStatus = event.target.value;

        let currentProjectId = getCurrentSelectedProjectId();
        Project.updateProjectStatus(currentProjectId);

    })
})();

function displayCurrentProjectTitle() {
    const projectHeading = document.getElementById('project-title');
    const currentProjectId = getCurrentSelectedProjectId();
    const currentProjectTitle = Project.getProject(currentProjectId).name;

    projectHeading.textContent = currentProjectTitle;

}

const initialProjectStatus = (() => {
    const projectStatusSelect = document.querySelector('#project-status');
    const currentProjectId = getCurrentSelectedProjectId();
    const currentSelectedProjectStatus = Project.getProject(currentProjectId).isCompleted;
    

    if (currentSelectedProjectStatus) {
        projectStatusSelect.value = 'Completed';
    } else {
        projectStatusSelect.value = 'Ongoing';
    }
    displayCurrentProjectTitle();
    
})();

const deleteProject = (() => {
    const deleteProjectBtn = document.getElementById('delete-project');

    deleteProjectBtn.addEventListener('click', () => {
        const currentProjectId = getCurrentSelectedProjectId();
        Project.deleteProject(currentProjectId);
        showAllProject();
        displayCurrentProjectTitle();
    })
})();


export { showAllProject };