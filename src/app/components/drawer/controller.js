import './style';
// import '_img/logo-d.png';
const TEMPLATE = new WeakMap();

class DrawerController {

    constructor($scope) {}
    static getInstance($scope) {
        DrawerController.instance = new DrawerController($scope);
        return DrawerController.instance;
    }
}

DrawerController.getInstance.$inject = ['$scope'];
export default DrawerController.getInstance;