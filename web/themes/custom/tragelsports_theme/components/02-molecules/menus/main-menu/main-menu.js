document.addEventListener("DOMContentLoaded", function(event) {
  let dropdown = document.querySelectorAll('.dropdown-toggle');
  for(let i=0; i< dropdown.length; i++){
    dropdown[i].addEventListener('mouseenter', function(e){
      dropdownShow(e.target);
    });
    dropdown[i].addEventListener('click', function(e){
      dropdownShow(e.target);
    });
  }

  let boton = document.getElementById('botonMenu');
   boton.addEventListener('click', function(){
    let navBar = document.getElementById('navbarNavDropdown');
     navBar.classList.toggle('show');
    //  navBar.classList.toggle('collapse');
    
  })
});

function dropdownShow(val){
  for(let i = 0; i< val.parentNode.children.length; i++){
    val.parentNode.children[i].classList.toggle('show');
  }
}
