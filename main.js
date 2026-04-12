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

const BASE_URL = "http://localhost:8080/api/experiencias";

// Cargar todas al iniciar
document.addEventListener("DOMContentLoaded", cargarExperiencias);

async function cargarExperiencias() {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  const lista = document.getElementById("lista-experiencias");
  lista.innerHTML = "";

  if (data.length === 0) {
    lista.innerHTML = `<p style="color:#9CA3AF">No hay experiencias registradas aún.</p>`;
    return;
  }

  data.forEach(exp => {
    lista.innerHTML += `
      <div class="card-experiencia">
        <h3>${exp.empresa}</h3>
        <h4>${exp.cargo}</h4>
        <p>${exp.descripcion}</p>
        <span class="card-anios">${exp.anioInicio} — ${exp.anioFin}</span>
        <div class="botones-card">
          <button class="btn-editar" onclick="editarExperiencia(${exp.id})">Editar</button>
          <button class="btn-eliminar" onclick="eliminarExperiencia(${exp.id})">Eliminar</button>
        </div>
      </div>`;
  });
}

async function guardarExperiencia() {
  const id       = document.getElementById("exp-id").value;
  const empresa  = document.getElementById("exp-empresa").value.trim();
  const cargo    = document.getElementById("exp-cargo").value.trim();
  const desc     = document.getElementById("exp-descripcion").value.trim();
  const inicio   = parseInt(document.getElementById("exp-inicio").value);
  const fin      = parseInt(document.getElementById("exp-fin").value);

  // Validaciones
  let valido = true;
  if (!empresa) { document.getElementById("error-empresa").innerHTML = "La empresa es obligatoria"; valido = false; }
  else document.getElementById("error-empresa").innerHTML = "";

  if (!cargo) { document.getElementById("error-cargo").innerHTML = "El cargo es obligatorio"; valido = false; }
  else document.getElementById("error-cargo").innerHTML = "";

  if (!desc) { document.getElementById("error-descripcion").innerHTML = "La descripción es obligatoria"; valido = false; }
  else document.getElementById("error-descripcion").innerHTML = "";

  if (!inicio) { document.getElementById("error-inicio").innerHTML = "El año de inicio es obligatorio"; valido = false; }
  else document.getElementById("error-inicio").innerHTML = "";

  if (!fin) { document.getElementById("error-fin").innerHTML = "El año fin es obligatorio"; valido = false; }
  else document.getElementById("error-fin").innerHTML = "";

  if (inicio > fin) { document.getElementById("error-fin").innerHTML = "El año fin no puede ser menor al inicio"; valido = false; }

  if (!valido) return;

  const body = { empresa, cargo, descripcion: desc, anioInicio: inicio, anioFin: fin };

  if (id) {
    // UPDATE
    await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
  } else {
    // CREATE
    await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
  }

  document.getElementById("form-experiencia").reset();
  document.getElementById("exp-id").value = "";
  cancelarEdicion();
  cargarExperiencias();
}

async function editarExperiencia(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  const exp = await response.json();

  document.getElementById("exp-id").value          = exp.id;
  document.getElementById("exp-empresa").value     = exp.empresa;
  document.getElementById("exp-cargo").value       = exp.cargo;
  document.getElementById("exp-descripcion").value = exp.descripcion;
  document.getElementById("exp-inicio").value      = exp.anioInicio;
  document.getElementById("exp-fin").value         = exp.anioFin;

  document.getElementById("titulo-form").textContent = "Editar Experiencia";
  document.getElementById("btn-cancelar").style.display = "block";

  document.querySelector("#experiencias").scrollIntoView({ behavior: "smooth" });
}

async function eliminarExperiencia(id) {
  if (!confirm("¿Seguro que deseas eliminar esta experiencia?")) return;
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  cargarExperiencias();
}

function cancelarEdicion() {
  document.getElementById("form-experiencia").reset();
  document.getElementById("exp-id").value = "";
  document.getElementById("titulo-form").textContent = "Agregar Experiencia";
  document.getElementById("btn-cancelar").style.display = "none";
}