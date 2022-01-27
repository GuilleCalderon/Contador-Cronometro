//Variables

const enDisplay = document.getElementById("actualizarDisplay")
const sumarEnDisplay = document.getElementById("masBtn")
const resetDisplay = document.getElementById("resetBtn")
const restarEnDisplay = document.getElementById("minusBtn")
const cronometro = document.getElementById("cronometro")
const listaTiempo = document.getElementById("lista-tiempos")
const temporizadorBtn = document.getElementById("temporizador")
let estadoInicial = 0
let sucesoActivo = false
let forReset
let forResetTempo
let marcarVuelta
let vueltas = []
let contadorCronometro = 0
let contadorTemporizador = 0
let btnCerrar
//Eventos

sumarEnDisplay.addEventListener("click",()=>{
    let value = sumarContador()
    
    enDisplay.innerHTML = `<div class="indicador">${value}</div>`
    

    if(estadoInicial===0){
        contadorTemporizador=0
        contadorCronometro=0
        deshabilitarCrono()
        deshabilitarTempo()
        cronometro.classList.toggle("btn-desactivado")
        temporizadorBtn.classList.toggle("btn-desactivado")
    }
   
    console.log(contadorTemporizador,contadorCronometro)
    
    

})

restarEnDisplay.addEventListener("click",()=>{
    let value = restarContador()
    
    enDisplay.innerHTML = `<div class="indicador">${value}</div>`
    if(estadoInicial===-1){
        contadorTemporizador++
        contadorCronometro++
        deshabilitarTempo()
        deshabilitarCrono()
        cronometro.classList.toggle("btn-desactivado")
        temporizadorBtn.classList.toggle("btn-desactivado")
    }
    
    console.log(contadorTemporizador,contadorCronometro)
    
})

resetDisplay.addEventListener("click",()=>{
    
    let value = resetearContador()
    
    enDisplay.innerHTML = `<div class="indicador">${value}</div>`
    contadorCronometro=0
    contadorTemporizador=0
    deshabilitarCrono()
    deshabilitarTempo()
    cronometro.classList.toggle("btn-desactivado")
    temporizadorBtn.classList.toggle("btn-desactivado")

   
   


})

cronometro.addEventListener("click",()=>{
   
    if((sucesoActivo === false) && (estadoInicial>=0)) {
        sucesoActivo = true
        if(contadorTemporizador===1){
            contadorTemporizador--
            deshabilitarTempo()
            temporizadorBtn.classList.toggle("btn-desactivado")
        }
        if(contadorTemporizador===0){
            contadorTemporizador++
            deshabilitarTempo()
            temporizadorBtn.classList.toggle("btn-desactivado")

        }
        cronometro.value= "Detener Cronometro"
        forReset = setInterval(cronometroIniciar,1000)
        let marcarVueltaBtn=document.getElementById("input-btn")
        
        marcarVueltaBtn.innerHTML=
        `<input type="button" class="btn-todos" value="Marcar Vuelta" id="vuelta">`
        
        marcarVuelta = document.getElementById("vuelta")
        
        marcarVuelta.addEventListener("click",()=>{
            
            
            vueltas.push(estadoInicial-1)
            console.log(vueltas)

            vueltas.forEach((vuelta,i)=>{

                let diferencia

                if(i===0){
                    diferencia = vueltas[i]
                }else{
                    diferencia = vueltas[i]-vueltas[i-1]

                }
                
                if(i===vueltas.length-1){
                    
                    listaTiempo.innerHTML+=`
                    <div class="div-lista">
                    <li id="tiempo_${i}"><div contenteditable=true>Su tiempo es: ${vuelta} segundos // La diferencia entre tiempos es: ${diferencia} segundos</div></li><input type="button" class="btn-todos" id="cerrar_${i}" value="x">
                    </div>`
                }
                btnCerrar = document.getElementsByClassName("btn-eliminar")
                
              /*   btnCerrar.addEventListener("click",()=>{
                    eliminarTiempo(i)
                    
                    console.log("funcionaa")
                })   */
                
            })       
            
        })
        console.log(contadorTemporizador,contadorCronometro)
    }else {
        contadorTemporizador--
        deshabilitarTempo()
        if(contadorTemporizador===-1){
            contadorTemporizador=0
            deshabilitarTempo()
            
        }
        temporizadorBtn.classList.toggle("btn-desactivado")
        sucesoActivo=false
        cronometro.value= "Iniciar Cronometro"
        detenerCronometro()
        console.log(contadorTemporizador,contadorCronometro)
    }
    
})

