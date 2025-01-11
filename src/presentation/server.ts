import express, { Router } from 'express';
import path from 'path';


interface Options {
    routes: Router; // (A)
    port: number;
    public_path?: string;
}


export class ServerApp {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router; // (B)

    constructor(options: Options) {
        const { port, routes, public_path = 'public' } = options;  //(A)

        this.port = port;
        this.publicPath = public_path;
        this.routes = routes; // el routes despues del " = " proviene de (A), el que esta antes de " = " proviene de (B)
    }

    async start() {

        //* Middlewares
        this.app.use( express.json() ); //cualquier petición que pase por el servidor pasa por este middleware, y si viene el body, entonces lo serializa como un JSON.
        this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded 

        //* Routes
        this.app.use( this.routes )



        //* Public Folder
        this.app.use( express.static( this.publicPath ) );

        //* SPA
        this.app.get( '*', (request, response) => {
            const indexPath = path.join(__dirname + `../../../${ this.publicPath }/index.html`);
            response.sendFile(indexPath);

        });

        this.app.listen( this.port, () => {
            console.log(`Server running on port: ${ this.port }`);
        });
    }
}
