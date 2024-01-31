

var leds = [];

window.onload = function() { 
  let a = document.getElementById("hexgrid");
  let svgDoc = a.contentDocument.getElementById("layout");
  let svg = SVG(svgDoc);
  svg.each(function(i, children) {
    if ( this.data('mapped') === undefined ){
    } else {
        leds[this.data('mapped')] = this;
    }
  },true);
}

let listener = setInterval(() => {
    parent.postMessage({ app: 'wokwi', command: 'listen', version: 1 }, 'https://wokwi.com');
}, 200);

window.addEventListener('message', ({ data }) => {
    if (data.neopixels) {
      const { neopixels } = data;
      for (let i = 0; i < neopixels.length; i++) {
        const value = neopixels[i];
        const b = value & 0xff;
        const r = (value >> 8) & 0xff;
        const g = (value >> 16) & 0xff;
        if (leds[i]) {
          leds[i].css({ fill: `rgb(${r}, ${g}, ${b})` })
        }
      }
      if (listener != null) {
        clearInterval(listener);
        listener = null;
      }
    }
});
