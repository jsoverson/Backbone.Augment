/*globals Backbone*/


describe("augment", function() {
  'use strict';

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
});
