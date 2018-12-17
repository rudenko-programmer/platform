import { Application, Controller } from 'stimulus';
import { definitionsFromContext } from 'stimulus/webpack-helpers';

const jq = require('jquery');

global.$ = jq;
global.jQuery = jq;

window.application = Application.start();
window.Controller = Controller;

const context = require.context('./controllers', true, /\.js$/);
application.load(definitionsFromContext(context));
