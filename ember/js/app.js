//this line of code is what makes Ember run
App = Ember.Application.create();

//this is where the routes are held
App.Router.map(function() {
  this.route("turquoise");
  this.route("malachite");
  this.route("labradorite");
  this.route("rainbowMoonstone");
});
