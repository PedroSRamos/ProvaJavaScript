const inputIds = ['KMatual', 'KMant', 'lts'];

const start = () => {
    document.getElementById("button").onclick = checkNulls
}

const checkNulls = () => {
    const KMatual = document.getElementById("KMatual").value
    const KMant = document.getElementById("KMant").value
    const lts = document.getElementBtId("lts").value

    if (!KMatual && !KMant && !lts) {
        document.getElementById("mensagem").innerHTML = 'Obrigatório preencher todos os campos!'
    } else if (!KMant) {
        document.getElementById("mensagem").innerHTML = 'Campo KM Anterior deve ser preenchido!'
    } else if (!KMatual) {
        document.getElementById("mensagem").innerHTML = 'Campo de KM Atual deve ser preenchido!'
    } else if (!lts) {
        document.getElementById("mensagem").innerHTML = 'Campo de Litros deve ser preenchido!'
    }
}





start()