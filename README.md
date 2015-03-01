# Une super timeline -- School project

A simple timeline, just for you.

## Installation

Just add `timeline.min.js` at the end of html, and the css `dist/timeline.css` in head of your document.

## Usage

Create timeline :

```javascript
var element = document.getElementById('mydiv');
var timeline_duration = 10000; // in milliseconds
var timeline = new Timeline(element, duration);
```

Add line to timeline :

```javascript
var line1 = timeline.addLine('line_one', { "color": "red" }); // Color will be apply to events
var line2 = timeline.addLine('line_two', { "color": "green" }); // You can use hex color
```

Add event to a line :

```javascript
var event = line1.addEvent('Cool', {
  "start": 2000,
  "end": 8000
});
```

Move cursor :

```javascript
timeline.goTo(5000);
```

Detect when cursor is on event :

```javascript
event.onActive(function(event){
  console.log(event);
});
```
