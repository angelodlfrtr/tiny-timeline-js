var element = document.querySelector('#timeline');
var test    = new Timeline(element, 10000, {});

var line1 = test.addLine('Gestes', { "color": "#1abc9c" });
var line2 = test.addLine('Macho', { "color": "#3498db" });
var line3 = test.addLine('OK', { "color": "#e74c3c" });

var event = line1.addEvent('Cool', {
  "start": 1000,
  "end": 3000,
  "title": "Un super titre"
});

event.onActive(function(e){
  document.querySelector('pre').innerHTML = "Je passe sur 'Cool'";
});

event = line2.addEvent('Oh my god !', {
  "start": 6000,
  "end": 10000,
  "title": "Kiki"
});

event.onActive(function(e){
  document.querySelector('pre').innerHTML = "Je passe sur 'Oh my god'";
});

event = line3.addEvent('Oh mon dieu !', {
  "start": 3000,
  "end": 6000,
  "title": "Kiki"
});

event.onActive(function(e){
  document.querySelector('pre').innerHTML = "Je passe sur 'Oh mon dieu'";
});

var start = 0;
var i = setInterval(function(){
  start += 5;
  test.goTo(start);

  if(start >= test.duration){
    clearInterval(i);
  }
});
