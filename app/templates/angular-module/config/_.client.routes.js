'use strict';

//Setting up route
angular.module('mean.<%= slugifiedPluralName %>').config(['$stateProvider',
	function($stateProvider) {

        // Check if the user is connected
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

		// <%= humanizedPluralName %> state routing
		$stateProvider.
		state('list<%= classifiedPluralName %>', {
			url: '/<%= slugifiedPluralName %>',
			templateUrl: 'public/<%= slugifiedPluralName %>/views/list.html',
            resolve: {
                loggedin: checkLoggedin
            }
		}).
		state('create<%= classifiedSingularName %>', {
			url: '/<%= slugifiedPluralName %>/create',
			templateUrl: 'public/<%= slugifiedPluralName %>/views/create.html',
            resolve: {
                loggedin: checkLoggedin
            }
		}).
		state('view<%= classifiedSingularName %>', {
			url: '/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id',
			templateUrl: 'public/<%= slugifiedPluralName %>/views/view.html',
            resolve: {
                loggedin: checkLoggedin
            }
		}).
		state('edit<%= classifiedSingularName %>', {
			url: '/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id/edit',
			templateUrl: 'public/<%= slugifiedPluralName %>/views/edit.html',
            resolve: {
                loggedin: checkLoggedin
            }
		});
	}
]);