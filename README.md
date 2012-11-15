Backbone.Augment
============================

[![Build Status](https://secure.travis-ci.org/jsoverson/Backbone.Augment.png)](http://travis-ci.org/jsoverson/Backbone.Augment)

Simple extension to add addon-like functionality to Backbone objects (Views, Models, Collections)

## Why?

The best plugin architectures offer maximum flexibility around a simple, organized specification.
Augment offers unrestrained functionality around a simple plugin and implementation signature.

Backbone itself includes `extend()` and the developers seem unwilling to allow intuitive access up the
inheritance chain. This is entirely up to them but many still consider that valid usage. Augment allows that and more.

The benefit of augments is that their design keeps the implementing object in its scope allowing you to
write extensible, chainable, and reusable augments without knowing what is being augmented.

Have you ever seen code in Backbone like :

```
var SomeView = Backbone.View.extend({
  someMethod : function(){}
});

var SomeChildView = SomeView.extend({
  someMethod : function(){
    SomeView.prototype.someMethod.apply(this, arguments);
  }
})
```

The problem shown is that your extensions need to know what they are extending. There have been numerous pull
requests for Backbone that attempt to solve this in easier, more intuitive ways but the developers
are reluctant to expose this functionality.

## How do you use augments with Backbone?

### Normal backbone extend

```
var NewView = Backbone.View.extend({ /* new stuff */});
```

### Using augment

The `augment` function is available on all of the basic Backbone types
that you would normal `extend`:

* Backbone.View
* Backbone.Model
* Backbone.Collection
* Backbone.Router

You can call the `augment` function from the type directly, or from the
`.prototype`, as needed.

```
var NewView = Backbone.View.augment(augment1, augment2, etc);

NewView.prototype.augment(augment3, augment4, etc);
```

### Augment with extend

```
var NewView = Backbone.View
                .augment(augment1, augment2, etc)
                .extend( /* normal extend */ );
```

Augments are called in order and convention dictates that they return the new backbone object.
This is convention and entirely up to the implementer

## What do augments look like?

Augments are simple objects that include, at a minimum, an `augment` method.

### An identity augment

This is an augment that doesn't do anything

```
var augment = {
  augment : function(OriginalObject) {
    return OriginalObject;
  }
}
```

A simple augment that calls its parent's render method

```
var augment = {
  augment : function(ImplementingView) {
    return ImplementingView.extend({
      render : function() {
        ImplementingView.prototype.render.apply(this,arguments);
      }
    });
  }
}
```

*"But wait, that looks like the example you were trying to avoid..."*

The important difference is that your implementing augmenter is passed in as an argument, meaning we don't
know where we're being used. This is an important abstraction point that encourages much more reusable code.

## mixInto

There are times when an augmenting object may not be able to be mixed
directly in to an object as a whole. For example, if the augmenting object
contains an `events` definition, it can't be mixed directly in to a
`Backbone.View` because it would override the view's events definition.

To work around this issue, while still providing the ability to agument
an object with new functionality, a `mixInto` function has been provided.

This function takes at least three arguments:

* target
* source
* method names

When calling a function that has been mixed into a target object, the
context of that function is set to the original mixin object.

```js
// define an augmenting object
aug = {

  augment: function(t){

    // use `mixInto` to agument the target with methods
    // from this object
    Backbone.Augment.mixInto(t, this, "foo");

  },

  foo: function(){
    console.log("I'm the foo function!", this)
  }
};

// create a new object type and augment it with the mixin
Target = Backbone.Model.extend({});
Target.prototype.augment(aug);

// create an instance of the object and run the function
// logs the message, and the `aug` function as the context
target = new Target();
target.foo(); // => "I'm the foo function!" #<object>
```

In this example, the `foo` function is mixed in to the target. When
the foo function is called, it's context is the original `aug` function
that defined the function.

## Not just an inverted `extend()`

An augment's sole requirement is that it includes an `augment()` method. This allows you free reign to do
whatever you might want. The original use case was to provide additional `extend()` functionality but
that is up to you.

## License

All code licensed under the MIT license.

## Author
 
Written by Jarrod Overson
