const descargarBoton = document.getElementById("descargar-archivo");

descargarBoton.addEventListener("click", () => {
  const nombreArchivo = document.getElementById("nombre-archivo").value;

  fetch(`http://localhost:8094/expedientes/downloadFile/${nombreArchivo}`)
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
        console.log(url)
      const link = document.createElement("a");
      link.href = url;
      link.download = nombreArchivo;
      link.click();
    });
});