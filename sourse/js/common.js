"use strict";

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

let div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px'; // мы должны вставить элемент в документ, иначе размеры будут равны 0

document.body.append(div);
let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {
  btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
  menuMobile: document.querySelector(".menu-mobile--js"),
  menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

  modalCall() {
    const link = ".link-modal-js";
    Fancybox.bind(link, {
      arrows: false,
      infobar: false,
      touch: false,
      type: 'inline',
      autoFocus: false,
      keyboard: {
        CLOSE: "Закрыть",
        NEXT: "Вперед",
        PREV: "Назад",
        // PLAY_START: "Start slideshow",
        // PLAY_STOP: "Pause slideshow",
        // FULL_SCREEN: "Full screen",
        // THUMBS: "Thumbnails",
        // DOWNLOAD: "Download",
        // SHARE: "Share",
        // ZOOM: "Zoom"
      },
      //
      //infinite: false,
      on: {
        initCarousel: () => {
          $('.header').addClass('has-pe');
        },
        destroy: () => {
          $('.header').removeClass('has-pe');
          console.log(this);
        },
      },
    });

    $(".modal-close-js").click(function () {
      Fancybox.close();
    }); // fancybox.defaults.backFocus = false;

    const linkModal = document.querySelectorAll(link);

    function addData() {
      linkModal.forEach(element => {
        element.addEventListener('click', () => {
          let modal = document.querySelector(element.getAttribute("href"));
          const data = element.dataset;

          function setValue(val, elem) {
            if (elem && val) {
              const el = modal.querySelector(elem);
              el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
            }
          }

          setValue(data.title, '.ttu');
          setValue(data.text, '.after-headline');
          setValue(data.btn, '.btn');
          setValue(data.order, '.order');
        });
      });
    }

    if (linkModal) addData();
  },

  // /modalCall
  toggleMenu() {
    const toggle = this.btnToggleMenuMobile;
    const menu = this.menuMobile;
    document.addEventListener("click", function (event) {
      const toggleEv = event.target.closest(".toggle-menu-mobile--js");
      if (!toggleEv) return;
      toggle.forEach(el => el.classList.toggle("on"));
      menu.classList.toggle("active");
      [document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
    }, {
      passive: true
    });
  },

  closeMenu() {
    let menu = this.menuMobile;
    if (!menu) return;

    if (menu.classList.contains("active")) {
      this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
      this.menuMobile.classList.remove("active");
      [document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
    }
  },

  mobileMenu() {
    if (!this.menuMobileLink) return;
    this.toggleMenu();
    document.addEventListener('mouseup', event => {
      let container = event.target.closest(".menu-mobile--js.active"); // (1)

      let link = event.target.closest(".menu-mobile .menu a"); // (1)

      if (!container || link) this.closeMenu();
    }, {
      passive: true
    });
    window.addEventListener('resize', () => {
      if (window.matchMedia("(min-width: 1200px)").matches) this.closeMenu();
    }, {
      passive: true
    });
  },

  // /mobileMenu
  // tabs  .
  tabscostume(tab) {
    let tabs = {
      Btn: [].slice.call(document.querySelectorAll(".".concat(tab, "__btn"))),
      BtnParent: [].slice.call(document.querySelectorAll(".".concat(tab, "__caption"))),
      Content: [].slice.call(document.querySelectorAll(".".concat(tab, "__content")))
    };
    tabs.Btn.forEach((element, index) => {
      element.addEventListener('click', () => {
        if (!element.classList.contains('active')) {
          //turn off old
          let oldActiveEl = element.closest(".".concat(tab)).querySelector(".".concat(tab, "__btn.active"));
          let oldActiveContent = tabs.Content[index].closest(".".concat(tab)).querySelector(".".concat(tab, "__content.active"));
          oldActiveEl.classList.remove('active');
          oldActiveContent.classList.remove('active'); //turn on new(cklicked el)

          element.classList.add('active');
          tabs.Content[index].classList.add('active');
        }
      });
    });
  },

  // /tabs
  inputMask() {
    // mask for input
    let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
    InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
    Inputmask("+9(999)999-99-99").mask(InputTel);
  },

  // /inputMask
  ifie() {
    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

    if (isIE11) {
      document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
    }
  },

  heightwindow() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

    document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
    }, {
      passive: true
    });
  },

  animateScroll() {
    let header = document.querySelector("#headerAlt") || document.querySelector('.top-nav');
    $(document).on('click', '.scroll-link, .aside-menu-js > ul > li > a', function () {
      event.preventDefault();
      let elementClick = $(this).attr("href");
      let scrollBox = this.getAttribute('data-scrollbox');

      if (scrollBox) {
        scrollBox = document.querySelector(scrollBox);
        let destination = $(elementClick).offset().top - $(elementClick).parent().offset().top;
        $(scrollBox).animate({
          scrollTop: destination
        }, 700);
      } else {
        let destination = $(elementClick).offset().top - header.offsetHeight - 20;
        $('html, body').animate({
          scrollTop: destination
        }, 600);
      } // window.scrollTo({
      //   top: destination,
      //   behavior: "smooth"
      // });


      return false;
    });
  },

  getCurrentYear(el) {
    let now = new Date();
    let currentYear = document.querySelector(el);
    if (currentYear) currentYear.innerText = now.getFullYear();
  },

  imgToSVG() {
    $('img.img-svg-js').each(function () {
      var $img = $(this);
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');
      $.get(imgURL, function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg'); // Add replaced image's classes to the new SVG

        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        } // Remove any invalid XML tags as per http://validator.w3.org


        $svg = $svg.removeAttr('xmlns:a'); // Check if the viewport is set, if the viewport is not set the SVG wont't scale.

        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
        } // Replace image with new SVG


        $img.replaceWith($svg);
      }, 'xml');
    }); //
  },

  makeDDGroup(ArrSelectors) {
    $(ArrSelectors).each(function () {
      let ChildHeads = $(this).find('.dd-head-js:not(.disabled)');
      $(ChildHeads).unbind('click');
      $(ChildHeads).click(function () {
        $(this).parent().toggleClass('active').find('.dd-content-js').first().slideToggle(function () {
          $(this).toggleClass('active');
        });
      });
    });
  },

};
const $ = jQuery;

