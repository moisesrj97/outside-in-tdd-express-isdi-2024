import {ExpressServer} from "./server/infrastructure/ExpressServer";

const server = new ExpressServer([]);
server.start(3000);