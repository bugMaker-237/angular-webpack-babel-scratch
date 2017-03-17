import ApplicationController from './application/controller';
import authentificationController from './authentification/controller';
import HomeController from './home/controller';
import ProfileController from './Profile/controller';
import Page1Controller from './page1/controller';
import Page2Controller from './page2/controller';

export default angular
    .module( 'app.controllers', [] )
    .controller( 'ApplicationController', ApplicationController )
    .controller( 'AuthentificationController', authentificationController )
    .controller( 'HomeController', HomeController )
    .controller( 'ProfileController', ProfileController )
    .controller( 'Page1Controller', Page1Controller )
    .controller( 'Page2Controller', Page2Controller )
    .name;