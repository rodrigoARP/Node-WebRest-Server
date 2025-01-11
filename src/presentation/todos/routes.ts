import { Router } from "express";
import { TodosController } from "./controller";
import { todo } from "node:test";



export class TodoRoutes {

    static get routes(): Router{

        const router = Router();
        const todoController =  new TodosController();

        router.get('/', (response, request) => todoController.getTodos (response, request) ); // Referencia a la función

        router.get('/:id', (response, request) => todoController.getTodoById (response, request) ); // Referencia a la función
                //    |--> Aqui cambiamos lo que estamos buscando (i.e: para id usamos '/:id', si quiero un elemnto que sea "a" usariamos '/:a')

        router.post('/', todoController.createTodo);

        router.put('/:id', todoController.updateTodo);

        router.delete('/:id', todoController.deleteTodo);

        return router
    }
}