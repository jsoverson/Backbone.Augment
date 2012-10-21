Backbone.Augment
============================

[![Build Status](https://secure.travis-ci.org/jsoverson/Backbone.Augment.png)](http://travis-ci.org/jsoverson/Backbone.Augment)

Simple extension to add addon-like functionality to Backbone objects (Views, Models, Collections)

## Why?

The best plugin architectures offer maximum flexibility around a simple, organized specification.
Augment offers unrestrained functionality around a simple plugin and implementation signature.

Backbone itself includes `extend` and the developers seem unwilling to allow intuitive access up the
inheritance chain. This is entirely up to them but that is still valid usage. Augment allows that and more.

The benefit of augments is that their design keeps the augmented view in its scope allowing you to
write extensible, chainable, reusable augments without knowing who is implementing.

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

The problem is requiring your extensions to know what they are extending. There have been numerous pull
requests for backbone attempting to solve this in easier, more intuitive ways, but the developers
are reluctant to expose this functionality.

## How?

### Normal backbone extend

```
var NewView = Backbone.View.extend({ /* new stuff */});
```

### Using augment

```
var NewView = Backbone.View.augment(augment1, augment2, etc);
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
        Implementing.prototype.render.apply(this,arguments);
      }
    });
  }
}
```

## Not just an inverted `extend()`

An augment's sole requirement is that it includes an `augment()` method. This allows you free reign to do
whatever you might want. The original use case was to provide additional `extend()` functionality but
that is up to you.

## License

All code licensed under the MIT license.

## Author
 
Written by Jarrod Overson
