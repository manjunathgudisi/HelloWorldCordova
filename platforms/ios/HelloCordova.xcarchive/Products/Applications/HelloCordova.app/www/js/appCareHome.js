

//var Oneview = angular.module('Oneview', ['ngRoute', 'ngAnimate', 'route-segment', 'view-segment', 'snap', 'vs-repeat', 'monospaced.elastic', 'ngDropdowns', 'angularbox']);
MyApp.run(function ($rootScope, $templateCache) {
    FastClick.attach(document.body);
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
        // alert("asd");
    });
});
// configure our routes
MyApp.config(function ($routeSegmentProvider, $routeProvider, snapRemoteProvider) {

    snapRemoteProvider.globalOptions = {
        touchToDrag: false,
        hyperextensible: false
        // ... others options
    }
    $routeSegmentProvider.options.autoLoadTemplates = true;

    $routeSegmentProvider

    .when('/auth', 'auth')
    .when('/login', 'login')
    .when('/nav', 'nav')

    .when('/nav/dashboard', 'nav.dashboard')
    .when('/nav/downloads', 'nav.downloads')
    .when('/newdc', 'nav.new-dc')

    .when('/nav/my-alerts', 'nav.my-alerts')
    .when('/nav/my-support', 'nav.my-support')
    .when('/my-approval', 'nav.my-approval')

    .when('/nav/settings', 'nav.settings')
    .when('/nav/my-audit', 'nav.my-audit')
    .when('/nav/my-actions', 'nav.my-actions')
    .when('/ViewRecords', 'nav.view-records')

    .when('/nav/actionfollowupdownloads', 'nav.actionfollowupdownloads')
    .when('/nav/my-action-followup', 'nav.my-action-followup')
    .when('/nav/my-action-followup-details', 'nav.my-action-followup-details')
    
    .when('/3', 'nav.listview-group')
    .when('/29', 'nav.listview-group')
    .when('/41', 'nav.listview-group')
    .when('/53', 'nav.listview-group')
    .when('/71', 'nav.listview-group')
    .when('/84', 'nav.listview-group')
    .when('/87', 'nav.listview-group')
    .when('/97', 'nav.listview-group')

    .segment('auth', {
        templateUrl: 'Templates/authendication.html',
        controller: 'AuthenticationController'
    })

    .segment('login', {
        templateUrl: 'Templates/login.html',
        controller: 'LoginController'
    })

    .segment('nav', {
        default: true,
        templateUrl: 'Templates/nav.html',
        controller: 'NavController'
    })

    .within()

    .segment('dashboard', {
        default: true,
        templateUrl: 'Templates/dashboard.html',
        resolve: {
            data: function ($timeout) {
                return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
            }
        },
        untilResolved: {
            templateUrl: 'Templates/loading.html'
        }
    })

    .segment('downloads', {
        templateUrl: 'Templates/my-downloads.html',
        resolve: {
            data: function ($timeout) {
                return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
            }
        },
        untilResolved: {
            templateUrl: 'Templates/loading.html'
        }
    })

    .segment('listview-group', {
        templateUrl: 'Templates/ListView.html',
        resolve: {
            data: function ($timeout) {
                return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
            }
        },
        untilResolved: {
            templateUrl: 'Templates/loading.html'
        }
    })

    .segment('new-dc', {
            templateUrl: 'Templates/new-dc.html',
            resolve: {
                data: function ($timeout) {
                    return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
                }
            },
            untilResolved: {
                templateUrl: 'Templates/loading.html'
            }
        })

    .segment('view-records', {
        templateUrl: 'Templates/EKFC/view-records.html',
        resolve: {
            data: function ($timeout) {
                return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
            }
        },
        untilResolved: {
            templateUrl: 'Templates/loading.html'
        }
    })

    .segment('actionfollowupdownloads', {
            templateUrl: 'Templates/my-actionfollowup-downloads.html',
            resolve: {
                data: function ($timeout) {
                    return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
                }
            },
            untilResolved: {
                templateUrl: 'Templates/loading.html'
            }
        })

    .segment('my-action-followup', {
              //templateUrl: 'Templates/my-audit.html',
              templateUrl: 'Templates/ActionFollowUp.html',
              //controller: 'MyAuditController',
              resolve: {
                  data: function ($timeout) {
                      return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
                  }
              },
              untilResolved: {
                  templateUrl: 'Templates/loading.html'
              }
          })

    .segment('my-action-followup-details', {
          //templateUrl: 'Templates/my-audit.html',
          templateUrl: 'Templates/my-action-detail.html',
          //controller: 'MyAuditController',
          resolve: {
              data: function ($timeout) {
                  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
              }
          },
          untilResolved: {
              templateUrl: 'Templates/loading.html'
          }
      })

    .segment('settings', {
         templateUrl: 'Templates/settings.html',
         resolve: {
             data: function ($timeout) {
                 return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
             }
         },
         untilResolved: {
             templateUrl: 'Templates/loading.html'
         }
     })

    .segment('my-audit', {
          templateUrl: 'Templates/my-audit-new.html',
          resolve: {
              data: function ($timeout) {
                  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
              }
          },
          untilResolved: {
              templateUrl: 'Templates/loading.html'
          }
      })

    .segment('my-alerts', {
          templateUrl: 'Templates/my-alerts.html',
          resolve: {
              data: function ($timeout) {
                  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
              }
          },
          untilResolved: {
              templateUrl: 'Templates/loading.html'
          }
      })

    .segment('my-actions', {
          templateUrl: 'Templates/my-actions.html',
          resolve: {
              data: function ($timeout) {
                  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
              }
          },
          untilResolved: {
              templateUrl: 'Templates/loading.html'
          }
      })

    .segment('my-support', {
          templateUrl: 'Templates/my-support.html',
          resolve: {
              data: function ($timeout) {
                  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
              }
          },
          untilResolved: {
              templateUrl: 'Templates/loading.html'
          }
      })

    .segment('my-approval', {
            templateUrl: 'Templates/approval.html',
            resolve: {
                data: function ($timeout) {
                    return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
                }
            },
            untilResolved: {
                templateUrl: 'Templates/loading.html'
            }
        })

    // if none of the above states are matched, use this as the fallback

    if (OneViewLocalStorage.Get("StartPage") == "Login") {
        $routeProvider.otherwise({ redirectTo: '/login' });
    }
    else {
        $routeProvider.otherwise({ redirectTo: '/auth' });
    }

});
