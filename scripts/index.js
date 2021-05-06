var nav =document.querySelector('#botoes')
window.onscroll=function(){
    "use strict"
    if(document.body.scrollTop>=200||document.documentElement.scrollTop>=200){
        nav.style.backgroundColor="rgb(241, 168, 32)";
        nav.style.color="white";
    }else{
        nav.style.backgroundColor="transparent"
        
    }
}