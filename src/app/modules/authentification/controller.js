import './style.css';

const SCOPE = new WeakMap();
const STATE = new WeakMap();
const AUTH = new WeakMap();

class AuthController{
    constructor( $scope, $state, Authentification ) {
        STATE.set(this, $state);
        AUTH.set(this, Authentification);
    }
    login(){
        console.log(AUTH.get(this));
        
        AUTH.get(this).logIn();
        STATE.get(this).go( 'app.profile' );
    }
    isLoggedIn() {
            return Authentification.loggedIn;
        }
    static getInstance($scope, $state, Authentification ){
        AuthController.instance = new AuthController($scope, $state, Authentification );
        return AuthController.instance;
    }
}

AuthController.getInstance.$inject = ['$scope', '$state', 'Authentification'];
export default AuthController.getInstance;