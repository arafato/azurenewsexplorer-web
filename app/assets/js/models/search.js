'use strict';

/* global define:true*/
/*globals Environment*/
define(['jquery',
  'knockout',
  'spin',
  '../../../assets/js/environment.js'
], function ($, ko, Spinner) {
  return function () {
    var self = this;

    self.q = ko.observable('');
    self.result = ko.observableArray([]);
    self.next = ko.observable(false);
    self.skip = ko.observable(0);
    
    self.q.subscribe(function(v) {
      self.skip(0);
    });
    
    var target = $('#search')[0];
    var spinner = new Spinner();

    self.callService = function () {
      $.ajax({
        url: Environment.NEWS_SERVICE + '&keyword=' + self.q() + "&" + self.skip(),
        type: 'GET',
        beforeSend: function () {
          spinner.spin(target);
        },
        success: function (data) {
          self.result(data.value);
          if (data['@odata.nextLink']) {
            self.next(true);
            var link = data['@odata.nextLink'];
            self.skip(link.substr(link.indexOf("skip="))); 
          } else {
            self.next(false);
            self.skip(0);
          }
        },
        error: function (data) {
          console.log(data);
        },
        complete: function () {
          spinner.stop();
        }
      });
    };
  };
});