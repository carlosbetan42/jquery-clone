// import $ from 'https://cdn.skypack.dev/jquery';

const $ = (arg) => {
  if (typeof arg === 'function') {
    document.addEventListener('DOMContentLoaded', arg);
    return;
  }

  //Selector de CSS
  let elements;
  if (typeof arg === 'string') {
    elements = document.querySelectorAll(arg);
  }

  // Elemento HTML suelto
  if (arg instanceof HTMLElement) {
    elements = [arg];
  }

  elements.css = (...args) => {
    const [property, value] = args;
    const isString = typeof property === 'string';

    elements.forEach((el) => {
      if (isString) {
        el.style[property] = value;
      } else {
        const entriesCSS = Object.entries(property);
        entriesCSS.forEach(([property, value]) => {
          el.style[property] = value;
        });
      }
    });
    return elements;
  }

  elements.on = (event, callback) => {
    elements.forEach((el) => {
      el.addEventListener(event, callback);
    });
    return elements;
  };

  elements.each = (fn) => {
    elements.forEach((el, index) => fn(index, el));
    return elements;
  }

  elements.fadeIn = (duration = 1000) => {
    elements.forEach((el) => {
      const animation = el.animate([
        { opacity: 0 },
        { opacity: 1 }
      ], { duration });
      animation.onfinish = () => el.style.opacity = 1;
    });

    return elements;
  }

  return elements;
};

$(() => { // DOMContentLoaded
  console.log('DOMContentLoaded');
  $('button')
    .css('background', '#09f')
    .css('border', '1px solid #fff')
    .css({
      padding: '16px',
      borderRadius: '4px'
    })
    .on('click', () => {
      $('#mensaje').fadeIn();
    });

  $('li').each((index, el) => {
    if (index === 0) $(el).css('color', '#09f');
    if (index === 1) $(el).css('color', 'red');
    if (index === 2) $(el).css('color', 'green');
  });
});