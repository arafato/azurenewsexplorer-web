'use strict';

/* global define:true*/
define(['jquery',
    'knockout',
    'sammy',
      '../../../assets/js/models/application.js'
    ], function ($, ko, Sammy, AppViewModel) {
  return function () {
    var self = this;
    
    var vm = new AppViewModel();
    ko.applyBindings(vm);

    self._sammy = new Sammy(function () {
      this.get('#search', function () {
        vm.nav.chosenMainCategory('search');
      });

      this.get('#api', function () {
        vm.nav.chosenMainCategory('api');
      });
      
      this.get('#contact', function () {
        vm.nav.chosenMainCategory('contact');
      });

      this.get('', function () {
        this.redirect('#search');
      });
    });

    self._sammy.run();
  };
});
