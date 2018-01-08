import './style.scss';
import '_img/angular.png';

const STATE = new WeakMap();
const AUTH = new WeakMap();

class ProfileController {
    constructor($state, Authentification) {
        STATE.set(this, $state);
        AUTH.set(this, Authentification);


    }
    logout() {
        AUTH.get(this).logOut();
        STATE.get(this).go('app.home');
    }
    static getInstance($state, Authentification) {
        ProfileController.instance = new ProfileController($state, Authentification);
        return ProfileController.instance;
    }
}

ProfileController.getInstance.$inject = ['$state', 'Authentification'];
export default ProfileController.getInstance;