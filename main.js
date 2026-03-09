const btnColor =document.querySelector(".btn-cambiar-color")
const luna=document.querySelector("#imagen-luna")
const bodys=document.querySelector("body")
const barra=document.querySelector(".conteiner-header")
const gridEstudios=document.querySelector(".formacion")
const flooter=document.querySelector(".footer")

const proyectos=document.querySelector(".conteiner-proyectos")
const divProyect=proyectos.children;
btnColor.addEventListener("click",()=>{
     barra.classList.toggle("modeLight")
    bodys.classList.toggle("modeLight")
    gridEstudios.classList.toggle("modeLight")
flooter.classList.toggle("modeLight")
  

  if (bodys.classList.contains("modeLight")){
    console.log(luna)
    luna.src="imagenes/sol.png"
  }

  else{
luna.src="imagenes/luna.png";
  }

      divProyect.classList.toggle("modeLight")
    
});