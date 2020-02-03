const getViewportHeightUnit = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const ease = (t, b, c, d) => {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
}

const smoothScroll = (section, duration) => {
  const elementPosition = document.querySelector(section).offsetTop - 70;
  const startingPosition = window.pageYOffset;

  const distance = elementPosition - startingPosition;
  let startTime = null;

  const animationScroll = (currentTime) => {
    if (!startTime) {
      startTime = currentTime;
    }

    let timeElapsed = currentTime - startTime;
    let run = ease(timeElapsed, startingPosition, distance, duration);

    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      window.requestAnimationFrame(animationScroll);
    }
  };



  window.requestAnimationFrame(animationScroll);
};



document.addEventListener('DOMContentLoaded', () => {
  getViewportHeightUnit();

  const localAnchors = document.querySelectorAll('.smooth-scroll');
  const menuActivator = document.getElementById('menu-activator');
  const menu = document.getElementById('menu');
  const form = document.getElementById('form');

  console.log(localAnchors);



  form.addEventListener('focusout', (event) => {
    const el = event.target;
    el.value = el.value.trim();

    if (el.value.length === 0) {
      el.classList.remove('with-content');
    } else {
      el.classList.add('with-content');
    }
  });

  menuActivator.addEventListener('click', () => {
    menu.classList.toggle('info-card--content-active');
  });

  Array.from(localAnchors).map((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScroll(el.getAttribute('href'), 1000);
    });
  });

  new Swiper ('#banner-swiper', {
    autoplay: {
      delay: 6500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: '#banner-swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '#banner-swiper-pagination-next',
      prevEl: '#banner-swiper-pagination-prev',
    },
  });

  new Swiper ('#sentence-swiper', {
    autoplay: {
      delay: 6500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: '#sentence-swiper-pagination',
      clickable: true,
    },
  });
});


window.addEventListener('resize', getViewportHeightUnit);
