import Router from './Router';
import { ClubController } from "../controllers";

class ClubRouter extends Router {
    private ClubController: ClubController;

    constructor() {
        super();
        this.ClubController = new ClubController();
        this.route();
    }

    route() {
        this.router.get('/', this.ClubController.getAll);
    }
}

export default ClubRouter;
