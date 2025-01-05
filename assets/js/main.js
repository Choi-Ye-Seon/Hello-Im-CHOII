$(document).ready(function () {

    // Intro
    gsap.set('.intro .text h2, .intro .text h3', {yPercent: 100});

    const introShow = gsap.timeline({
      onComplete:function(){
        $('html').removeClass('fixed');
        heroMotions();
      }
    });
    introShow
    .to('.intro .text h2, .intro .text h3', 0.8, { yPercent: 0 , delay:.6});
  
    // Intro / keyword (타이핑효과)
    const keywords = ['CHOII', 'Publisher', 'Flexible'];
    keywords.forEach(function(keyword, index){
      introShow
      .to('.intro .keyword', {
        duration: 1,
        text: keyword,
      })
      if (index < keywords.length - 1) {
        introShow.to('.intro .keyword', {
          duration: 0.5,
          text: '',
        });
      }
    });
  
    introShow
    .to('.intro',.7,{yPercent:-100, display:"none"})
    .to('.intro .cover-title',.2, { autoAlpha:0 },"<+=0.1");



    // Hero 
    gsap.set('.sc-hero .title-box .text span', { yPercent: 100 });
    gsap.set('.scroll-mark', { autoAlpha: 0, scale: 0.1 });
    gsap.set('#header', { autoAlpha: 0 });

    function heroMotions(){
    const hero = gsap.timeline();
    hero
    .to('#header', 0.8, { autoAlpha: 1 }, '<')
    .to('.scroll-mark', 0.8, { autoAlpha: 1, scale: 1 }, '<')
    .to('.sc-hero .title-box .text span', 0.8, { yPercent: 0 }, '<');
  }
    



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



  // lenis 스크롤
  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);



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
  });

  // nav click 이동
  $('#header .link-menu').click(function () {
    $('#header').removeClass('active');
    $('html').removeClass('fixed');

    const navLink = $(this).data('target');
    lenis.scrollTo(navLink);
  });



  // Latest Project (최근 프로젝트)
  const latestProjectEls = document.querySelectorAll('.sc-project .latest-project .project-item');

  latestProjectEls.forEach(function(latestProject, index){
    const latest = gsap.timeline({
      scrollTrigger:{
        trigger:latestProject,
        start:"0% 0%",
        end:"100% 0%",
        scrub:1,
        // markers:true
      }
    });

    latest
    .to(latestProject, { scale: 0.8 },"<")
    .to(latestProject, { filter: 'blur(5px)'},"<+=.1");

  });


  // Career-Project (실무 프로젝트)
  let mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    const triggers = document.querySelectorAll('.sc-project .career-project .trigger');

    triggers.forEach((trigger, index) => {
      gsap.to(`.sc-project .career-project .trigger:nth-child(${index + 1}) .project-item.active`, {
        yPercent: -30,
        scrollTrigger: {
          trigger: `.sc-project .career-project .trigger:nth-child(${index + 1})`,
          start: '0% 70%',
          end: '100% 50%',
          scrub: 1
          // markers: true,
        }
      });
    });

    return () => {
      triggerInstances.forEach((instance) => instance.kill());
      triggerInstances = [];

      gsap.set('.sc-project .career-project .trigger .project-item.active', {yPercent: 0});
    };
  });


  // contact
  const marquee = gsap.timeline({
    scrollTrigger: {
      trigger: '.sc-contact',
      start: '20% 70%',
      end: '100% 100%'
      // markers: true
    },
    paused: true,
    toggleActions: 'play reverse play reverse'
  });
  gsap.set('.sc-contact .marquee-wrapper.left .marquee-text', {yPercent: 100});
  gsap.set('.sc-contact .marquee-wrapper.right .marquee-text', {xPercent: -100, yPercent: 100});

  marquee
    .to('.sc-contact .marquee-wrapper.right .marquee-text', {yPercent: 0}, 'show')
    .to('.sc-contact .marquee-wrapper.left .marquee-text', {yPercent: 0}, 'show')

    .to('.sc-contact .marquee-wrapper.left .marquee-text',12,{
        xPercent: -104,
        repeat: -1,
        ease: 'none'
      },'slide')
    .to('.sc-contact .marquee-wrapper.right .marquee-text', 12,{
        xPercent: -1,
        repeat: -1,
        ease: 'none'
      },'slide');


    // thisYear
    const thisYearEls = document.querySelectorAll('.this-year');
    thisYearEls.forEach(function (thisYearEl) {
    thisYearEl.textContent = new Date().getFullYear();
});

});

