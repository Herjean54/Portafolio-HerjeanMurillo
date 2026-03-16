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



const btnEnviar=document.querySelector("#enviarFormulario")


btnEnviar.addEventListener("click",(e)=>{

const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]{3,}$/;
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 const nombre=document.querySelector("#name").value.trim();
const correo=document.querySelector("#correo").value.trim();
const mensaje=document.querySelector("#mensaje").value.trim();

 e.preventDefault(); 


 let valido=true;

 

if(nombre==""){
 const errorName=document.querySelector("#nameError").innerHTML="El nombre es obligatorio"
 valido=false
}

else if(!regexNombre.test(nombre)){
  document.querySelector("#nameError").innerHTML =
  "El nombre debe tener mínimo 3 letras y no contener números"
  valido=false
}

else{
   const errorName=document.querySelector("#nameError").innerHTML=""
}



if(correo==""){
const errorCorreo=document.querySelector("#correoError").innerHTML="El correo es obligatorio"
valido=false
}

else if(!regexCorreo.test(correo)){
 document.querySelector("#correoError").innerHTML =
 "El correo no tiene un fomato valido"
 valido=false
}

else{
     const errorCorreo=document.querySelector("#correoError").innerHTML=""
}



if(mensaje==""){
  const errorMensaje=document.querySelector("#mensajeError").innerHTML="El mensaje es obligatorio"
  valido=false
}
else{
    const errorMensaje=document.querySelector("#mensajeError").innerHTML=""
}



if(valido==true){
 alert("formulario enviado")

    const form = document.querySelector(".form-contacto");
form.reset();



}



})

