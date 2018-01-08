import footer from './footer/controller';
import toolbar from './toolbar/controller';
import drawer from './drawer/controller';
import toolbarTemplate from './toolbar/template.html';
import footerTemplate from './footer/template.html';
import drawerTemplate from './drawer/template.html';

export default angular
    .module('app.components', [])
    .component('seedFooter', {
        controller: footer,
        templateUrl: footerTemplate,
        controllerAs: 'vm'
    }).component('seedDrawer', {
        controller: drawer,
        templateUrl: drawerTemplate,
        controllerAs: 'vm'
    })
    .component('seedToolbar', {
        controller: toolbar,
        templateUrl: toolbarTemplate,
        controllerAs: 'vm'
    }).name;