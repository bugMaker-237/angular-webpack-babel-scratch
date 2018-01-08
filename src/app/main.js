import config from './config';
export default angular
    .module('app', ['ui.router', 'ngMaterial', 'app.controllers', 'app.services', 'app.components'])
    .config(config);