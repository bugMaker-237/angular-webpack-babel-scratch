import './style.css';
import ngImg from './images/angular.png';

const STATE = new WeakMap();
const AUTH = new WeakMap();

class ProfileController{
    constructor($state, Authentification ) {
        STATE.set(this, $state);
        AUTH.set(this, Authentification);

        this.ngImg = ngImg;

        
    }
    logout() {
        AUTH.get(this).logOut();
        STATE.get(this).go( 'app.home' );
    }
    static getInstance( $state, Authentification ){
        ProfileController.instance = new ProfileController($state, Authentification );
        return ProfileController.instance;
    }
}

ProfileController.getInstance.$inject = ['$state', 'Authentification' ];
export default ProfileController.getInstance;