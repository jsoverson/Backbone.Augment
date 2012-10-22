/*globals Backbone*/


describe("augment", function() {
  'use strict';

  it("should be available as Backbone.Augment", function(){
    expect(typeof Backbone.Augment).toEqual("function");
  });

  it("should exist on all core backbone objects", function() {
    expect(typeof Backbone.Model.augment).toEqual('function');
    expect(typeof Backbone.Collection.augment).toEqual('function');
    expect(typeof Backbone.View.augment).toEqual('function');
  });

  it("should exist on extended objects", function() {
    var NewView = Backbone.View.extend({});
    expect(typeof NewView.augment).toEqual('function');
  });

  it("should call augments' augment() when augmenter augments.", function() {
    var augment = {
      augment : jasmine.createSpy('augment()')
    };
    var NewView = Backbone.View.extend({});
    NewView.augment(augment);
    expect(augment.augment).toHaveBeenCalled();
  });

  it("should return the augmented object from augment()", function() {
    var augmentSpy = jasmine.createSpy('function from augment');
    var augment = {
      augment : function(Orig) {
        return Orig.extend({
          foo : augmentSpy
        });
      }
    };
    var NewView = Backbone.View.augment(augment).extend({});
    var newViewInstance = new NewView();
    newViewInstance.foo();
    expect(augmentSpy).toHaveBeenCalled();
  });

  describe("when using an object that does not provide an augment function", function(){
    var aug = {};

    function run(){
      Backbone.View.augment(aug);
    }

    it("should throw an error", function(){
      expect(run).toThrow("Augmenting object does not provie an `augment` function.");
    });
  });

  describe("when specifying an undefined or null object as an augmenter", function(){
    function run(){
      Backbone.View.augment(undefined);
    }

    it("should throw an error", function(){
      expect(run).toThrow("Specified augmenting object is null or undefined");
    });
  });

});
