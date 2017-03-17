import './style.css';

class Page1Controller{
    constructor() {}
    static getInstance(){
        Page1Controller.instance = new Page1Controller();
        return Page1Controller.instance;
    }
}
export default Page1Controller.getInstance;
