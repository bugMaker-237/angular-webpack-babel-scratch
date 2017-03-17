import './style.css';
import template from './template.html';

const TEMPLATE = new WeakMap();

class FooterController{
    constructor($scope){
    }
    static getInstance($scope){
        FooterController.instance = new FooterController($scope);
        return FooterController.instance;
    }
}
FooterController.getInstance.$inject = ['$scope'];
export default FooterController.getInstance;

