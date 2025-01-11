import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { ServerApp } from "./presentation/server";





(async () => {

    main();

})();

function main() {
    console.log('This is the main');
    const server = new ServerApp({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    })
    server.start();
}