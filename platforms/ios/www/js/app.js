var OneViewRouteSegmentProvider = null;
 
 //var Oneview = angular.module('Oneview', ['ngRoute', 'ngAnimate', 'route-segment', 'view-segment', 'snap', 'vs-repeat', 'monospaced.elastic', 'ngDropdowns', 'angularbox']);
  MyApp.run(function($rootScope, $templateCache) {
	FastClick.attach(document.body);
	  $rootScope.$on('$viewContentLoaded', function() {
		//$templateCache.removeAll();
	   // alert("asd");
	 });
	
  });
  // configure our routes
  MyApp.config(function ($routeSegmentProvider, $routeProvider, snapRemoteProvider) {
  
  OneViewRouteSegmentProvider = $routeSegmentProvider;

  snapRemoteProvider.globalOptions = {
	touchToDrag:false,
	hyperextensible:false
	// ... others options
  }
  $routeSegmentProvider.options.autoLoadTemplates = true;
  
  $routeSegmentProvider

  .when('/auth',          'auth')
  .when('/login',    'login')
  .when('/nav', 'nav')
  .when('/dashboard', 'nav.dashboard')
  .when('/nav/downloads', 'nav.downloads')
  .when('/nav/actionfollowupdownloads', 'nav.actionfollowupdownloads')
  .when('/nav/settings', 'nav.settings')
  .when('/nav/my-audit', 'nav.my-audit')
  .when('/nav/my-actions-default', 'nav.my-actions-default')
  .when('/nav/my-actions', 'nav.my-actions')
  .when('/nav/my-action-followup', 'nav.my-action-followup')
  .when('/nav/my-action-followup-details', 'nav.my-action-followup-details')
  .when('/nav/my-alerts', 'nav.my-alerts')
  .when('/nav/my-support', 'nav.my-support')
  .when('/my-approval', 'nav.my-approval')
  .when('/notifycall', 'nav.notifycall')
  .when('/logoutcall', 'nav.logoutcall')
  .when('/nav/my-portal', 'nav.my-portal')
  .when('/APKUpgrade', 'APKUpgrade')
  .when('/DcPreview', 'nav.DcPreview')
  .when('/nav/PeriodicLandingPage', 'nav.periodiclandingpage')
  .when('/nav/my-TesocDCPeriodic', 'nav.my-TesocDCPeriodic')
  .when('/Tesco17LandingPage', 'nav.Tesco17LandingPage')
  .when('/Express', 'nav.Express')
  .when('/PlatformPeriodicsLandingPage', 'nav.PlatformPeriodicsLandingPage')
   .when('/PlatformPeriodics', 'nav.PlatformPeriodics')
  .when('/MitmarkLandingPage', 'nav.MitmarkLandingPage')
   .when('/MitmarkTaskPage', 'nav.MitmarkTaskPage')
  .when('/ActionFollowUpApprovalDownload', 'nav.ActionFollowUpApprovalDownload')
  .when('/ActionFollowupApprovalPlaceSelection', 'nav.ActionFollowupApprovalPlaceSelection')
  .when('/ActionFollowUpApprovalSelection', 'nav.ActionFollowUpApprovalSelection')
  .when('/ActionFollowUpApproval', 'nav.ActionFollowUpApproval')
  .when('/ActionPreview', 'nav.ActionPreview')
  .when('/nav/RFLDieteticsOrder-Status', 'nav.RFLDieteticsOrder-Status')
  .when('/nav/RFLOrder-Packing', 'nav.RFLOrder-Packing')
  .when('/nav/RFLDietetics-Request', 'nav.RFLDietetics-Request')
  .when('/nav/RFLStanding-OrderView', 'nav.RFLStanding-OrderView')
  .when('/nav/RFLJob-Allocation', 'nav.RFLJob-Allocation')
  .when('/nav/RFLWard-Receiving', 'nav.RFLWard-Receiving')
  .when('/nav/RFLNew-Order', 'nav.RFLNew-Order')
  .when('/nav/RFLOrder-Status', 'nav.RFLOrder-Status')
  .when('/nav/PortalPageRoute', 'nav.PortalPageRoute')
  .when('/nav/PortalPageDisplay', 'nav.PortalPageDisplay')

  .segment('auth', {
	  templateUrl: 'Templates/authendication.html',
	  //controller: 'AuthenticationController'
  })

  .segment('login', {
	  templateUrl: 'Templates/login.html',
	  ////controller: 'LoginController'
  })
 .segment('APKUpgrade', {
	 templateUrl: 'Templates/APKUpgradeProcess.html',
	 // controller: 'NavController'
 })
	   
  .segment('nav', {
	  default: true,
	  templateUrl: 'Templates/nav.html',
	  controller: 'NavController'})

  $routeSegmentProvider.within().segment('dashboard', {
		  default: true,
		  templateUrl: 'Templates/dashboard.html',
		 // controller: 'DasboardController',
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
		  //controller: 'ProfileDownloadController',
		  resolve: {
			  data: function ($timeout) {
				  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			  }
		  },
		  untilResolved: {
			  templateUrl: 'Templates/loading.html'
		  }
  })

	  .segment('periodiclandingpage', {
		  templateUrl: 'Templates/Tesco/PeriodicLandingPage.html',
		  resolve: {
			  data: function ($timeout) {
				  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			  }
		  },
		  untilResolved: {
			  templateUrl: 'Templates/loading.html'
		  }
	  })

	  .segment('DcPreview', {
		  templateUrl: 'Templates/DcPreview.html',
		  resolve: {
			  data: function ($timeout) {
				  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			  }
		  },
		  untilResolved: {
			  templateUrl: 'Templates/loading.html'
		  }
	  })

		.segment('my-TesocDCPeriodic', {
			//templateUrl: 'Templates/my-audit.html',
			templateUrl: 'Templates/Tesco/DcPeriodics.html',
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

  .segment('settings', {
	  templateUrl: 'Templates/settings.html',
	  //controller: 'SettingsCtrl',
	  resolve: {
		  data: function ($timeout) {
			  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
		  }
	  },
	  untilResolved: {
		  templateUrl: 'Templates/loading.html'
	  }
  })

	  .segment('my-portal', {
		  //templateUrl: 'Templates/my-audit.html',
		  templateUrl: 'Templates/my-portal.html',
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

  .segment('my-audit', {
	  //templateUrl: 'Templates/my-audit.html',
	  templateUrl: 'Templates/my-audit-new.html',
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

  .segment('my-actions', {
	  //templateUrl: 'Templates/my-audit.html',
	  templateUrl: 'Templates/my-actions.html',
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

  .segment('my-actions-default', {
	  templateUrl: 'Templates/my-actions-default.html',
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
	  //templateUrl: 'Templates/my-audit.html',
	  templateUrl: 'Templates/my-support.html',
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

  .segment('my-approval', {
	  //templateUrl: 'Templates/my-audit.html',
	  templateUrl: 'Templates/approval.html',
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


	  .segment('notifycall', {
		  //templateUrl: 'Templates/my-audit.html',
		  templateUrl: 'Templates/Notification.html',
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
	 .segment('logoutcall', {
		 //templateUrl: 'Templates/my-audit.html',
		 templateUrl: 'Templates/Logout.html',
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
	   .segment('Tesco17LandingPage', {
		   templateUrl: 'Templates/Tesco_17/Tesco17_LandingPage.html',
		   resolve: {
			   data: function ($timeout) {
				   return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			   }
		   },
		   untilResolved: {
			   templateUrl: 'Templates/loading.html'
		   }
	   })
	   .segment('Express', {
		   templateUrl: 'Templates/Tesco_17/Express.html',
		   resolve: {
			   data: function ($timeout) {
				   return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			   }
		   },
		   untilResolved: {
			   templateUrl: 'Templates/loading.html'
		   }
	   })
		.segment('PlatformPeriodicsLandingPage', {
			templateUrl: 'Templates/PlatformPeriodicsLandingPage.html',
			resolve: {
				data: function ($timeout) {
					return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
				}
			},
			untilResolved: {
				templateUrl: 'Templates/loading.html'
			}
		})
	   .segment('PlatformPeriodics', {
		   templateUrl: 'Templates/PlatformPeriodics.html',
		   resolve: {
			   data: function ($timeout) {
				   return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			   }
		   },
		   untilResolved: {
			   templateUrl: 'Templates/loading.html'
		   }
	   })
	  .segment('MitmarkLandingPage', {
		  templateUrl: 'Templates/MitmarkLandingPage.html',
		  resolve: {
			  data: function ($timeout) {
				  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			  }
		  },
		  untilResolved: {
			  templateUrl: 'Templates/loading.html'
		  }
	  })
	  .segment('MitmarkTaskPage', {
		  templateUrl: 'Templates/MitmarkTaskPage.html',
		  resolve: {
			  data: function ($timeout) {
				  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			  }
		  },
		  untilResolved: {
			  templateUrl: 'Templates/loading.html'
		  }
	  })

	  .segment('ActionFollowUpApprovalDownload', {
		  templateUrl: 'Templates/ActionFollowupApproval/ActionFollowUpApprovalDownloadPage.html',
		  resolve: {
			  data: function ($timeout) {
				  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			  }
		  },
		  untilResolved: {
			  templateUrl: 'Templates/loading.html'
		  }
	  })

	  .segment('ActionFollowupApprovalPlaceSelection', {
		  templateUrl: 'Templates/ActionFollowupApproval/ActionFollowupApprovalPlaceSelectionPage.html',
		  resolve: {
			  data: function ($timeout) {
				  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			  }
		  },
		  untilResolved: {
			  templateUrl: 'Templates/loading.html'
		  }
	  })

	  .segment('ActionFollowUpApprovalSelection', {
		  templateUrl: 'Templates/ActionFollowupApproval/ActionFollowUpApprovalSelectionPage.html',
		  resolve: {
			  data: function ($timeout) {
				  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			  }
		  },
		  untilResolved: {
			  templateUrl: 'Templates/loading.html'
		  }
	  })

	  .segment('ActionFollowUpApproval', {
		  templateUrl: 'Templates/ActionFollowupApproval/ActionFollowUpApprovalPage.html',
		  resolve: {
			  data: function ($timeout) {
				  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			  }
		  },
		  untilResolved: {
			  templateUrl: 'Templates/loading.html'
		  }
	  })
	  .segment('ActionPreview', {
		templateUrl: 'Templates/ActionPreview.html',
		resolve: {
			data: function ($timeout) {
				return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			}
		},
		untilResolved: {
			templateUrl: 'Templates/loading.html'
		}
	  })
	   .segment('RFLDieteticsOrder-Status', {
		   templateUrl: 'Templates/RFLDieteticsOrder-Status.html',
		   resolve: {
			   data: function ($timeout) {
				   return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			   }
		   },
		   untilResolved: {
			   templateUrl: 'Templates/loading.html'
		   }
	   })

	  .segment('RFLOrder-Packing', {
		  templateUrl: 'Templates/RFLOrder-Packing.html',
		  resolve: {
			  data: function ($timeout) {
				  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			  }
		  },
		  untilResolved: {
			  templateUrl: 'Templates/loading.html'
		  }
	  })

	  .segment('RFLDietetics-Request', {
		  templateUrl: 'Templates/RFLDietetics-Request.html',
		  resolve: {
			  data: function ($timeout) {
				  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			  }
		  },
		  untilResolved: {
			  templateUrl: 'Templates/loading.html'
		  }
	  })

	  .segment('RFLStanding-OrderView', {
		  templateUrl: 'Templates/RFLStanding-OrderView.html',
		  resolve: {
			  data: function ($timeout) {
				  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			  }
		  },
		  untilResolved: {
			  templateUrl: 'Templates/loading.html'
		  }
	  })

	  .segment('RFLJob-Allocation', {
		  templateUrl: 'Templates/RFLJob-Allocation.html',
		  resolve: {
			  data: function ($timeout) {
				  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			  }
		  },
		  untilResolved: {
			  templateUrl: 'Templates/loading.html'
		  }
	  })
	  .segment('RFLWard-Receiving', {
		  templateUrl: 'Templates/RFLWard-Receiving.html',
		  resolve: {
			  data: function ($timeout) {
				  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			  }
		  },
		  untilResolved: {
			  templateUrl: 'Templates/loading.html'
		  }
	  })

		.segment('RFLNew-Order', {
			templateUrl: 'Templates/RFLNew-Order.html',
			resolve: {
				data: function ($timeout) {
					return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
				}
			},
			untilResolved: {
				templateUrl: 'Templates/loading.html'
			}
		})

	   .segment('RFLOrder-Status', {
		   templateUrl: 'Templates/RFLOrder-Status.html',
		   resolve: {
			   data: function ($timeout) {
				   return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			   }
		   },
		   untilResolved: {
			   templateUrl: 'Templates/loading.html'
		   }
	   })

	  .segment('PortalPageRoute', {
		  templateUrl: 'Templates/PortalPageRoute.html',
		  resolve: {
			  data: function ($timeout) {
				  return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
			  }
		  },
		  untilResolved: {
			  templateUrl: 'Templates/loading.html'
		  }
	  })

		.segment('PortalPageDisplay', {
			templateUrl: 'Templates/PortalPageDisplay.html',
			resolve: {
				data: function ($timeout) {
					return $timeout(function () { return 'SLOW DATA CONTENT'; }, 300);
				}
			},
			untilResolved: {
				templateUrl: 'Templates/loading.html'
			}
		})

  var _oOneViewRouterComponet = new OneViewRouterComponet();
  _oOneViewRouterComponet.ResetRouter();
	  
  // if none of the above states are matched, use this as the fallback
 
  if (OneViewLocalStorage.Get("StartPage") == "Login") {
	  $routeProvider.otherwise({ redirectTo: '/login' });
  }
  else {
	  $routeProvider.otherwise({ redirectTo: '/auth' });
  }
  
  });
	
