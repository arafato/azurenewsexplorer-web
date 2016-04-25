'use strict';

/* global define:true*/
define(['jquery',
  'knockout',
  '../../../assets/js/models/nav.js',
  '../../../assets/js/models/search.js',
  'knockout.validation',
  '../../../assets/js/environment.js',
], function ($, ko, Nav, Search) {
  return function () {
    var self = this;

    // Configure knockout validation plugin
    // To decorate form-group elements, use the validationElement binding
    ko.validation.configure({
      decorateElement: true,
      errorElementClass: 'has-error',
      errorMessageClass: 'help-block',
      errorsAsTitle: false
    });

    self.nav = new Nav();
    self.search = new Search();
  };
});
