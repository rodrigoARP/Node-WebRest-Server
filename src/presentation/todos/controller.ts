import { Request, response, Response } from "express";

const todos = [
    { id:1, text: 'Work Hard', createdAt: new Date() },
    { id:2 , text: 'Play Hard', createdAt: null },
    { id:3 , text: 'Sleep', createdAt: new Date() },
]

export class TodosController {

    //* Dependency Injection
    constructor(){}


        public getTodos = ( request: Request, response: Response ) => {
            return response.json( todos );
        }

        public getTodoById= ( request: Request, response: Response ) => {
            const id = +request.params.id;
                                 //    |--> Este params.id va de acuerdo a lo que definimos en routes.ts en '/:id' 

            if (isNaN(id)) return response.status(400).json({ error: 'The ID argument is not a number' });

            const searchedTodo = todos.find( todo => todo.id === id );
                                                      //   |--> Este .id va de acuerdo al que este en el arreglo const todos = []
            ( searchedTodo )
            ? response.json(searchedTodo)
            : response.status(404).json({ error: `TODO with id: ${ id }, not found`})
        }

        public createTodo = ( request:Request, response: Response) => {
            const { text } = request.body; //Des-estructuramos del Body que proviende del POST lo que nos interesa mandar al GET, en esta caso nos intersa poner validaciones al texto, que venga el texto al crear algo
            if( !text ) return response.status(400).json({ error: 'Text property is required' });
            
            const newTodo = {
                id: todos.length + 1,
                text: text,
                createdAt: null
            }

            todos.push( newTodo );

            response.json( newTodo );
        }

        // por el momento solo estamos modificando el texto
        public updateTodo = ( request: Request, response: Response ) => {
            const id = +request.params.id; // convertimos el texto proveniente del request a numero con el "+" que esta al principio
            if( isNaN( id )) return response.status( 400 ).json( { error: 'ID argument is not a number'} ); 

            const searchedTodo = todos.find( todo => todo.id === id );  // si yo modifico searchedTodo se modifica literalmente, en este caso, el que este acorde con el id en const todos = [] (Se modifican el searchedTodo que esta en mi listado todos = [] en memoria)
            if( !searchedTodo ) return response.status( 404 ).json( { error: `Todo with ID: ${ id } not found` } );

            const { text, createdAt } = request.body; 
            //if( !text ) return response.status(400).json({ error: 'Text property is required' });

            searchedTodo.text = text || searchedTodo.text; //! OJOOO, referencia (Aqui estamos acutalizando direcamente la referencia)
            ( createdAt === 'null')
            ? searchedTodo.createdAt = null
            : searchedTodo.createdAt = new Date ( createdAt || searchedTodo.createdAt )


            // todos.forEach( ( searchedTodo, index ) => {
            //     if( searchedTodo.id === id ) {
            //         todos[ index ] = searchedTodo;
            //     }
            // })
            response.json( searchedTodo );
        }

        public deleteTodo = ( request: Request, response: Response ) => {
            const id = +request.params.id;
            const searchedTodo = todos.find( todo => todo.id === id ); 
            if( !searchedTodo ) return response.status(404).json( { error: 'Todo not found' });

            

            todos.splice( todos.indexOf(searchedTodo), 1 );
            response.json( searchedTodo );

            // const updatedTodo = todos.filter( todo => todo.id !== id);
            // response.json({
            //     deletedTodo: searchedTodo,
            //     getTodos: updatedTodo,
            // })
        }

}