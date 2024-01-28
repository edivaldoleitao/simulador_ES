var listRequest = []
var listSetores = []
var tempoTotal=0

function addRequest() {
    
    let table = document.getElementById('idRequestTable')
    let bloco = document.getElementById('idSetorBloco').value
    let interval = document.getElementById('idSetorInterval').value
    let cilindro = Math.floor(bloco/interval) 
    
    var elemento = {
        setor: bloco,
        cilindro: cilindro,
        time:0
    }
 
    
    if (checkSetor(elemento)) {
        listRequest.push(elemento)
        let row = document.createElement("tr")
        row.setAttribute("id", "setor" + bloco)

        let rgb1 = Math.floor(Math.random() * 100)
        let rgb2 = Math.floor(Math.random() * 100)
        let rgb3 = Math.floor(Math.random() * 100)

        let cor = "rgb( " + rgb1 + ", " +rgb2 + " ," + rgb3 +")"
        row.style.backgroundColor= cor;
        let tdBloco = document.createElement("td")
        tdBloco.innerHTML = bloco
        tdBloco.style.color = 'white'
        let tdCilindro = document.createElement("td")
        tdCilindro.innerHTML = cilindro
        tdCilindro.style.color = 'white'

        row.appendChild(tdBloco)
        row.appendChild(tdCilindro)
        table.appendChild(row)
    }
   
}

function setInitial() {
    let bloco = document.getElementById('idSetorBloco')
    let interval = document.getElementById('idSetorInterval')
    let header = document.getElementById('idHeader')

    bloco.value = 0
    interval.value = 14
    header.value = 0
}

function checkSetor(param) {
    let result=true

   for (let index = 0; index < listRequest.length; index++) {
    const element = listRequest[index];
    if (element.setor == param.setor) {
        result = false
        break
    }
   }
    return result
}

function compare( a, b ) {
    if ( a.setor < b.setor ){
      return -1;
    }
    if ( a.setor > b.setor ){
      return 1;
    }
    return 0;
}

function simular() {
    
    let interval = document.getElementById('idSetorInterval').value
    let indexHeader = document.getElementById('idHeader').value
    let lista = [...listRequest] //cópia do array
    lista.sort((a, b) => parseInt(a.setor) - parseInt(b.setor))

    for (let index = 0; index < lista.length; index++) {
        const element = lista[index];
        
        if (index < indexHeader ) {
            element.time = ((parseInt(interval)) - parseInt(lista[lista.length-1].setor)) + 1
        }
        else if (index == indexHeader){
            element.time = 0
        }
        else {
            element.time = parseInt(element.setor) - parseInt(lista[index-1].setor)
        }
        tempoTotal += element.time
    }
     
    for (let index = indexHeader; index <= lista.length; index++) {
        
       let elemento = lista.splice(indexHeader,1)
       elemento = elemento[0]
       listSetores.push(elemento)
    }  

    if (lista.length > 0) {
        for (let index = lista.length-1; index >= 0; index--) {

            let elemento = lista.splice(index,1)
            elemento = elemento[0]
            listSetores.push(elemento)        
        }
    }

    fillSector(listSetores) 
    alert('tempo total: ' + tempoTotal + 'U.T')
}

function fillSector(setores) {
    let table = document.getElementById('idSeqBlocos')
    let row = document.createElement('tr') 

    for (let index = 0; index < setores.length; index++) {
        const element = setores[index];
        let tdBloco = document.createElement("td")
        tdBloco.setAttribute('title',"intervalo de tempo: " + element.time + 'U.T')
        tdBloco.innerHTML = element.setor

        setInterval(() => {
            row.appendChild(tdBloco)
            table.appendChild(row)
        }, 1000)
        
    }
}



//criar função com setinterval para adicionar td dinamicamente e visualizar o preenchimento

setInitial()
