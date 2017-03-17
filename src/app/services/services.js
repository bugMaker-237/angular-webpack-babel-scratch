import oauth from './oauth/oauth';

export default angular
    .module( 'app.services', [] )
    .service( 'Authentification', oauth).name;