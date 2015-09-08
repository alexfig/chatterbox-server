(function() {

  var proxiedSync = Backbone.sync;

  Backbone.sync = function(method, model, options) {
    options || (options = {});

    if (!options.crossDomain) {
      options.crossDomain = true;
    }

    if (!options.xhrFields) {
      options.xhrFields = {withCredentials:true};
    }

    return proxiedSync(method, model, options);
  };
})();
$(document).ready(function() {
  $('select').material_select();

  var rooms = new Rooms();
  var messages = new Messages();
  var app = new AppView({el: $('body'), rooms: rooms, messages: messages});
});