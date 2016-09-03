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
    self.sortMode = ko.observable('score');

    self.sortedResult = ko.computed(function () {
      return self.result().sort(function (lhs, rhs) {
        if (self.sortMode() === 'score') {
          return lhs['@search.score'] === rhs['@search.score'] ?
            0 :
            lhs['@search.score'] < rhs['@search.score'] ? 1 : -1;
        } else {
          return lhs.timestamp === rhs.timestamp ?
            0 :
            lhs.timestamp < rhs.timestamp ? 1 : -1;
        }
      });
    });
    
    self.buildQueryParams = function() {
      var ordermode = (self.sortMode() === 'score') ? '&ordermode=1' : '&ordermode=3';
      var params = '&keyword=' + self.q() + '&skip=' + self.skip() + ordermode;
      return params;
    }


    self.q.subscribe(function (v) {
      self.skip(0);
      self.result([]);
    });
    
    self.processAbstract = function(data) {
      for(var i = 0; i < data.length - 1; ++i) {
        if(data[i]['@search.highlights']) {
          data[i].abstract = data[i]['@search.highlights'].abstract[0];
        }
      }
      return data;      
    }

    var target = $('#search')[0];
    var spinner = new Spinner();

    self.callService = function () {
      $.ajax({
        url: Environment.NEWS_SERVICE + self.buildQueryParams(),
        type: 'GET',
        beforeSend: function () {
          spinner.spin(target);
        },
        success: function (data) {
          data = JSON.parse(data);
          data.value = self.processAbstract(data.value);
          var array = self.result();
          self.result(array.concat(data.value));
                    
          if (data['@odata.nextLink']) {
            self.next(true);
            var link = data['@odata.nextLink'];
            self.skip(link.substr(link.indexOf("skip=") + 5));
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