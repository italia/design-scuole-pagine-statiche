# Breakpoints


## What is this?

Breakpoints is a light weight jQuery library to detect and manage breakpoint changes. Breakpoint was originally written to optimize large single page sites with too many binds on `resize` causing performance issues. While still achieving the previous goal it has also been re-written to assist with general breakpoint management.

[Demo](http://jerrylow.com/jquery-breakpoints/)


## How to use

Include breakpoints library after jQuery, then initialize globally or on any page you want to use breakpoints.

```js
$(document).ready(function() {
  $(window).breakpoints();
});
```

Bind to window's event `breakpoint-change` and listen for breakpoint changes or bind to one of the compare triggers to react to specific breakpoints.


## Package Managers

### Bower

```
bower install jquery-breakpoints
```

### NPM

```
npm install jquery-breakpoints
```


## Examples

### Listening for Breakpoint Changes

Breakpoints will trigger `breakpoint-change` when the viewport enters a new breakpoint. The returned event will include `from` and `to` on event indicating the previous and new breakpoint.

```js
// Basic Bind
$(window).bind("breakpoint-change", function(event) {
  console.log(event.from, event.to);
});

// Example Usage
$(window).bind("breakpoint-change", function(event) {
  if (event.to === "md") {
    ...
  }
});
```

### Listening for Specific Breakpoints Then Execute

Breakpoints will trigger compare triggers followed by the breakpoint name. All of the [comparing methods](#comparing-methods) have a trigger with the _exception_ of `lessThanEqual` which conflicts with `greaterThanEqual`. Compare triggers will send on initializing.

```js
$(window).on('lessThan-md', function() {
  // Do something when viewport is less than 992px
});

$(window).on('greaterEqualTo-md', function() {
  // Do something when viewport is greater or equal to 992px
});

$(window).on('inside-md', function() {
  // Do something when viewport is greater or equal to 992px BUT less than 1200px
});
```

### Customize Breakpoints

Set breakpoints based on website/application needs. Note the naming will change the the compare triggers.

```js

$(window).breakpoints({
  breakpoints: [{
    "name": "phone",
    "width": 0
  }, {
    "name": "phone-large",
    "width": 420
  }, {
    "name": "tablet",
    "width": 768
  }, {
    "name": "desktop",
    "width": 1024
  }, {
    "name": "desktop-large",
    "width": 1340
  }]
});

// Compare Trigger
$(window).on('greaterEqualTo-desktop', function() {
  // Do something when viewport is greater or equal to 1024px
});
```

### Use Namespacing

Using namespaces will allow unbinding of specific `breakpoint-change` if necessary.

```js
$(window).bind("breakpoint-change.megamenu", function(event) {
  // Will get unbound
});

$(window).bind("breakpoint-change.footer", function(event) {
  // Won"t get unbound
});

$(window).unbind("breakpoint-change.megamenu");
```

### Comparing Specific Breakpoints

Checking against the current breakpoint and if it matches the criteria execute the callback function. This method is **not** constantly listening for changes, it's a one time check. For constant check see _Constant Check Example_ below or use [comparing triggers](#listening-for-specific-breakpoints-then-execute). See [comparing methods](#comparing-methods) for all available options.

```js
// Basic Example
$(window).breakpoints("lessThan", "md", function() {
  // If viewport is less than 992px do something here.
});

// Constant Check Example
$(window).bind("breakpoint-change", function(event) {
  $(window).breakpoints("lessThan", "md", function() {
    ...
  });
});

// Practical Usage Example
$("button").click(function() {
  $(window).breakpoints("lessThan", "sm", function() {
    // Use a modal
  });

  $(window).breakpoints("greaterEqualTo", "md", function() {
    // Do something else
  });
});
```


## Options

### breakpoints

`array` `default:`
```json
[
  {
    "name": "xs",
    "width": 0
  }, {
    "name": "sm",
    "width": 768
  }, {
    "name": "md",
    "width": 992
  }, {
    "name": "lg",
    "width": 1200
  }
]
```

These are the breakpoints to monitor. The default set is aligned with Bootstraps grid system. The width pertains to the lower limit. For example `992px` represents the beginning of `md` until it gets to `1200px`.

### buffer

`integer` `default: 300`

A buffer is set before breakpoints trigger `breakpoint-change`. The buffer keeps resizing more performant by not triggering actions prematurely.

### triggerOnInit

`boolean` `default: false`

On initializing Breakpoints after the buffer trigger a `breakpoint-change` so all bindings necessary could happen. This will return the same event object as regular breakpoint change with `event.initalInit`.

### outerWidth

`boolean` `default: false`

Use `$(window).outerWidth()` over the default `$(window).width()` for window width calculations.


## Methods

### getBreakPoint

Return the current breakpoint name.

```js
$(window).breakpoints("getBreakpoint");
```

### getBreakpointWidth

Return the current breakpoint width given the break point name.

```js
$(window).breakpoints("getBreakpointWidth", [breakpoint name]);
```

### destroy

This will stop ALL breakpoints from listening for changes. To remove a single breakpoint bind see [Use namespacing](#use-namespacing).

```js
$(window).breakpoints("destroy");
```


## Comparing Methods

### lessThan

Returns true if the current viewport is less than the breakpoint.

```js
$(window).breakpoints("lessThan", [breakpoint name], [callback]);
```

### lessEqualTo

Returns `true` if the current viewport is less but also equal to the breakpoint value.

```js
$(window).breakpoints("lessEqualTo", [breakpoint name], [callback]);
```

### greaterThan

Returns `true` if the current viewport is greater than the breakpoint.

```js
$(window).breakpoints("greaterThan", [breakpoint name], [callback]);
```

### greaterEqualTo

Returns `true` if the current viewport is greater but also equal to the breakpoint.

```js
$(window).breakpoints("greaterEqualTo", [breakpoint name], [callback]);
```

### inside

Returns `true` if the current viewport is within the breakpoint and its lower limits. Eg. with the default breakpoints -- If the current viewport width is `900px` this would be `true` for `sm`. This will return `true` for the last (largest) breakpoint while the viewport width is greater than its value.

```js
$(window).breakpoints("inside", [breakpoint name], [callback]);
```


## Minimum Requirements

Breakpoints requires jQuery `v1.7` and up.
