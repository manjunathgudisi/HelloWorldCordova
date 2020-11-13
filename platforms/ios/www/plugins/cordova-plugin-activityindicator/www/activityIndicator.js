cordova.define("cordova-plugin-activityindicator.ActivityIndicator", function(require, exports, module) {
var exec = require('cordova/exec');
var ActivityIndicator = {
    show: function (text) {
    	text = text || "Please wait...";
        exec(null, null, "ActivityIndicator", "show", [text]);
    },
    hide: function () {
        exec(null, null, "ActivityIndicator", "hide", []);
    }
};

module.exports = ActivityIndicator;
});
