
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const server = express();
const port = process.env.PORT || 5000;
var ToDo = [{
    id: 0,
    name: 'design'
},
{
    id: 1,
    name: 'coding'
},
{
    id: 2,
    name: 'test'
}];
server.listen(port, console.log(`server listening on ${port}`));
server.get('/', (req, res) => res.status(200)
    .json({
        message: 'welcome to TODO list',
        ToDo
    }));
    function createToDo(req, res) {
        const {
            id,name,
        } = req.body;
        ToDo[5].id=id;
        ToDo[5].name=name;
        var t=ToDo[5];
        return res.status(201).json({
            status: 201,
            message: 'ToDo created',
            t,
        });
    }

export default server;
