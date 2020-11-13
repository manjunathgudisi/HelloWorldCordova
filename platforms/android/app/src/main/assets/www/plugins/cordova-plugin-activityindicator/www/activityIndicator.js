cordova.define("cordova-plugin-activityindicator.ActivityIndicator", function(require, exports, module) {
var ActivityIndicator = {
    show: function (text) {
    	text = text || "Please wait...";
        cordova.exec(null, null, "ActivityIndicator", "show", [text]);
    },
    hide: function () {
        cordova.exec(null, null, "ActivityIndicator", "hide", []);
    }
};

module.exports = ActivityIndicator;
});
