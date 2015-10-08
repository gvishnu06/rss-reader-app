angular.module('starter.services', [])
    .factory('News', function($http) {
        return {
            get: function(callback) {

                var url = "https://desolate-wildwood-5822.herokuapp.com/news";

                $http.get(url).then(function(resp) {
                    //console.log(JSON.stringify(resp));
                    if (resp.status == 200) {
                        callback(null, resp);
                        console.log('callback executed');
                    } else
                        callback('Response not 200 ' + resp.status);
                }, function(err) {
                    console.log(err);
                    callback('Something Went Wrong ' + err.status);

                });



            }
        }

    })
    .factory('Search', function($http) {
        return {
            get: function(data,callback) {

                var url = "https://desolate-wildwood-5822.herokuapp.com/search";
                var config = {
                    headers: {
                        'Accept': 'application/json'
                    },
                    params: {
                        searchUrl: data
                    },
                    timeout: 15000 //check later
                };

                $http.get(url,config).then(function(resp) {
                    //console.log(JSON.stringify(resp));
                    if (resp.status == 200) {
                        callback(null, resp);
                        console.log('callback executed');
                    } else
                        callback('Response not 200 ' + resp.status);
                }, function(err) {
                    console.log(err);
                    callback('Something Went Wrong ' + err.status);

                });



            }
        }
    })

.factory('Feed', function() {
    var feed;
    return {
        get: function() {
            return feed;
        },
        set: function(_feed) {
            feed = _feed;
            console.log('feed from service: ' + feed);
        }


    }

});
