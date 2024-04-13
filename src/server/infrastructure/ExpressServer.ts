import express, {Application} from "express";
import {Controller} from "./Controller";

export class ExpressServer {
    public app: Application;

    constructor(private controllers: Controller[]) {
        this.app = express();
        this.app.use(express.json());
        this.app.get("/health", (req, res) => res.json({status: "OK"}));
        this.registerControllers();
    }

    private registerControllers(): void {
        this.controllers.forEach(controller => {
            this.app.use(controller.router);
        });
    }

    start(port: number = 3000): void {
        this.app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
}