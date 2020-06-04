const express = require('express')
const server = express();
//const crypto = require('crypto');

server.use(express.json());

const projects = []

/*Middlewares */

function checkProjectExist(request, response, next) {
    const { id } = request.params;

    const project = projects.find(p => p.id === id)

    if (!project) {
        return response.json({ error: 'project id does not exist' })
    }

    return next();
}

function logRequests(request, response, next) {
    console.count('Número de requisições')

    return next();

}

server.use(logRequests);


//Requests

server.post('/projects', (request, response) => {
    const { id, title, tasks } = request.body;

    //const ide = crypto.randomBytes(4).toString('hex')

    const project = {
        id,
        title,
        tasks
    }

    projects.push(project);

    return response.status(200).json({ message: "project saved" });

})

server.get('/projects', (request, response) => {
    return response.json(projects)
})

server.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title } = request.body;

    projects.map((project) => {
        if (project.id == id) {
            project.title = title
        }
    })

    return response.json({ message: 'updated' })
})

server.delete('/projects/:id', checkProjectExist, (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(p => p.id == id);

    projects.slice(projectIndex, 1);

    return response.status(200).json({ message: 'deleted' })
})

server.post('/projects/:id/tasks', (request, response) => {
    const { id } = request.params;
    const { title } = request.body

    //const indexProject = projects.findIndex(p => p.id ===  id);
    //projects[indexProject].tasks.push(title)

    const project = projects.find(p => p.id === id);

    project.tasks.push(title)

    return response.json(project)

})


//http://localhost:3333/projects

server.listen(3333);