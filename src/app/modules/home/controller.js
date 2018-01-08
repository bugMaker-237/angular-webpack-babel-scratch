import './style.scss';

const SCOPE = new WeakMap();

class HomeController {
    constructor() {
        this.greeting = 'oh Wé!!';
    }
    static getInstance() {
        HomeController.instance = new HomeController();
        return HomeController.instance;
    }
}

export default HomeController.getInstance;