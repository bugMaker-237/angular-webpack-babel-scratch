import footer from './footer/controller';
import toolbar from './toolbar/controller';
import toolbarTemplate from './toolbar/template.html';
import footerTemplate from './footer/template.html';

export default angular
    .module( 'app.components', [] )
    .component( 'seedFooter', { controller: footer, templateUrl : footerTemplate })
    .component( 'seedToolbar', { controller: toolbar, templateUrl : toolbarTemplate } ).name;