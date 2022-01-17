var nav =document.querySelector('#botoes')
window.onscroll=function(){
    "use strict"
    if(document.body.scrollTop>=10||document.documentElement.scrollTop>=10){
        nav.style.backgroundColor="rgba(240, 240, 50)";
        nav.style.color="white";
    }else{
        nav.style.backgroundColor="transparent"
        
    }
}
const inViewport = (entries, observer) => {
    entries.forEach(entry => {
      entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
    });
  };
  
  const Obs = new IntersectionObserver(inViewport);
  const obsOptions = {}; //See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
  
  // Attach observer to every [data-inviewport] element:
  const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
  ELs_inViewport.forEach(EL => {
    Obs.observe(EL, obsOptions);
  });