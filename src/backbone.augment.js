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

  // Mix Into
  // --------
  //
  // Mix a function from one object in to another, while preserving
  // the context of the original object when executing the function
  // on the target.

  augment.mixInto = function(target, source, methodNames){
    // ignore the actual args list and build from arguments so we can
    // be sure to get all of the method names
    var args = Array.prototype.slice.apply(arguments);
    target = args.shift();
    source = args.shift();
    methodNames = args;

    var method;
    var length = methodNames.length;
    for(var i = 0; i < length; i++){
      method = methodNames[i];
      
      // bind the function from the source and assign the
      // bound function to the target
      target[method] = _.bind(source[method], source);
    }
  };

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
