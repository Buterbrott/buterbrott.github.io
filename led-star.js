const pixels = Array.from(document.querySelectorAll('rect'));
const 
  svg = document.getElementById('led-star'),
  NS = svg.getAttribute('xlmns');

const circle = document.createElementNS(NS, 'circle');
circle.setAttribute('cx', parseFloat(pixels[0].getAttributeNS(null,'x')));
circle.setAttribute('cy', parseFloat(pixels[0].getAttributeNS(null,'y')));
circle.setAttribute('r', 1);

svg.appendChild(circle);

// Workaround for a Wokwi sometimes missing the first message
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
        if (pixels[i]) {
          pixels[i].setAttribute('fill', `rgb(${r}, ${g}, ${b})`);
        }
      }
      if (listener != null) {
        clearInterval(listener);
        listener = null;
      }
    }
  });