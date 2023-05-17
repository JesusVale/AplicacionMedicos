const URL = "http://localhost:8094";


//Verificar Cedula
async function verificarCedula(cedula){
    const verificacionJSON = await fetch(`${URL}/verificar/cedula/${cedula}`)
    const resultado = await verificacionJSON.json();
    const status = verificacionJSON.status;

    if(status !== 200){
        throw new Error(resultado.message)
    }

    return resultado
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