require('plugins/elastic-translator/less/main.less');

require('ui/chrome').setNavBackground('#222222').setTabs([
  {id: 'search', title: 'Search'},
  {id: 'setting', title: 'Setting'}
]);

var app = require('ui/modules').get('app/elastic-translator', []);

require('ui/routes')
  .when('/search', {
    template: require('plugins/elastic-translator/templates/search.html')
  })
  .when('/setting', {
    template: require('plugins/elastic-translator/templates/setting.html')
  })
  .otherwise({
    redirectTo: '/search'
  });

app.controller('searchController', function ($scope, $http) {
  $scope.search = function (keywords) {
    $http.get('/elastic-translator/api/search', {params: {keywords: keywords}})
      .then(function (response) {
        console.log(response);
        $scope.result = response;
      });
  };
  $scope.$watch('keywords', function(newVal, oldVal){
    $scope.search(newVal);
  });
});

app.filter('hl', function ($sce) {
  return function (input, keyword) {
    if (angular.isDefined(keyword) && keyword != "") {
      var pattern = new RegExp(keyword, 'gi');
      return $sce.trustAsHtml(input.replace(pattern, '<mark>' + keyword + '</mark>'));
    } else {
      return $sce.trustAsHtml(input);
    }
  };
});
