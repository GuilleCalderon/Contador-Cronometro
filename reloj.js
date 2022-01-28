//Variables

const enDisplay = document.getElementById("actualizarDisplay")
const sumarEnDisplay = document.getElementById("masBtn")
const resetDisplay = document.getElementById("resetBtn")
const restarEnDisplay = document.getElementById("minusBtn")
const cronometro = document.getElementById("cronometro")
const listaTiempo = document.getElementById("lista-tiempos")
const temporizadorBtn = document.getElementById("temporizador")
let checkContador = document.getElementById("checkContador")
let checkCronometro = document.getElementById("checkCronometro")
let estadoInicial = 0
let sucesoActivo = false
let forReset
let forResetTempo
let marcarVuelta
let vueltas = []
let contadorCronometro = 0
let contadorTemporizador = 0
let btnCerrar
let intermitencia
let cronometroFuncionando
let mili=0
let seg=0    
let min=0
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
    if (estadoInicial === 0){
        cronometro.classList.remove("btn-desactivado")
        temporizadorBtn.classList.remove("btn-desactivado")
    }
})

cronometro.addEventListener("click",()=>{
   
    if((sucesoActivo === false) && (estadoInicial>=0)) {
        sucesoActivo = true
        if(checkCronometro.checked){
            
            cronometroFuncionando = setInterval(cambiarDisplayACronometro,10)
        }
        if(checkContador.checked){
            
            forReset = setInterval(cronometroIniciar,1000)
        }
        if(contadorTemporizador===1){
            contadorTemporizador=0
            deshabilitarTempo()
            temporizadorBtn.classList.remove("btn-desactivado")
            console.log(contadorTemporizador,contadorCronometro)
        }
        if(contadorTemporizador===0){
            contadorTemporizador++
            deshabilitarTempo()
            temporizadorBtn.classList.add("btn-desactivado")
            console.log(contadorTemporizador,contadorCronometro)

        }
        cronometro.value= "Detener Cronometro"
        console.log(checkCronometro.checked)
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
                    
                   const listElement = document.createElement("li")
                   listElement.setAttribute("id",`tiempo_${i}`)
                   listElement.innerHTML = `<div contenteditable=true>Ingrese titulo de la vuelta</div>Su tiempo es: ${vuelta} segundos // La diferencia entre tiempos es: ${diferencia} segundos`
                   const btnCerrar =document.createElement("input")
                   btnCerrar.setAttribute("type","button")
                   btnCerrar.setAttribute("class","btn-todos")
                   btnCerrar.setAttribute("id",`cerrar_${i}`)
                   btnCerrar.setAttribute("value","x")

                   listElement.appendChild(btnCerrar)

                   listaTiempo.appendChild(listElement)

                   btnCerrar.addEventListener("click",()=>{
                       listElement.remove()
                   })
                }
                
                
            
                
            })       
            
        })
        console.log(contadorTemporizador,contadorCronometro)
    }else {
        if(checkCronometro.checked){
            contadorTemporizador--
            deshabilitarTempo()
            if(contadorTemporizador===-1){
                contadorTemporizador=0
                deshabilitarTempo()
                
            }
            temporizadorBtn.classList.toggle("btn-desactivado")
            sucesoActivo=false
            cronometro.value= "Iniciar Cronometro"
            
            clearInterval(cronometroFuncionando)
        }
        if(checkContador.checked){

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
        }

        
    }
    
})

temporizadorBtn.addEventListener("click",()=>{

    if (intermitencia){
         clearInterval(intermitencia)
         enDisplay.classList.remove("rojo")
         
        }
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
        
        
        detenerTemporizador()
        contadorCronometro--
        deshabilitarCrono()
        
        temporizadorBtn.value ="Temporizador OK"


        intermitencia= setInterval(()=>{

            enDisplay.classList.toggle("rojo")

        },700)    
        
       
            contadorTemporizador=0
            contadorCronometro=0
            deshabilitarCrono()
            deshabilitarTempo()
            cronometro.classList.toggle("btn-desactivado")
            
        

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

let divMin=document.createElement("input")
//divMin.setAttribute("contenteditable","true")
divMin.setAttribute("class","input")
divMin.setAttribute("id","divMin")
divMin.innerText= "0"+min
enDisplay.appendChild(divMin)

let divPuntito = document.createElement("div")
divPuntito.innerText=":"
divPuntito.setAttribute("class","indicador")
enDisplay.appendChild(divPuntito)

let divSeg =document.createElement("input")
divSeg.setAttribute("class","input")
divSeg.setAttribute("id","divSeg")

enDisplay.appendChild(divSeg)

let divPuntito2 = document.createElement("div")
divPuntito2.innerText=":"
divPuntito2.setAttribute("class","indicador")
enDisplay.appendChild(divPuntito2)


let divMili =document.createElement("input")
//divMili.setAttribute("contenteditable","true") 
divMili.setAttribute("class","input inputMili")
divMili.setAttribute("id","divMil")
divMili.innerText= mili
enDisplay.appendChild(divMili)

divSeg.setAttribute("value",`${seg}`)
divMin.setAttribute("value",`${min}`)
divMili.setAttribute("value",`${mili}`)



divMin.addEventListener("change",(evento)=>{
    min = evento.target.value
    

   //divMin.setAttribute("value",`${min}`)
   
  

})

divSeg.addEventListener("change",(evento)=>{
   
    seg = evento.target.value
   //divSeg.setAttribute("value",`:${seg}`)
   

   console.log(seg)    

})

function cambiarDisplayACronometro() {
    
    
    mili++
    
    if(mili >= 99){
        mili=0
        seg++
    }
    if(seg>=59){
        seg=0
        min++
    }

    divMili.value = `${mili}`
    divSeg.value = `${seg}`
    divMin.value = `${min}`
    /* divMin.innerText= "0"+min
    divSeg.innerText= ":"+seg*/
    //divSeg.innerHTML= `: ${seg}`
    //divMili.setAttribute("value",`:${mili}`) 
    /* divSeg.setAttribute("value",`:${seg}`)
    divMin.setAttribute("value",`${min}`)
    divMili.setAttribute("value",`:${mili}`) */
    /* enDisplay.innerHTML=`
    <input class="input" value="${min}" id="divMin"></input>
    <input class="input" value=":${seg}" id="divSeg"></input>
    <input class="input" value=":${mili}" id="divMil"></input>` */
    
        //divMin.setAttribute("value",`${min}`)
        //divSeg.setAttribute("value",`:${seg}`)
        //divSeg.innerHTML=`<input value="" class="indicador" id="divMin">${seg}</input>`
        
        
        /* enDisplay.innerHTML = `<div class="indicador">
        <div contenteditable=true>0${min}</div>
        <div contenteditable=true>:${seg}</div>
        <div contenteditable=true>:${mili}</div>
        </div>` */
        
        
}



