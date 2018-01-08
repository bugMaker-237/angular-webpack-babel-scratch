import './style.scss';
import '_svg/ic_menu_24px.svg';
const DRAWER = new WeakMap();

class ToolbarController {

    /**
     * 
     * @param {angular.material.ISidenavService} $mdSidenav  
     * @param {angular.ui.IState}  $state
     */
    constructor($mdSidenav, $state) {
        this.$mdSidenav = $mdSidenav;
        this.$state = $state;
    }
    toggle() {
        this.$mdSidenav('left', true).toggle();
        if (this.$mdSidenav('left', true).isOpen) {

            let arrs = document.getElementsByClassName('drawer');
            let elt = {};
            angular.forEach(arrs, (element) => {
                let act = element.parentElement.getAttribute('data-active');
                if (act == 'true') {
                    elt = element;
                }
            });
            if (elt.classList.contains('no-disp')) {
                setTimeout(() => {
                    elt.classList.remove('no-disp');
                    elt.classList.add('disp');
                }, 200);
                elt.parentElement.style.width = 'auto';
                elt.parentElement.parentElement.style.marginLeft = '250px';
            } else {
                elt.classList.add('no-disp');
                elt.classList.remove('disp');
                setTimeout(() => {
                    elt.parentElement.style.width = '0px';
                    elt.parentElement.parentElement.style.marginLeft = '0px';
                }, 200);
            }

        }
    }
    static getInstance($mdSidenav, $state) {
        ToolbarController.instance = new ToolbarController($mdSidenav, $state);
        return ToolbarController.instance;
    }
}

ToolbarController.getInstance.$inject = ['$mdSidenav', '$state'];
export default ToolbarController.getInstance;