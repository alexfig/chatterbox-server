var MessageView = Backbone.View.extend({
  className: 'row',
  template: _.template(
    '<div class="col face-col"> \
        <img class="user-image" src="./images/doge.jpeg"> \
      </div> \
      <div class="col message-col"> \
        <h5><%- username %></h5> \
        <p><%- text %></p> \
      <div class="divider"></div> \
      </div>'
    ),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});