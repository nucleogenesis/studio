import 'core-js';
import 'regenerator-runtime/runtime';
import * as Aphrodite from 'aphrodite';
import * as AphroditeNoImportant from 'aphrodite/no-important';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import KThemePlugin from 'kolibri-design-system/lib/KThemePlugin';
import 'shared/i18n/setup';
// Polyfill indexeddb
import 'fake-indexeddb/auto';
import jquery from 'jquery';
import { setupSchema } from 'shared/data';
import icons from 'shared/vuetify/icons';
import ActionLink from 'shared/views/ActionLink';
import { i18nSetup } from 'shared/i18n';


global.beforeEach(() => {
  return new Promise(resolve => {
    Aphrodite.StyleSheetTestUtils.suppressStyleInjection();
    AphroditeNoImportant.StyleSheetTestUtils.suppressStyleInjection();
    return process.nextTick(resolve);
  });
});

global.afterEach(() => {
  return new Promise(resolve => {
    Aphrodite.StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    AphroditeNoImportant.StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    return process.nextTick(resolve);
  });
});

window.jQuery = window.$ = jquery;

window.storageBaseUrl = '/content/storage/';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuetify, {
  icons: icons(),
});
// Register kolibri-design-system plugin
Vue.use(KThemePlugin);

// Register global components
Vue.component('ActionLink', ActionLink);

i18nSetup(true);

Vue.config.silent = true;
Vue.config.devtools = false;
Vue.config.productionTip = false;

const csrf = global.document.createElement('input');
csrf.name = 'csrfmiddlewaretoken';
csrf.value = 'csrfmiddlewaretoken';
global.document.body.append(csrf);
global.document.body.setAttribute('data-app', true);
global.window.Urls = new Proxy(
  {},
  {
    get(obj, prop) {
      return () => prop;
    },
  }
);

Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });

// This global object is bootstraped into channel_edit.html and is
// assumed by the frontend code for it
global.window.CHANNEL_EDIT_GLOBAL = {
  channel_id: '',
  channel_error: '',
};

setupSchema();
