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
      this.get('#home', function () {
        vm.nav.chosenMainCategory('home');
      });

      this.get('#api', function () {
        vm.nav.chosenMainCategory('api');
      });
      
      this.get('#contact', function () {
        vm.nav.chosenMainCategory('contact');
      });

      this.get('', function () {
        this.redirect('#home');
      });
    });

    self._sammy.run();
  };
});
