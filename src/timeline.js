(function(){

  "use strict";

  // Constructor
  //
  // @param element [DOMObject] The timeline container
  // @param duration [Integer] The timeline duration in miliseconds
  // @param opts [Object] Options. Actually nothing. Not requiered.
  var Timeline = function(element, duration, opts){

    if(opts === undefined){
      opts = {};
    }

    this.duration  = duration;
    this.opts      = opts;
    this.element   = element;
    this.lines     = {};
    this.state     = null;
    this.timestamp = 0;
    this.interval  = null;

    this.createCursor();
  }

  // Add line to the timeline
  //
  // @param opts [Object] Options
  Timeline.prototype.addLine = function(name, opts){

    var self = this;

    // If opts is undefined, then opts is empty object
    if(opts === undefined){
      opts = {};
    }

    opts['events'] = {};

    var l = this.lines[name] = opts;

    // Add line to HTML
    this.appendLine(l);

    // Add addEvent function to line
    l.addEvent = function(name, opts){
      // Create callback methods on events

      opts.onActive = function(callback){
        setInterval(function(){
          if(self.timestamp >= opts['start'] && self.timestamp <= opts['end']){
            callback(l.events[name]);
          }
        }, 5);
      }

      l.events[name] = opts;
      self.appendEvent(l, name, opts);
      return l.events[name];
    }

    return l;
  }

  // Return line from line name
  //
  // @param name [String] the line name
  Timeline.getLine = function(name){
    return this.lines[name];
  }

  // Set timeline timestamp to the given time
  //
  // @param timestamp [Integer] the timestamp
  //
  // @return [Integer] the timestamp
  Timeline.prototype.goTo = function(timestamp){
    var percent = timestamp * 100 / this.duration;
    this.setCursorTo(percent);
    this.timestamp = timestamp;
    return this.timestamp;
  }

  // --------------------------------------------------------------------------------
  // Private ------------------------------------------------------------------------
  // --------------------------------------------------------------------------------

  // Move the cursor html element to given percent
  //
  // @param [Integer] the percent
  //
  // @return [Integer] the percent
  Timeline.prototype.setCursorTo = function(percent){

    var cu   = this.timestamp * 100 / this.duration;
    var ce   = this.getCursorElement();
    var diff = Math.abs(percent - cu);

    if(diff >= 0.5){
      ce.classList.add('animate');
    }

    var px = percent * this.element.clientWidth / 100;
    ce.style['margin-left'] = px + 'px';

    setTimeout(function(){
      ce.classList.remove('animate');
    }, 100);

    return percent;
  }

  // Append event HTML to line
  //
  // @param line [Object]
  // @param event_name [String]
  // @param event_opts [Object]
  //
  // @return [DOMObject] the event html object
  Timeline.prototype.appendEvent = function(line, event_name, event_opts){

    var event_element       = document.createElement('div');
    var title_element       = document.createElement('span');

    title_element.innerHTML = event_name;

    title_element.setAttribute('title', event_name);
    event_element.classList.add('event');
    event_element.appendChild(title_element);

    var bgcolor = 'red';
    if(line['color']){
      bgcolor = line['color'];
    }

    // On calcul la largeur de lelement selon la durée et le largeur de la timeline
    var element_width = ((event_opts['end'] - event_opts['start']) * 100 / this.duration) * this.element.clientWidth / 100;
    var element_margin_left = ((event_opts['start'] * 100 / this.duration) * this.element.clientWidth / 100);

    event_element.style['margin-left']      = element_margin_left + 'px';
    event_element.style.width               = element_width + 'px';
    event_element.style['background-color'] = bgcolor;


    line.element.appendChild(event_element);

    return event_element;
  }

  // Append line HTML in element
  //
  // @param line [Object]
  //
  // @return [DOMObject] the line html object
  Timeline.prototype.appendLine = function(line){

    // create html struct
    var line_element = document.createElement('div');

    line_element.classList.add('line');
    this.element.appendChild(line_element);

    var cursor_element          = this.getCursorElement();
    cursor_element.style.height = this.element.clientHeight + 'px';

    line.element = line_element;

    return line_element;
  }

  // Create html cursor element
  //
  // @return [DOMObject] the cursor html element
  Timeline.prototype.createCursor = function(){
    var cursor_element = document.createElement('div');
    cursor_element.classList.add('cursor');
    this.element.appendChild(cursor_element);
    return cursor_element;
  }

  // Get cursor element
  //
  // @return [DOMObject] the cursor dom element
  Timeline.prototype.getCursorElement = function(){
    return this.element.querySelector('.cursor');
  }

  window.Timeline = Timeline;

}).call(this);
