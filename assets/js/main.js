$(document).ready(function () {
  // lenis 스크롤
  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  
  // Hero
  gsap.set('.sc-hero',{autoAlpha:0});
  gsap.set('.sc-hero .title-box .text span', {yPercent: 100, autoAlpha:0});
  gsap.set('.scroll-mark', {autoAlpha: 0, scale: 0.1});
  gsap.set('#header', {autoAlpha: 0});

  function heroMotions() {
    const hero = gsap.timeline({delay:0.5});
    hero
    .to('.sc-hero',0.1,{autoAlpha:1})
    .to('#header', 0.8, {autoAlpha: 1}, '<')
    .to('.scroll-mark', 0.8, {autoAlpha: 1, scale: 1}, '<')
    .to('.sc-hero .title-box .text span', 0.8, {yPercent: 0, autoAlpha:1}, '<');
  }
  heroMotions();


  // cursor pointer
  let mediaQuery = window.matchMedia('(min-width: 768px)');

  function cursorPointer(e) {
    if (e.matches) {
      // window 768px 이상
      $(document).mousemove(function (e) {
        const xVal = e.clientX;
        const yVal = e.clientY;

        gsap.to('#cursor', {
          x: xVal,
          y: yVal,
          duration: 0.1
        });
      });

      // a, button hover 시, pointer 효과
      $('a, button').hover(
        function () {
          $('#cursor .ic-cursor').addClass('pointer');
        },
        function () {
          $('#cursor .ic-cursor').removeClass('pointer');
        }
      );
    } else {
      // window 768px 미만
      $(document).off('mousemove');
      $('a, button').off('mouseenter mouseleave');
    }
  }
  cursorPointer(mediaQuery);
  mediaQuery.addEventListener('change', cursorPointer);



  // top btn
  $('#toTop').click(function () {
    lenis.scrollTo(0, {
      duration: 1
    });
  });

  // top btn 노출 컨트롤
  let toTop;
  function toTopHandle() {
    toTop = ScrollTrigger.create({
      trigger: '#container',
      start: '0% 0%',
      endTrigger: '#footer',
      end: '100% 100%',
      // markers: true,
      onUpdate: function (self) {
        // console.log(self);
        const direction = self.direction;
        if (direction === 1) {
          $('#toTop').removeClass('show');
        } else {
          $('#toTop').addClass('show');
        }
      },
      onLeaveBack: function () {
        $('#toTop').removeClass('show');
      }
    });
  }
  toTopHandle();
  window.addEventListener('resize', function () {
    toTop.refresh();
  });


  // Header btn-menu / toggleClass
  $('#header .btn-menu').click(function () {
    $('#header').toggleClass('active');
    $('html').toggleClass('fixed');

    if($("#header").hasClass('active')){
      lenis.stop();
    }else{
      lenis.start();
    }
  });

$('#header h1').click(function(){
  if($("#header").hasClass('active')){
    $("#header").removeClass('active');
    lenis.start();
  }
});

  // nav click 이동
  $('#header .link-menu').click(function () {
    $('#header').removeClass('active');
    $('html').removeClass('fixed');
    lenis.start();

    const navLink = $(this).data('target');
    lenis.scrollTo(navLink);
  });


  // Latest Works (최근 프로젝트)
  const latestWorksEls = document.querySelectorAll('.sc-works .latest-works .project-item');

  latestWorksEls.forEach(function (latestWorks, index) {
    const latest = gsap.timeline({
      scrollTrigger: {
        trigger: latestWorks,
        start: '0% 0%',
        end: '100% 0%',
        scrub: 1
        // markers:true
      }
    });

    latest
    .to(latestWorks, {scale: 0.8}, '<')
    .to(latestWorks, {filter: 'blur(5px)'}, '<+=.3');
  });



  // Career-Project (실무 프로젝트)
  mediaQuery = window.matchMedia('(min-width: 768px)');

  function careerThumb(e) {
    if (e.matches) {
      // 768px 이상
      $('.sc-works .career-works .link-project').hover(function () {
        const career = $(this).data('career');
        $(career).toggleClass('on');
        $('#cursor .img-box').toggleClass('on');
        $('#cursor .ic-cursor').toggleClass('hide');
      });
    } else {
      // 768px 미만일 때 초기화
      $('.sc-works .career-works .link-project').off('mouseenter mouseleave'); 
      $('.sc-works .career-works .link-project').each(function () {
        career = $(this).data('career');
        $(career).removeClass('on');
      });
      $('#cursor .img-box').removeClass('on');
      $('#cursor .ic-cursor').removeClass('hide');
    }
  }
  mediaQuery.addEventListener('change', careerThumb);
  careerThumb(mediaQuery);



  // contact
  gsap.set('.sc-contact .title-box .text', {xPercent: 0});
  const contact = gsap.timeline({
    scrollTrigger: {
      trigger: '.sc-contact .video-box',
      start: '75% 75%',
      end: '100% 60%',
      scrub: 1
      // markers:true
    }
  });
  contact
  .from('.sc-contact .title-box .text.first', {xPercent: -170}, '<')
  .from('.sc-contact .title-box .text.third', {xPercent: 103}, '<');

  

  // thisYear
  const thisYearEls = document.querySelectorAll('.this-year');
  thisYearEls.forEach(function (thisYearEl) {
    thisYearEl.textContent = new Date().getFullYear();
  });
});
