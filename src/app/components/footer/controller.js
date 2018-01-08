import './style.scss';
class FooterController {
    constructor($scope) {}
    static getInstance($scope) {
        FooterController.instance = new FooterController($scope);
        return FooterController.instance;
    }
}
FooterController.getInstance.$inject = ['$scope'];
export default FooterController.getInstance;