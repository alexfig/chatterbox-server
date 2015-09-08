var UserView = Backbone.View.extend({
  className: 'row user-row',

  template: _.template('
    <div class="row user-row"> \
      <i class="material-icons prefix col s1 medium account-circle">perm_identity</i> \
      <span class="username col s10"><a class="modal-trigger current-user" href="#modal1"><%- username %></a></span> \
    </div> \
    <div id="modal1" class="modal user-modal"> \
      <div class="modal-content"> \
        <h4>Change username</h4> \
        <input id="user" class="" type="text" placeholder="Username" > \
      </div> \
      <div class="modal-footer"> \
        <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Accept</a> \
      </div> \
    </div>'
  ),

  initialize: function() {
    this.render();
    this.$('.modal-trigger.current-user').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        ready: function() {
        }
        , // Callback for Modal open
        complete: changeUser // Callback for Modal close
      }
    );
  },

  render: function() {
    this.$el.html(this.template({username: this.collection.username}));
  },

  changeUser: function() {
    var username = this.$('.current-user').text();
    this.collection.username = username;
    this.$('.current-user').text(username);
  }
});