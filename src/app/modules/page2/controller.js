import './style.css';

const SCOPE = new WeakMap();
const STATE = new WeakMap();
const AUTH = new WeakMap();

class Page2Controller{
    constructor() {}

    static getInstance(){
        Page2Controller.instance = new Page2Controller();
        return Page2Controller.instance;
    }
}
export default Page2Controller.getInstance;