function eventHandler() {
  JSCCommon.ifie();
  JSCCommon.modalCall();
  JSCCommon.tabscostume('tabs');
  JSCCommon.mobileMenu();
  JSCCommon.inputMask(); // JSCCommon.sendForm();

  JSCCommon.heightwindow();
  JSCCommon.animateScroll(); // JSCCommon.CustomInputFile();

  JSCCommon.imgToSVG();
  var x = window.location.host;
  let screenName;
  screenName = document.body.dataset.bg;

  if (screenName && x.includes("localhost:30")) {
    document.body.insertAdjacentHTML("beforeend", "<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
  } //


  // function setFixedNav() {
  //   let header = document.querySelector('header');
  //   if (!header) return;
  //
  //   if (window.scrollY > (header.offsetHeight || 205)) {
  //     header.classList.add('fixed');
  //   } else {
  //     header.classList.remove('fixed');
  //   }
  // } //
  //
  //
  // function whenResize() {
  //   setFixedNav();
  // }
  //
  // window.addEventListener('scroll', () => {
  //   setFixedNav();
  // }, {
  //   passive: true
  // });
  // window.addEventListener('resize', () => {
  //   whenResize();
  // }, {
  //   passive: true
  // });
  // whenResize();
  let defaultSl = {
    spaceBetween: 0,
    lazy: {
      loadPrevNext: true
    },
    watchOverflow: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: ' .swiper-pagination',
      type: 'bullets',
      clickable: true // renderBullet: function (index, className) {
      // 	return '<span class="' + className + '">' + (index + 1) + '</span>';
      // }

    }
  };
  const swiper4 = new Swiper('.sBanners__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
    slidesPerView: 'auto',
    freeMode: true,
    loopFillGroupWithBlank: true,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    freeModeMomentum: true
  })); // modal window
  //luckyone Js
  //.breands-slider-js
  //.,
  // 	.swiper-next

  let brandsPrev = document.querySelector('.brands--js .swiper-prev');
  let brandsNext = document.querySelector('.brands--js .swiper-next');
  if (brandsPrev) {
    let brandsSlider = new Swiper('.breands-slider-js', {
      slidesPerView: 'auto',
      // freeMode: {
      //   enabled: true,
      //   sticky: true,
      // },
      loop: true,
      // rewind: true,
      navigation: {
        nextEl: brandsNext,
        prevEl: brandsPrev
      },
      pagination: {
        el: ' .brands--js .swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    }); //
  }

  let paymentSlider = new Swiper('.payment-slider-js', {
    spaceBetween: 25,
    slidesPerView: 'auto',
    loop: true,
    pagination: {
      el: ' .swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  }); //



  JSCCommon.makeDDGroup(['.payment-dd-items-js', '.delivery-dd-items-js', '.footer-dd-items-js', '.prod-card-dd-items-js', '.sFAQ-dd-items-js' //'.sidebar-dd-items-js',
  ]); //free

  $('.free-dd-head-js').click(function () {
    if (event.target.closest('.hint-js')) return;
    $(this.parentElement).toggleClass('active');
    $(this.parentElement).find('.free-dd-content-js').slideToggle(function () {
      $(this).toggleClass('active');
    });
  }); //

  let sUseFullPrev = document.querySelector('.sUseFull--js .swiper-prev');
  let sUseFullNext = document.querySelector('.sUseFull--js .swiper-next');
  let sUseFullSlider = new Swiper('.sUseFull-slider-js', {
    slidesPerView: 'auto',
    breakpoints: {
      0: {
        spaceBetween: 20
      },
      1200: {
        spaceBetween: 30
      }
    },
    loop: true,
    navigation: {
      nextEl: sUseFullNext,
      prevEl: sUseFullPrev
    }
  }); //

  let prodCardThumb = new Swiper('.sProdCard-thumb-js', {
    slidesPerView: 'auto'
  });
  let prodCardSlider = new Swiper('.sProdCard-slider-js', {
    spaceBetween: 30,
    thumbs: {
      swiper: prodCardThumb
    },
    loop: true
  }); //
  
  let spY= 0;
  if (document.body.classList.contains("theme-custom")){
     spY= 30;

  }
  
  let famSlider = document.querySelectorAll(".sFamiliar--js");

  for (const slider of famSlider) {


    let sFamiliarPrev = slider.querySelector(' .swiper-prev');
    let sFamiliarNext = slider.querySelector(' .swiper-next');

    let sFamiliarSlider = new Swiper(slider.querySelector('.sFamiliar-slider-js'), {

      spaceBetween: spY,
      slidesPerView: 1,
      breakpoints: {
        575: {
          slidesPerView: 2,
        },
        1200: {
          grid: {
            rows: 2,
            fill: 'row'
          },
          slidesPerView: 3
        }
      },
      // Navigation arrows
      navigation: {
        nextEl: sFamiliarNext,
        prevEl: sFamiliarPrev
      },
      //pagination
      pagination: {
        el: slider.querySelector('.action-slider-puging'),
        clickable: true
      }
    }); //
  }

  let captionSlider = new Swiper('.pc-tabs-slider-js', {
    slidesPerView: 'auto',
    freeMode: true,
    loopFillGroupWithBlank: true,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    freeModeMomentum: true,
    spaceBetween: 20
  }); //.sProd-slider-js

  let sProdSlider = new Swiper('.sProd-slider-js', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    loop: true,
    navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-prev'
    }
  }); //

  let headerBlockSlider = new Swiper('.headerBlock-slider-js', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    loop: true,
    pagination: {
      el: '.headerBlock-slider-js .swiper-pagination',
      clickable: true
    } // navigation: {
    // 	nextEl: '.swiper-next',
    // 	prevEl: '.swiper-prev',
    // },

  }); //

  let sNewPrev = document.querySelector('.sNew--js .swiper-prev, .sBuyWith--js .swiper-prev');
  let sNewNext = document.querySelector('.sNew--js .swiper-next, .sBuyWith--js .swiper-next');
  let sNewSlider = new Swiper('.sNew-slider-js', {
    slidesPerView: 'auto',
    spaceBetween: spY,
    loop: true,
    navigation: {
      nextEl: sNewNext,
      prevEl: sNewPrev
    }
  }); //

  let sBrendsPrev = document.querySelector('.sBrends--js .swiper-prev');
  let sBrendsNext = document.querySelector('.sBrends--js .swiper-next');
  let sBrendsSlider = new Swiper('.sBrends-slider-js', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: true,
    navigation: {
      nextEl: sBrendsNext,
      prevEl: sBrendsPrev
    }
  }); //
  // $('.sTags-btn-js').click(function () {
  //   $('.sTags-btn-js, .sTags-row-js').toggleClass('active');
  // });
  //

  $('.sTags-btn-js').click(function () {
    let row = this.closest('.sTags-row-js');
    $(row).toggleClass('active').find('.sTags-btn-js').toggleClass('active');
  }); //css vars

  let header = document.querySelector(".header--js");
  let brands = document.querySelector(".brands--js");
  let fixedNav = document.querySelector(".fixed-nav--js");

  function calcHeaderHeight() {
    if (!header.classList.contains('fixed')) {
      document.documentElement.style.setProperty('--header-height', "".concat(header.offsetHeight, "px"));
    }

    document.documentElement.style.setProperty('--header-real-height', "".concat(header.offsetHeight, "px"));
    if (brands){

      document.documentElement.style.setProperty('--brands-h', "".concat(brands.offsetHeight, "px"));
    }

    if (fixedNav) {
      document.documentElement.style.setProperty('--fixed-foot-nav-h', "".concat(fixedNav.offsetHeight, "px"));
    }
  }

  window.addEventListener('resize', calcHeaderHeight, {
    passive: true
  });
  window.addEventListener('scroll', calcHeaderHeight, {
    passive: true
  });
  calcHeaderHeight(); //

  $('.catalog-btn-js').click(function () {
    $('.catalog-dd--js').toggleClass('active');
    JSCCommon.closeMenu();
  });
  document.addEventListener('click', function () {
    if (!event.target.closest('.catalog-dd') && !event.target.closest('.catalog-btn-js')) {
      $('.catalog-dd--js').removeClass('active');
    }
  });
  $('.catalog-close-btn-js').click(function () {
    $('.catalog-dd--js').removeClass('active');
  }); //.close-mob-search-js
  //.mob-search-js
  //.mob-search-btn-js

  $('.mob-search-btn-js').click(function () {
    $('.mob-search-js').fadeToggle(function () {
      $(this).toggleClass('active');
    });
  }); //

  $('img.img-svg-js').each(function () {
    var $img = $(this);
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    $.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = $(data).find('svg'); // Add replaced image's classes to the new SVG

      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      } // Remove any invalid XML tags as per http://validator.w3.org


      $svg = $svg.removeAttr('xmlns:a'); // Check if the viewport is set, if the viewport is not set the SVG wont't scale.

      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
      } // Replace image with new SVG


      $img.replaceWith($svg);
    }, 'xml');
  }); //

  $('.rm-btn-js').click( function () {
    $(this).toggleClass('active');
    let hidden = $(this).parent().find('.chb-item:hidden');
    let hiddenActive = $(this).parent().find('.chb-item.active');
    console.log(hidden);
    if(!hidden.hasClass('active')) {
      hidden.fadeIn(function (){ $(this).addClass('active')})
    }
    hiddenActive.fadeOut(function (){ $(this).removeClass('active')})
  });


  /*function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }*/

  /*
  $(".range-wrap").each(function () {
    let _this = $(this);

    var $range = _this.find(".slider-js");

    var $inputFrom = _this.find(".input_from");

    var $inputTo = _this.find(".input_to");

    var instance,
        from,
        to,
        min = $range.data('min'),
        max = $range.data('max');
    $range.ionRangeSlider({
      skin: "round",
      type: "double",
      grid: false,
      grid_snap: false,
      hide_min_max: false,
      hide_from_to: true,
      //here
      onStart: updateInputs,
      onChange: updateInputs,
      onFinish: updateInputs
    });
    instance = $range.data("ionRangeSlider");

    function updateInputs(data) {
      from = data.from;
      to = data.to;
      $inputFrom.prop("value", currencyFormat(from));
      $inputTo.prop("value", currencyFormat(to)); // InputFormat();
    }

    $inputFrom.on("change input ", function () {
      var val = +$(this).prop("value").replace(/\s/g, ''); // validate

      if (val < min) {
        val = min;
      } else if (val > to) {
        val = to;
      }

      instance.update({
        from: val
      });
      $(this).prop("value", currencyFormat(val));
      console.log(val);
    });
    $inputTo.on("change input ", function () {
      var val = +$(this).prop("value").replace(/\s/g, ''); // validate

      if (val < from) {
        val = from;
      } else if (val > max) {
        val = max;
      }

      instance.update({
        to: val
      });
      $(this).prop("value", currencyFormat(val));
    });
  }); //end luckyone Js
  */

  let popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  let popovers = [];

  for (let elem of popoverTriggerList) {
    let popoverContent = {
      title: elem.dataset.title,
      descr: elem.dataset.descr
    };
    let popoverInner = "\n      <div class=\"sidebar__popover\">\n        <div class=\"sidebar__close-btn close-popover-js\">\n          <img loading=\"lazy\" src=\"img/svg/cross-sm.svg\" alt=\"\">\n        </div>\n        <h4>\n          ".concat(popoverContent.title, "\n        </h4>\n        ").concat(popoverContent.descr, "\n      </div>");
    let index = $(popoverTriggerList).index(elem);
    let popover = new bootstrap.Popover(elem, {
      template: "<div class=\"popover\" role=\"tooltip\">\n\t\t\t".concat(popoverInner),
      container: '#sCatalog',
      trigger: 'manual',
      placement: 'auto'
    });
    popovers.push(popover);
    elem.addEventListener('click', popOverElemClick);
  }

  $('body').click(function () {
    if (event.target.closest('.close-popover-js')) {
      $(popovers).each(function () {
        this.hide();
      });
    }
  });

  function popOverElemClick() {
    document.removeEventListener('click', popoverMissClick);
    let index = $(popoverTriggerList).index(this);
    $(popovers).each(function () {
      this.hide();
    });
    popovers[index].show();
    $(this).addClass('active');
    window.setTimeout(function () {
      document.addEventListener('click', popoverMissClick);
    }, 10);
  }

  let popoverMissClick = function () {
    if (!event.target.closest('.popover')) {
      $(popovers).each(function () {
        this.hide();
      });
    }
  }; //.filter-btn-js


  $('.filter-btn-js').click(function () {
    $(this).toggleClass('active');
    $('.sidebar--js').slideToggle(function () {
      $(this).toggleClass('active');
    });
  }); //location

  $('.location-btn-js').click(function () {
    $('.location-dd-js').toggleClass('active');
  });
  $('.location-close-js').click(function () {
    $('.location-dd-js').removeClass('active');
  });
  document.addEventListener('click', function () {
    if (!event.target.closest('.location-dd-js') && !event.target.closest('.location-btn-js')) {
      $('.location-dd-js').removeClass('active');
    }
  }); //#modal-city

  $('.mc-show-all-js').click(function () {
    $(this).fadeOut(function () {
      $(this).removeClass('active');
    }, 0);
    $('.modal-city--js').toggleClass('big');
    $('.mc-popular-js, .mc-all-js').toggleClass('active');
  }); //.add-btn-js

  $('.add-btn-js').click(function () {
    document.body.removeEventListener('click', addMissClick);
    let thisItem = this.closest('.cart-item--js');
    $('.add-dd--js').each(function () {
      let currItem = this.closest('.cart-item--js');

      if (currItem !== thisItem) {
        $(currItem).find('.add-dd--js').slideUp(function () {
          $(this).removeClass('active');
        });
      }
    });
    $(thisItem).find('.add-dd--js').slideToggle(function () {
      $(this).toggleClass('active');
    });
    document.body.addEventListener('click', addMissClick);
  });

  let addMissClick = function () {
    if (!event.target.closest('.add-btn-js') && !event.target.closest('.add-dd--js')) {
      document.body.removeEventListener('click', addMissClick);
      $('.add-dd--js').slideUp(function () {
        $(this).removeClass('active');
      });
    }
  };

  $('.sCart-baner-btn-js').click(function () {
    $(this).closest('.sCart-baner-js').slideUp(function () {
      $(this).removeClass('active');
    });
  }); //

  let sCompareMainSlider = new Swiper('.sCompare-main-slider-js', {
    slidesPerView: 'auto',
    scrollbar: {
      el: ".swiper-scrollbar" //draggable: true,
      //hide: true,

    }
  });
  let subSlidersConts = document.querySelectorAll('.sCompare-sub-slider-js');

  for (let [index, sliderCont] of Object.entries(subSlidersConts)) {
    let prevBtns = sliderCont.querySelectorAll('.sub-slider-prev-js');
    let nextBtns = sliderCont.querySelectorAll('.sub-slider-next-js');
    let subSlider = new Swiper(sliderCont, {
      initialSlide: index,
      slidesPerView: 'auto',
      allowTouchMove: false
    });
    $(prevBtns).click(function () {
      subSlider.slidePrev();
    });
    $(nextBtns).click(function () {
      subSlider.slideNext();
    });
  } //


  let allSlides = document.querySelectorAll('.sCompare-sub-slider-js .swiper-slide');
  let compareCard = document.querySelector('.compare-card--js');
  let headlines = document.querySelectorAll('.c-item-js');
  let lines = []; //

  for (let [headLineIndex, line] of Object.entries(headlines)) {
    lines[headLineIndex] = [line];

    for (let slide of allSlides) {
      let slideLine = slide.querySelectorAll(".slide-char-js")[headLineIndex];
      lines[headLineIndex].push(slideLine);
    }
  }

  function compareCardResize() {
    if (compareCard) {
      document.documentElement.style.setProperty('--comp-card-h', "".concat(compareCard.offsetHeight, "px"));
    }

    if (window.matchMedia("(max-width: 992px)").matches) return;

    for (let line of lines) {
      let minH = 0;

      for (let item of line) {
        if (minH < item.offsetHeight) {
          minH = item.offsetHeight;
        }
      }

      $(line).each(function () {
        this.style.minHeight = minH + 'px';
      });
    }
  }

  window.addEventListener('resize', compareCardResize, {
    passive: true
  }); //-window.addEventListener('scroll', compareCardResize, {passive: true});

  compareCardResize();
  let sAboutSlider = new Swiper('.sAbout-slider-js', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.sAbout--js .swiper-next',
      prevEl: '.sAbout--js .swiper-prev'
    },
    pagination: {
      el: '.sAbout--js  .swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  }); //
  // let tagsSlider = new Swiper('.tags-slider-js', {
  //   slidesPerView: 'auto',
  //   freeMode: true,
  //   loopFillGroupWithBlank: true,
  //   touchRatio: 0.2,
  //   slideToClickedSlide: true,
  //   freeModeMomentum: true,
  //   slidesPerColumn: 4,
  //   slidesPerColumnFill: 'row',
  //   scrollbar: {
  //     el: ".swiper-scrollbar",
  //     draggable: true,
  //   }
  // });
  let tag
  try {
    new ScrollBooster({
      viewport: document.querySelector('.tags-slider-js'),
      content: document.querySelector('.tag-wrapper'),
      scrollMode: 'native',
      // scrollMode: 'transform', // use CSS 'transform' property
      direction: 'horizontal',
      // allow only horizontal scrolling
      emulateScroll: true // scroll on wheel events

    });
  } catch (_unused) {//lalala
  } //.sTime-slider-js


  let sTimeSlider = new Swiper('.sTime-slider-js', {
    loop: true,
    spaceBetween: 30,
    pagination: {
      el: ' .swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  }); //

  let sExampleSlider = new Swiper('.sExample-slider-js', {
    slidesPerView: 'auto',
    //loop: true,
    navigation: {
      nextEl: '.sExample--js .swiper-next',
      prevEl: '.sExample--js .swiper-prev'
    },
    breakpoints: {
      0: {
        spaceBetween: 30
      },
      1200: {
        spaceBetween: 100
      }
    },
    pagination: {
      el: '.sExample--js .swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  }); //

  let sProdSlSlider = new Swiper('.sProdSl-slider-js', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    breakpoints: {
      768: {
        slidesPerView: 2,
        grid: {
          rows: 2,
          fill: 'row'
        },
      },
      1200: {
        slidesPerView: 3,
        grid: {
          rows: 3,
          fill: 'row'
        },
      }
    },
    navigation: {
      nextEl: '.sProdSl--js .swiper-next',
      prevEl: '.sProdSl--js .swiper-prev'
    },
    pagination: {
      el: '.sProdSl--js .swiper-pagination--main',
      type: 'bullets',
      clickable: true
    }
  }); //

  $('.make-yandex-lazy-js').each(function () {
    let self = this;
    window.setTimeout(function () {
      $(self.parentElement).html($(self).data("src"));
      self.remove();
    }, 3500);
  }); //-

  let prodItemSliders = document.querySelectorAll('.sNewProdItem-slider-js');

  for (let sliderCont of prodItemSliders) {
    let slider = new Swiper(sliderCont, {
      slidesPerView: 1,
      effect: 'fade',
      watchOverflow: true,
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
    let pagination = sliderCont.querySelector('.swiper-pagination');
    sliderCont.addEventListener('mousemove', function () {
      let slidesAmount = 0;

      for (let slide of slider.slides) {
        if (!slide.classList.contains('swiper-slide-duplicate')) {
          slidesAmount++;
        }
      } //-


      let rect = this.getBoundingClientRect();
      let x = event.clientX - rect.left;
      slider.slideTo(Math.floor(x * slidesAmount / this.offsetWidth));
    }, {
      passive: true
    });
    sliderCont.addEventListener('mouseenter', function () {
      pagination.classList.add('active');
    });
    sliderCont.addEventListener('mouseleave', function () {
      pagination.classList.remove('active');
      slider.slideTo(0);
    });
  } //-

  /*let tippyElems = document.querySelectorAll('.hint-col-js');
  let tippySettings = {
    theme: 'light',
    content: function (elem) {
      if (elem.classList.contains('active')) {
        return elem.getAttribute('data-hint-active');
      } else {
        return elem.getAttribute('data-hint');
      }
    }
  };
  let tippyInstance;
    if (tippyElems.length > 0) {
    tippyInstance = tippy(tippyElems, tippySettings);
  }*/


  $('.cart-btn-js').click(function () {
    event.preventDefault();
    $(this).toggleClass('active');
    $(this).closest('.actions-col--js').toggleClass('active');
    $(this).closest('.hint-col-js').toggleClass('active'); //tippy update

    /*if (tippyInstance) {
      for (let item of tippyInstance) {
        item.setProps(tippySettings);
      }
    }*/
  });
  $('.toggle-self-active-js').click(function () {
    event.preventDefault();
    $(this).toggleClass('active');
    $(this).closest('.hint-col-js').toggleClass('active'); //tippy update

    /*if (tippyInstance) {
      for (let item of tippyInstance) {
        item.setProps(tippySettings);
      }
    }*/
  }); //-
  //.hint-col-js

  $('.sArtical__content-wrap').hcSticky({
    stickTo: $('.sArtical__content-col'),
    top: 120,
    bottomEnd: 50
  });

  $('.top-nav').hcSticky({
    stickTo: $('body'),
  });


  $('.dropdown__btn').click(function () {
    $(this).parent().toggleClass( "active" );
    $(this).siblings('.dropdown__content').slideToggle();
  });

  $(document).on("click", ".child-toggle", function(){
    $(this).parent().parent().toggleClass("active")
  })



  Fancybox.bind('.sProdCard__s-img[data-fancybox]', {
    // Thumbs: false,
    Toolbar: false,

    Image: {
      // zoom: false,
      // click: false,
      // wheel: "slide",
    },
    Carousel: {
      Navigation: {
        prevTpl:
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 5l-7 7 7 7"/><path d="M4 12h16"/></svg>',
        nextTpl:
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12h16"/><path d="M13 5l7 7-7 7"/></svg>',
      },
    },
  });

  let hnyBlock = document.querySelector(".hny-block");

  if (hnyBlock){ 
    function toggleHny() {
      hnyBlock.classList.toggle("active")
    }
    if (!localStorage['hny']) { 
      setTimeout(() => {
        toggleHny();
      }, 10000);
      
      $(".hny-block__close").on("click", function(){
        $(hnyBlock).removeClass("active")
      })
    }
    localStorage['hny'] =  true;
  }
}

$('.select-js').select2({
  "language": {
    "noResults": function(){
        return "Нечего не найдено";
    }
  },
});

;

if (document.readyState !== 'loading') {
  eventHandler();
} else {
  document.addEventListener('DOMContentLoaded', eventHandler);
}