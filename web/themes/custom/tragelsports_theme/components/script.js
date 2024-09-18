document.addEventListener('DOMContentLoaded', function(){
    let location  = window.location.href;
    activeMenu(location);
})

function activeMenu(location){
    let cadena = location.split('/',6);
    console.log(cadena.reverse());
    cadena = cadena[0];
    let menuPpal = document.getElementById('navbarNavDropdown');
    let itemsMenduMain = menuPpal.querySelectorAll('.itemMenuMain');
    for(let i =0; i< itemsMenduMain.length; i++){
        console.log(itemsMenduMain[i].children[0].pathname, cadena)
        if(itemsMenduMain[i].children[0].pathname === '/'+cadena){
            addActive(itemsMenduMain[i].children[0], cadena)
        }
    }
}
function addActive(valor,cadena){
    if(valor.innerText.toLowerCase() === cadena){
        valor.parentNode.classList.add('active');
    }else if(valor.innerText.toLowerCase() == "home"){
        let menuPpal = document.getElementById('navbarNavDropdown');
        let itemsMenduMain = menuPpal.querySelectorAll('.itemMenuMain');
        itemsMenduMain[0].classList.add('active');
    }else if(valor.innerText.toLowerCase() == "stengrill"||valor.innerText.toLowerCase() == "kidsparty"||valor.innerText.toLowerCase() == "feesten"){
        console.log(cadena)
    }
    
}
