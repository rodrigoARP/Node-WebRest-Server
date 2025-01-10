import { envs } from "./config/envs";
import { ServerApp } from "./presentation/server";





(async () => {

    main();

})();

function main() {
    console.log('This is the main');
    const server = new ServerApp({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
    })
    server.start();
}