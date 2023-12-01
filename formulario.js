function validarcsv(){
    const input = document.getElementById('csvFile');
    const file = input.files[0];

   if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
         const contenido = e.target.result;
         if (verificarFormatoCSV(contenido)) {
            buscarEnAPI(contenido)
            console.log('Formato CSV válido.');
         } else {
            alert('El formato del CSV no es válido. Asegúrate de que tiene dos columnas: NAME y capital.');
         }
      };

    reader.readAsText(file);
        } else {
   alert('Por favor, selecciona un archivo CSV.');
}}
function verificarFormatoCSV(contenido) {
    const lineas = contenido.split('\n');
    const primeraLineaColumnas = lineas[0].split(',');
    return primeraLineaColumnas.length === 2;
 }
 
async function  buscarEnAPI(contenidoCSV){
    const lineas= contenidoCSV.split('\n');
    const paises=[]
    for (const i of lineas ){
        const columnas=i.split(",")
        const nombrePais=columnas[0].trim();
        const capitalcsv=columnas[1].trim();
        if (nombrePais=="NAME"){
            continue
        }
        console.log(nombrePais)
        const apiUrl = `https://restcountries.com/v3.1/name/${nombrePais}`;
        let data= await fetch (apiUrl)
        console.log(data.status)
        
        if (data.status==200){  
            
            data =await data.json()
            let capitalapi=data[0].capital[0]
            paises.push({
                nombrePais,capitalapi
                    })
        }
        else{
            let valida=false
            paises.push({nombrePais, capitalapi:"invalido"})

        }
}
        convertircsv(paises)
}
function convertircsv(paises){
        var nuevoCSV = [['NAME', 'capital']];
        paises.forEach(pais => {
          nuevoCSV.push([pais.nombrePais, pais.capitalapi]);
        });
        var nuevoCSVString = Papa.unparse(nuevoCSV);
        var blob = new Blob([nuevoCSVString], { type: 'text/csv;charset=utf-8;' });
        var link = document.createElement('a');
      if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'paises_validados.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

}
function procesarDatosAPI(data) {
        console.log(data);
}