import './style.css';

class ApplicationController{
    constructor(){}

    static getInstance(){
        ApplicationController.instance = new ApplicationController();
        return ApplicationController.instance;
    }
}
export default ApplicationController.getInstance;
