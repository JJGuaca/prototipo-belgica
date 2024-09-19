document.addEventListener('DOMContentLoaded', function(){
    let location  = window.location.href;
    activeMenu(location);
})

function activeMenu(location){
    let cadena = location.split('/',6);
    cadena = cadena[0];
    let menuPpal = document.getElementById('navbarNavDropdown');
    let itemsMenduMain = menuPpal.querySelectorAll('.itemMenuMain');
    for(let i =0; i< itemsMenduMain.length; i++){
        if(itemsMenduMain[i].children[0].pathname === '/prototipo/web/'+cadena){
            addActive(itemsMenduMain[i].children[0], cadena)
            
        }
    }
    let titulo = document.getElementById('block-tragelsports-theme-page-title');
    if(titulo.children[0].innerText.toLowerCase() == "home"){
        titulo.classList.add('d-none');
    }
}
function addActive(valor,cadena){
    if(valor.innerText.toLowerCase() === cadena){
        valor.parentNode.classList.add('active');
    }else if(valor.innerText.toLowerCase() == "home"){
        let menuPpal = document.getElementById('navbarNavDropdown');
        let itemsMenduMain = menuPpal.querySelectorAll('.itemMenuMain');
        itemsMenduMain[0].classList.add('active');
    }else if(valor.innerText.toLowerCase() == "stengrill"||valor.innerText.toLowerCase() == "kidsparty"||valor.innerText.toLowerCase() == "feesten"){}
    
}

let items = document.querySelectorAll('.carousel .carousel-item')

items.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (var i=1; i<minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
        	next = items[0]
      	}
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})
