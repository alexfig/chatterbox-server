var RoomsView = Backbone.View.extend({
  tagName: 'ul',

  className: 'side-nav fixed room-list',

  template: _.template('
    <li class="room-logo"><a class="">Rooms</a></li> \
    <div class="create-room"> \
      <a class="waves-effect waves-teal btn modal-trigger create-room" href="#modal2">Create Room</a> \
    </div> \
    <div id="modal2" class="modal room-modal"> \
      <div class="modal-content"> \
        <h4>Room Name</h4> \
        <input id="room-name" class="" type="text" placeholder="Room name" > \
      </div> \
      <div class="modal-footer"> \
        <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Create</a> \
      </div> \
    </div>'
  ),

  events: {
    'click .create-room'
  }

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
    this.$el.children.detach();
  }

});