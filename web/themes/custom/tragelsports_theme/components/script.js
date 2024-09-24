document.addEventListener('DOMContentLoaded', function(){
    let location  = window.location.pathname;
    if(window.location.pathname == "/prototipo/web/" || window.location.pathname == "/prototipo/web/home" || window.location.pathname=="/prototipo/web/kidsparty"){
        sliderSportEtten();
        if(window.localStorage.getItem('fecha') == null || window.localStorage.getItem('veces') == null){
            let hoy = Date.now();
            window.localStorage.setItem('fecha', hoy);
            window.localStorage.setItem('veces', 0);
        }
        modalHome();
    }
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
    if(titulo.children[1].innerText.toLowerCase() == "home" || titulo.children[1].innerText.toLowerCase() == "steengrill"|| titulo.children[1].innerText.toLowerCase() == "sports"){
        titulo.children[1].classList.add('d-none');
        titulo.classList.add('d-none');
    }
    
}
function addActive(valor,cadena){
    let item = "/"+valor.innerText.toLowerCase();
    item= item.replace(/ /g,"")
    if(item == "/prototipo/web/home"){
        item = "/";
    }
    if(item === cadena){
        valor.parentNode.classList.add('active');
        if(item === "/prototipo/web/kidsparty" || item === "/prototipo/web/steengrill" ||item === "/prototipo/web/feesten"){
            valor.parentNode.parentNode.parentNode.classList.add('active');
        } 
    } 
    menusFooter(cadena);   
}

function menusFooter(cadena){
    let region ="";
    if(cadena == "/prototipo/web/privacy-policy" || cadena == "/prototipo/web/over_ons" || cadena == "/prototipo/web/algemene_voorwaarden"){
        region = "nuestraEmpresa"
    }else if(cadena == "/contacteer-ons"){
        region="accesoRapido";
    }else if(cadena == "/prototipo/web/" || cadena =="/prototipo/web/steengrill"|| cadena =="/prototipo/web/prototipo/web/kidsparty" || cadena =="/prototipo/web/feesten" || cadena =="/prototipo/web/karaoke" || cadena =="/prototipo/web/sports" || cadena =="/prototipo/web/menu"|| cadena =="/prototipo/web/bowling"){
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
            if(cadena =="/prototipo/web/steengrill"|| cadena =="/prototipo/web/kidsparty" || cadena =="/prototipo/web/feesten"){
                items[i].parentNode.parentNode.classList.add('active');
            }
        }
    }
}
function sliderSportEtten(){
    let items = document.querySelectorAll('.carousel .carousel-item')
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
    let botonCerrar = document.getElementById('botonCerrar');
    let boton = document.getElementById("lanzadorModal");
    let tiempo = window.localStorage.getItem('fecha');
    tiempo = parseInt(tiempo);
    let fecha = new Date(tiempo);
    let hoy = Date.now();
    let diferenciahoy = new Date(hoy);

    if(fecha.toLocaleDateString() != diferenciahoy.toLocaleDateString()){
        window.localStorage.setItem('veces',0);
        window.localStorage.setItem('fecha',null);
    }else if(window.localStorage.getItem('veces') == '0'){        
        setTimeout(() => {
            boton.click();
            window.localStorage.setItem('veces',1);
        }, 2000);
    }
    
    boton.addEventListener('click', function(){
        let popuphome = document.getElementById('popuphome');
        let body = document.querySelector('.path-frontpage');
        popuphome.classList.add('show');
        popuphome.classList.add('pop-up');
        body.classList.add('modal-open');
    });

    botonCerrar.addEventListener('click', function(){
        let popuphome = document.getElementById('popuphome');
        let body = document.querySelector('.path-frontpage');
        popuphome.classList.remove('show');
        popuphome.classList.remove('pop-up');
        body.classList.remove('modal-open');
    });
}