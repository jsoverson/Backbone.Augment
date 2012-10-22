(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['backbone'], factory);
  } else {
    // Browser globals
    factory(root.Backbone);
  }
}(this, function (Backbone) {
  "use strict";

  // Augment
  // -------
  //
  // Augment an object with additional functionality, allowing
  // object composition instead of just inheritance or simple
  // extend functions
  function augment(/* augments... */) {
    var self = this;
    for (var i = 0; i < arguments.length; i++) {
      var aug = arguments[i];

      if (!aug){
        throw new Error("Specified augmenting object is null or undefined");
      }

      if (!aug.augment){
        var error = Error("Augmenting object does not provie an `augment` function.");
        error.augmentObject = aug;
        throw error;
      }

      self = aug.augment(self);
    }
    return self;
  }

  // Export The API
  // --------------
 
  Backbone.Augment = augment;

  Backbone.Model.augment = _.bind(augment, Backbone.Model);
  Backbone.Model.prototype.augment = augment;

  Backbone.Collection.augment = _.bind(augment, Backbone.Collection);
  Backbone.Collection.prototype.augment = augment;

  Backbone.View.augment = _.bind(augment, Backbone.View);
  Backbone.View.prototype.augment = augment;

  Backbone.Router.augment = _.bind(augment, Backbone.Router);
  Backbone.Router.prototype.augment = augment;

  return augment;
}));
