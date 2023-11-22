const inputs = [];

class Objx {
    constructor() {
        this.valor = "";
    }
}

let rojo = 0;
let verde = 0;
let azul = 0;

function Contar() {
    rojo = 0;
    verde = 0;
    azul = 0;

    inputs.forEach(color => {
        color.valor = color.valor.toLowerCase().trim();
        if (color.valor === "rojo") {
            rojo++;
        }
        if (color.valor === "verde") {
            verde++;
        }
        if (color.valor === "azul") {
            azul++;
        }
    });

    updateCounts();
}

function updateCounts() {
    const rojoElement = document.getElementById('rojo');
    const verdeElement = document.getElementById('verde');
    const azulElement = document.getElementById('azul');

    rojoElement.textContent = rojo;
    verdeElement.textContent = verde;
    azulElement.textContent = azul;
}

function clasecss(color) {
    if (color === "rojo") {
        return "bg-danger";
    }
    if (color === "verde") {
        return "bg-success";
    }
    if (color === "azul") {
        return "bg-primary";
    }
    return "";
}

function saveToLocalStorage() {
    localStorage.setItem('colorInputs', JSON.stringify(inputs));
}

function loadFromLocalStorage() {
    const storedInputs = localStorage.getItem('colorInputs');
    if (storedInputs) {
        const parsedInputs = JSON.parse(storedInputs);
        inputs.forEach((color, index) => {
            color.valor = parsedInputs[index].valor;
        });
        updateInputValues();
    }
}

function updateInputValues() {
    inputs.forEach((color, index) => {
        const inputElement = document.getElementById(`input_${index}`);
        inputElement.value = color.valor;
        inputElement.className = ""; // clear existing classes
        const newClass = clasecss(color.valor);
        if (newClass) {
            inputElement.classList.add(newClass);
        }
    });
    Contar();
}

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const colorInputs = document.getElementById('colorInputs');
    const guardarBtn = document.getElementById('guardarBtn');

    for (let x = 0; x < 20; x++) {
        inputs.push(new Objx());
    }

    inputs.forEach((color, index) => {
        const inputElement = document.createElement('input');
        inputElement.setAttribute('style', 'margin:5px;');
        inputElement.setAttribute('id', `input_${index}`);
        inputElement.addEventListener('input', () => {
            color.valor = inputElement.value;
            inputElement.className = ""; 
            const newClass = clasecss(color.valor);
            if (newClass) {
                inputElement.classList.add(newClass);
            }
            Contar();
            saveToLocalStorage();
        });
        colorInputs.appendChild(inputElement);
    });

    guardarBtn.addEventListener('click', () => {
       
        saveToLocalStorage();
    });

    
    loadFromLocalStorage();

    
    updateInputValues();
});
