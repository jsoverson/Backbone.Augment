describe("mix into", function(){

  describe("when mixing a function in to a Target object", function(){
    var Target, target, aug;

    beforeEach(function(){
      aug = {
        augment: function(t){
          Backbone.Augment.mixInto(t, this, "foo");
        },

        foo: jasmine.createSpy("foo function")
      };

      Target = Backbone.Model.extend({});
      Target.prototype.augment(aug);

      target = new Target();
      target.foo();
    });
   
    it("should attach that function to the Target", function(){
      expect(target.foo).not.toBeUndefined();
    }); 
    
    it("should bind that function call to the augmenting object", function(){
      var context = aug.foo.mostRecentCall.object;
      expect(context).toBe(aug);
    });
  });

});
