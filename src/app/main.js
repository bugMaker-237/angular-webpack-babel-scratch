import config from './config';
import controllers from './modules/modules';
import components from './components/components';
import services from './services/services';


export default angular
    .module('app', ['ui.router', 'ngMaterial',controllers, services, components])
    .config(config);