temporizadorBtn.addEventListener("click",()=>{

    if((sucesoActivo === false) && (estadoInicial>0)){
        
        if(contadorCronometro===1){
            contadorCronometro--
            deshabilitarCrono()
            
        } 
        if(contadorCronometro===0){
            contadorCronometro++
            deshabilitarCrono()
            cronometro.classList.toggle("btn-desactivado")
        }  
        sucesoActivo=true
        temporizadorBtn.value= "Detener Temporizador"
        forResetTempo = setInterval(temporizadorIniciar,1000)
        console.log(contadorTemporizador,contadorCronometro)
        
    }else {
        if(contadorCronometro===-1){
            contadorCronometro=0
            deshabilitarCrono()
        }
        if(contadorCronometro===1){
            cronometro.classList.toggle("btn-desactivado")
            contadorCronometro--
            deshabilitarCrono()
        }
        
        sucesoActivo=false
        //contadorCronometro--    
        //deshabilitarCrono()
        temporizadorBtn.value= "Iniciar Temporizador"
        
        detenerTemporizador()
        console.log(contadorTemporizador,contadorCronometro)
    }
    

})

//Funciones
function eliminarTiempo (i){
    /* const tiempoIndividual = vueltas.find( tiempo => tiempo.value === vueltas[i])
    const index = vueltas.indexOf(tiempoIndividual)
    if(index > -1){
        vueltas.splice(index,1)
    } */

    let padre = document.getElementById("div-lista")
    let item =document.getElementById(`tiempo_${i}`)
    padre.removeChild(item) 
} 

function sumarContador  () {
    return estadoInicial = estadoInicial + 1

}
function restarContador () {
    return estadoInicial = estadoInicial - 1
}
function resetearContador () {
    return estadoInicial = 0
}

function cronometroIniciar () {
   
    enDisplay.innerHTML= `<div class="indicador">${estadoInicial}</div>`
    estadoInicial++
}

function detenerCronometro (){

    clearInterval(forReset)

}

function temporizadorIniciar () {

    if (estadoInicial > 0){
        
        deshabilitarTempo()
        enDisplay.innerHTML= `<div class="indicador">${estadoInicial-1}</div>`
        estadoInicial--
    }else{
        
        //contadorTemporizador--
        //deshabilitarTempo()
        detenerTemporizador()
        contadorCronometro--
        deshabilitarCrono()
        setTimeout(()=>{
            temporizadorBtn.value ="Temporizador OK"
            
        },500)
        setTimeout(()=>{
            temporizadorBtn.value ="Iniciar Temporizador"
            contadorTemporizador=0
            contadorCronometro=0
            deshabilitarCrono()
            deshabilitarTempo()
            cronometro.classList.toggle("btn-desactivado")
            
        },2500)

    }
    console.log(contadorTemporizador,contadorCronometro)
}
function detenerTemporizador (){

    clearInterval(forResetTempo)

}

function deshabilitarTempo () {
    if(contadorTemporizador===0){
        temporizadorBtn.disabled = false
    }else{
        temporizadorBtn.disabled =true
    }
}

function deshabilitarCrono (){
    if(contadorCronometro===0){
        cronometro.disabled = false
    }else{
        cronometro.disabled =true
    }
}

function frenarEn0 () {
    if (estadoInicial === 0){
        contadorTemporizador--
        deshabilitarTempo()
    }
}


console.log(contadorTemporizador,contadorCronometro)