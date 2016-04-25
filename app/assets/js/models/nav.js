'use strict';

/* global define:true*/
define(['jquery',
  'knockout',
], function ($, ko) {
  return function () {
    var self = this;

    self.chosenMainCategory = ko.observable();
  };
});