import { Router } from "express"
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";




export class AppRoutes {

    static get routes(): Router{

        const router = Router();
        
        router.use('/api/todos', TodoRoutes.routes ); // el segundo "Argumento es la referencia a la función"

        return router
    }
}