angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, News) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('FeedsCtrl', function($scope,$ionicLoading, News, Feed, Search) {
        $scope.show = function() {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: false
            });
        };
        $scope.hide = function() {
            $ionicLoading.hide();
        };

        var callback = function(err, res) {
            if (err) {
                alert('error: ' + err);
            } else {
                var news = res.data.news;
                $scope.news = news;
                console.log(news);
                $scope.hide();
            }
        }

        $scope.show();
        //fallback
        setTimeout(function(){
          $scope.hide();
        },4000);

        News.get(callback); //init

        $scope.loadFeed = function(feed) { //click of list
            Feed.set(feed);
        }

        $scope.search = function() {
            $scope.news = {};
            var text = document.getElementById('search').value;
            console.log(text);
            var _callback = function(err, res) {
                if (err) {
                    alert('error: ' + err);
                } else {
                    var news = res.data.news;
                    $scope.news = news;
                    console.log(news);
                }
            }


            Search.get(text, _callback);
        }

    })
    .directive('iframeSetDimentionsOnload', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('load', function() {
                    if (window.localStorage.getItem("iFrameHeight") === "present")
                        iFrameHeight = element[0].contentWindow.document.body.scrollHeight + 125 + 'px';
                    else
                        iFrameHeight = element[0].contentWindow.document.body.scrollHeight + 'px';
                    element.css('height', iFrameHeight);
                });
            }
        }
    }])
    .controller('FeedCtrl', function($scope, Feed) {
        $scope.feed = Feed.get();
    });
