document.addEventListener('DOMContentLoaded', function(){
    let location  = window.location.pathname;
    if(window.location.pathname == "/" || window.location.pathname == "/home" || window.location.pathname=="/kidsparty"){
        sliderSportEtten();
        if(window.localStorage.getItem('fecha') == null || window.localStorage.getItem('veces') == null){
            let hoy = Date.now();
            window.localStorage.setItem('fecha', hoy);
            window.localStorage.setItem('veces', 0);
        }
    }
    modalHome();
    activeMenu(location);
})

function activeMenu(location){
    let menuPpal = document.getElementById('navbarNavDropdown');
    let itemsMenduMain = menuPpal.querySelectorAll('.nav-item');
    for(let i =0; i< itemsMenduMain.length; i++){
        if(itemsMenduMain[i].children[0].pathname === location){
            addActive(itemsMenduMain[i].children[0], location)
        }
    }
    let titulo = document.getElementById('block-tragelsports-theme-page-title');
    if(titulo.children[0].innerText.toLowerCase() == "home" || titulo.children[0].innerText.toLowerCase() == "steengrill"|| titulo.children[0].innerText.toLowerCase() == "sports"){
        titulo.children[0].classList.add('d-none');
        titulo.classList.add('d-none');
    }
    
}
function addActive(valor,cadena){
    let item = "/"+valor.innerText.toLowerCase();
    item= item.replace(/ /g,"")
    if(item == "/home"){
        item = "/";
    }
    if(item === cadena){
        valor.parentNode.classList.add('active');
        if(item === "/kidsparty" || item === "/steengrill" ||item === "/feesten"){
            valor.parentNode.parentNode.parentNode.classList.add('active');
        } 
    } 
    menusFooter(cadena);   
}

function menusFooter(cadena){
    let region ="";
    if(cadena == "/privacy-policy" || cadena == "/over_ons" || cadena == "/algemene_voorwaarden"){
        region = "nuestraEmpresa"
    }else if(cadena == "/contacteer-ons"){
        region="accesoRapido";
    }else if(cadena == "/" || cadena =="/steengrill"|| cadena =="/kidsparty" || cadena =="/feesten" || cadena =="/karaoke" || cadena =="/sports" || cadena =="/menu"|| cadena =="/bowling"){
        region= "principalFooter";
    }
    togleActiveMenuFooter(region, cadena)
}
function togleActiveMenuFooter(region, cadena){
    let item = "."+region+" .item-link";
    let items = document.querySelectorAll(item)
    for(let i=0; i< items.length;i++){
        if(items[i].children[0].attributes[0].value == cadena){
            items[i].classList.add('active')
            if(cadena =="/steengrill"|| cadena =="/kidsparty" || cadena =="/feesten"){
                items[i].parentNode.parentNode.classList.add('active');
            }
        }
    }
}
function sliderSportEtten(){
    let items = document.querySelectorAll('.multiproposito .carousel-item')
    items.forEach((el) => {
        const minPerSlide = 4
        let next = el.nextElementSibling
        for (var i=1; i<minPerSlide; i++) {
            if (!next) {
                next = items[0]
            }
            let cloneChild = next.cloneNode(true)
            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling
        }
    })
}
function modalHome(){
    if(document.getElementById('botonCerrar') != null){
        let botonCerrar = document.getElementById('botonCerrar');
        let boton = document.getElementById("lanzadorModal");
        let tiempo = window.localStorage.getItem('fecha');
        tiempo = parseInt(tiempo);
        let fecha = new Date(tiempo);
        let hoy = Date.now();
        let diferenciahoy = new Date(hoy);
        setTimeout(() => {
            boton.click();
            window.localStorage.setItem('veces',1);
        }, 2000);
        boton.addEventListener('click', function(){
            let body = document.querySelector('.path-frontpage');
            body.classList.add('modal-open');
        });
    
        botonCerrar.addEventListener('click', function(){
            let body = document.querySelector('.path-frontpage');
            body.classList.remove('modal-open');
        });
    }else{
        console.log("no hay modal");
    }    
}