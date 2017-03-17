import './style.css';
import template from './template.html';

const TEMPLATE = new WeakMap();

class ToolbarController{
    
    constructor($scope){
    }
    static getInstance($scope){
        ToolbarController.instance = new ToolbarController($scope);
        return ToolbarController.instance;
    }
}

ToolbarController.getInstance.$inject = ['$scope'];
export default ToolbarController.getInstance;
