const pixels = Array.from(document.querySelectorAll('polygon'));
pixels.shift();

const 
  svg = document.getElementById('led-star'),
  NS = svg.getAttribute('xlmns');

//const circle = document.createElementNS(NS, 'circle');
//circle.setAttribute('cx', parseFloat(pixels[0].getAttributeNS(null,'x'))+parseFloat(pixels[0].getAttributeNS(null,'width'))/2);
//circle.setAttribute('cy', parseFloat(pixels[0].getAttributeNS(null,'y'))+parseFloat(pixels[0].getAttributeNS(null,'height'))/2);
//circle.setAttribute('r', 4);
//svg.appendChild(circle);

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

// window.addEventListener("load", (event) => {
//   for (let i = 0; i < 180; i++) {
//         if (pixels[i]) {
//           pixels[i].setAttribute('fill', 'rgb(255,0,0)');
//         }
//       }
// });
