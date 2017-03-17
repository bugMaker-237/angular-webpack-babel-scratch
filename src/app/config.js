import applicationTemplate from './modules/application/template.html';

import authentificationTemplate from './modules/authentification/template.html';
import homeTemplate from './modules/home/template.html';
import myProfileTemplate from './modules/profile/template.html';
import page1Template from './modules/page1/template.html';
import page2Template from './modules/page2/template.html';


export default function config($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider){
    
    $locationProvider.html5Mode( {
        enabled: false,
        requireBase: false
    });


    //Setting up the app states
    $stateProvider
    .state( 'app', {
        url: '',
        abstract: true,
        templateUrl: applicationTemplate,
        controller: 'ApplicationController',
        controllerAs:'vm'
    } )
    .state( 'app.home', {
        url: '/',
        templateUrl: homeTemplate,
        controller: 'HomeController',
        controllerAs:'vm'
    } )
    .state( 'app.page1', {
        url: '/page1',
        templateUrl: page1Template,
        controller: 'Page1Controller',
        controllerAs:'vm'
    } )
    .state( 'app.page2', {
        url: '/page2',
        templateUrl: page2Template,
        controller: 'Page2Controller',
        controllerAs:'vm'
    } )
    .state( 'app.auth', {
        url: '/oauth',
        templateUrl: authentificationTemplate,
        controller: 'AuthentificationController',
        controllerAs:'vm'
    } )
    .state( 'app.profile', {
        url: '/profile',
        templateUrl: myProfileTemplate,
        controller: 'ProfileController',
        controllerAs:'vm'
    } );
    $urlRouterProvider.otherwise( '/' );

        
    // setting up the app theme
    $mdThemingProvider.theme('default')
    .primaryPalette('teal', {
      'default': '700', 
      'hue-1': '300', 
      'hue-2': '500', 
      'hue-3': 'A700' 
    })
    .accentPalette('blue-grey', {
      'default': '50' 
    });

}

//Injecting dependencies
config.$inject = ['$stateProvider', '$urlRouterProvider','$locationProvider', '$mdThemingProvider'];
