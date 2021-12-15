var lineIndexToEdit = -1;
var indexEditingcombust = null;
var inputIds = ['kmatual', 'kmanterior', 'litros'];
var combusts = [];

start();

function start() {
    var btn = document.getElementById('addBtn');
    btn.onclick = function() {
        addNewKM();
    };
}

function addNewKM() {
    if (isAllFieldsValid()) {
        var combust = getcombustObject();
        
        var index = getcombustIndexByLitros(combust.litros);
        if (index > -1 && index !== indexEditingcombust) {
            alert('litros não pode ser repetido!');
            return;
        }

        if (lineIndexToEdit === -1) {
            combusts.push(combust);
            
        } else {
            updatecombust(combust);
        }
        
        saveInLocalStorage();
        clearTableData();
        populateTableData();
        clearFields();
        lineIndexToEdit = -1;
    }
}

function getcombustObject() {
    var inputKmatual = document.getElementById('kmatual');
    var inputKmanterior = document.getElementById('kmanterior');
    var inputLitros = document.getElementById('litros');

    return {
        kmatual: inputKmatual.value,
        kmanterior: inputKmanterior.value,
        litros: inputLitros.value
    };
}

function clearTableData() {
    var tbody = getTbody();
    tbody.innerHTML = '';
}

function populateTableData() {
    var tbody = getTbody();
    
    for (var i = 0; i < combusts.length; i++) {
        var tr = document.createElement('tr');
        var combust = combusts[i];
        tr.appendChild(createColumn(combust.kmatual));
        tr.appendChild(createColumn(combust.kmanterior));
        tr.appendChild(createColumn(combust.litros));
        createButtonColumns(tr);
        tbody.appendChild(tr);
    }
}

function editExistLine() {
    var tbody = getTbody();
    var tr = tbody.children[lineIndexToEdit - 1];

    for (var i = 0; i < inputIds.length; i++) {
        var input = document.getElementById(inputIds[i]);
        tr.children[i].innerHTML = input.value;
    }
}

/*
function createButtonColumns(tr) {
    var buttonsContent = ['Editar', 'Excluir'];

    for (var i = 0; i < buttonsContent.length; i++) {
        tr.appendChild(createButtonColumn(buttonsContent[i]));
    }
*/

function createButtonColumn(content) {
    var td = document.createElement('td');
    var input = document.createElement('input');
    input.type = 'button';
    input.value = content;
    if (content === 'Excluir') {
        input.onclick = removeLine;
    } else if (content === 'Editar') {
        input.onclick = editLine;
    }

    td.appendChild(input);
    return td;
}

function editLine() {
    var td = this.parentNode;
    var tr = td.parentNode;
    lineIndexToEdit = tr.rowIndex;
    
    for (var i = 0; i < inputIds.length; i++) {
        var input = document.getElementById(inputIds[i]);
        input.value = tr.children[i].innerHTML;
    }

    var litros = tr.children[2].innerHTML;
    indexEditingcombust = getcombustIndexByLitros(litros);
}

function removeLine() {
    var td = this.parentNode;
    var tr = td.parentNode;
    var litros = tr.children[2].innerHTML;
    var tbody = getTbody();
    tbody.removeChild(tr);
    removecombustFromArray(litros);
    checkEmptyTable();
}

function createColumn(content) {
    var td = document.createElement('td');
    var textNode = document.createTextNode(content);
    td.appendChild(textNode);
    return td;
}

function addNewLineInTable(newTr) {
    var tbody = getTbody();
    if (tbody.children.length % 2 === 0) {
        newTr.style.backgroundColor = 'lightGray';
    } else {
        newTr.style.backgroundColor = 'darkGray';
    }
    tbody.appendChild(newTr);
}

function isAllFieldsValid() {
    var allFieldsValid = true;

    for (var i = 0; i < inputIds.length; i++) {
        var id = inputIds[i];
        var input = document.getElementById(id);
        if (input.value.trim() === '') {
            if (allFieldsValid) {
                input.focus();
            }
            allFieldsValid = false;
            showMessageField(id);
        } else {
            hideMessageField(id);
        }
    }

    return allFieldsValid;
}

function showMessageField(inputId) {
    var element = getSpanErrorElement(inputId);
    element.className = element.className.replace('hide', '').trim();
}

function hideMessageField(inputId) {
    var element = getSpanErrorElement(inputId);
    if (element.className.indexOf('hide') === -1) {
        element.className = element.className + ' hide';
    }
}

function getSpanErrorElement(inputId) {
    return document.getElementById(inputId + 'Error');
}

function clearFields() {
    for (var i = 0; i < inputIds.length; i++) {
        var input = document.getElementById(inputIds[i]);
        input.value = '';
        if (i === 0) {
            input.focus();
        }
    }
}

function removeEmptyLine() {
    var line = document.getElementById('emptyLine');
    if (line) {
        var tbody = getTbody();
        tbody.removeChild(line);
    }
}

function getTbody() {
    var table = document.getElementById('KM');
    return table.tBodies[0];
}

        function Calcula_Kmlitro(Frm1) {
            Frm1.kmlitro.value = (parseFloat(Frm1.kmatual.value) - parseFloat(Frm1.kmanterior.value)) / parseFloat(Frm1.litros.value);
            return (true);
        }

function updatecombust(combust) {
    var oldcombust = combusts[indexEditingcombust];
    oldcombust.kmatual = combust.kmatual;
    oldcombust.kmanterior = combust.kmanterior;
    oldcombust.litros = combust.litros;
}

function getcombustIndexByLitros(litros) {
    return combusts.findIndex(function(element) {
        return element.litros === litros;
    });
}

function saveInLocalStorage() {
    var combustToBeSave = JSON.stringify(combusts);
    localStorage.setItem('combusts', combustToBeSave);
}

window.onload = function() {
    loadDataFromLocalStorage();
};

function loadDataFromLocalStorage() {
    var combustStr = localStorage.getItem('combusts');
    if (combustStr) {
        combusts = JSON.parse(combustStr);
        clearTableData();
        populateTableData();
    }
}