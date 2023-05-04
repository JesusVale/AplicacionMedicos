const URL = "http://localhost:8094";


//Verificar Cedula
async function verificarCedula(cedula){
    try{
        const verificacionJSON = await fetch(`${URL}/verificar/${cedula}`)
        const resultado = await verificacionJSON.json();
        return resultado
    } catch(error){
        console.log(error);
    }
}

async function getCitas(request){
    try{
        const params = new URLSearchParams(request);
        const citasJson = await fetch(`http://localhost:8085/citas?${params}`);
        const citas = await citasJson.json();
        return citas;
    } catch(error){
        console.log(error)
    }
}


export {
    verificarCedula,
    getCitas
}