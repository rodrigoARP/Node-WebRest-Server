import { Request, Response } from "express";
import { prisma } from "../../data/postgres/index";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {

    //* Dependency Injection
    constructor(){}


        public getTodos = async( request: Request, response: Response ) => {
            const allTodos = await prisma.todo.findMany();
            return response.json( allTodos );
        }

        public getTodoById = async( request: Request, response: Response ) => {

                                //  |--> Este params.id va de acuerdo a lo que definimos en routes.ts en '/:id' 
            const id = +request.params.id;
            if (isNaN(id)) return response.status(400).json({ error: 'The ID argument is not a number' });

            const specificTodo = await prisma.todo.findFirst({ where: { id } });
                                                      //   |--> Este .id va de acuerdo al que este en el arreglo const todos = []
            ( specificTodo )
            ? response.json( specificTodo )
            : response.status(404).json({ error: `TODO with id: ${ id }, not found`})
        }

        public createTodo = async ( request:Request, response: Response) => {

            const [error, createTodoDto] = CreateTodoDto.create(request.body);
            if( error ) return response.status(400).json({ error: 'Text property is required' });
            
                                    //     |---> Este .todo corresponde al que se encuentra en el schema
            const newTodo = await prisma.todo.create({
                data: createTodoDto!
            });
                
            response.json( newTodo );
        }

        // por el momento solo estamos modificando el texto
        public updateTodo = async( request: Request, response: Response ) => {

            const id = +request.params.id; // convertimos el texto proveniente del request a numero con el "+" que esta al principio
            const [error, updateTodoDto] = UpdateTodoDto.create({...request.body, id});
            if( error ) return response.status(400).json({ error });
            
            const specificTodo = await prisma.todo.findFirst({ where: { id } });
            if( !specificTodo) return response.status( 404 ).json( { error: `Todo with ID: ${ id } not found` } );


            const updatedTodo = await prisma.todo.update({ 
                where: { id },
                data: updateTodoDto!.values
            });

            //if( !text ) return response.status(400).json({ error: 'Text property is required' });


            // todos.forEach( ( searchedTodo, index ) => {
            //     if( searchedTodo.id === id ) {
            //         todos[ index ] = searchedTodo;
            //     }
            // })
            
            response.json( updatedTodo );
        }

        public deleteTodo = async( request: Request, response: Response ) => {
            const id = +request.params.id;

            const saearchedTodo = await prisma.todo.findFirst({ where: { id }});
            if( !saearchedTodo ) return response.status(404).json({ error: `Todo with id ${ id } not found` });

            const deletedTodo = await prisma.todo.delete({
                where: { id },
            });
            
            ( deletedTodo )
                ? response.json( deletedTodo )
                : response.json(404).json({ error: `Todo with id ${ id } not found` })

            // const updatedTodo = todos.filter( todo => todo.id !== id);
            // response.json({
            //     deletedTodo: searchedTodo,
            //     getTodos: updatedTodo,
            // })
        }

}