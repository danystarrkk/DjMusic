document.addEventListener('DOMContentLoaded', () => {
  navegacionFija();
  reslatarEnlace();
  crearGaleria();
  scrollNav();
});

// Barra fija

function navegacionFija() {
  const header = document.querySelector('.header');
  const sobreFestival = document.querySelector('.sobre-festival');

  window.addEventListener('scroll', () => {
    if (sobreFestival.getBoundingClientRect().bottom < 50) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }

  })

}

// Enlace resaltado

function reslatarEnlace() {
  document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLink = document.querySelectorAll('.navegacion-principal a');
    let actual = '';

    sections.forEach(section => {

      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
        actual = section.id;
      }
    })

    navLink.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + actual) {
        link.classList.add('active');
      }
    })

  })
}

// Creacion de Galeria

function crearGaleria() {
  const galeria = document.querySelector('.galeria-imagenes');

  const img_cant = 16;

  for (let i = 1; i <= img_cant; i++) {
    const imagen = document.createElement('PICTURE');

    imagen.innerHTML = `
    <source srcset="dist/img/gallery/thumb/${i}.avif" type="image/avif">
    <source srcset="dist/img/gallery/thumb/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="dist/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
`;

    // Even Handler

    imagen.onclick = () => {
      mostrarImagen(i);
    };

    galeria.appendChild(imagen);
  }
}

function mostrarImagen(i) {

  const imagen = document.createElement('PICTURE');

  imagen.innerHTML = `
  <source srcset="dist/img/gallery/full/${i}.avif" type="image/avif">
  <source srcset="dist/img/gallery/full/${i}.webp" type="image/webp">
  <img loading="lazy" width="200" height="300" src="dist/img/gallery/full/${i}.jpg" alt="imagen galeria">
`;

  // Generar Modal
  const modal = document.createElement('DIV');

  modal.classList.add('modal');
  modal.onclick = cerrarModal;

  //Botón cerrar modal
  const cerrarModalBtn = document.createElement('BTN');
  cerrarModalBtn.textContent = "X"
  cerrarModalBtn.classList.add("btn-cerrar");
  cerrarModalBtn.onclick = cerrarModal;

  // Agregndo la imagen al modal
  modal.appendChild(imagen);
  modal.appendChild(cerrarModalBtn);

  // Agregar al html
  const body = document.querySelector('body');
  body.classList.add('overflow-hidden')
  body.appendChild(modal);

}

function cerrarModal() {

  // Eliminar modal
  const modal = document.querySelector('.modal');
  const body = document.querySelector('body');


  modal.classList.add('fade-out');

  setTimeout(() => {
    modal?.remove();
    body.classList.remove('overflow-hidden')

  }, 455);
}

// Scroll

function scrollNav() {
  const navLinks = document.querySelectorAll('.navegacion-principal a');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const sectionScroll = e.target.getAttribute('href');
      const section = document.querySelector(sectionScroll);


      section.scrollIntoView({ behavior: 'smooth' });

    })
  })
}