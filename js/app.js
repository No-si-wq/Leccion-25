const ingresos = [
    new Ingreso('Salario', 2100),
    new Ingreso('Venta coche', 1500)
]; 

const egresos = [
    new Egreso('Renta departamento', 900),
    new Egreso('Ropa', 400)
];

let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

//Suma el total de los ingresos
let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

//Suma el total de los egresos
let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();    
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());  
}

//Realiza el formato de las monedas
const formatoMoneda = (valor)=>{
    return valor.toLocaleString('es-US',{style:'currency', currency: 'USD', minimumFractionDigits:2});
}

//Calcula el porcentaje de los egresos
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}

const cargarIngresos = ()=> { //Carga cada uno de los ingresos de HTML
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}


const crearIngresoHTML = (ingreso)=> { //Crea un formulario de ingresos HTML
    let HTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                    onclick='eliminarIngresoPorId(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return HTML
}

const eliminarIngresoPorId = (id)=>{ //Elimina los ingresos
    let indiceEleminar = ingresos.findIndex (ingreso => ingreso.id === id);
    ingresos.splice(indiceEleminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = () => { //Carga cada uno de los egresos de HTML
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
} 

const crearEgresoHTML = (egreso)=>{ //Crea un formulario de egresos HTML
    let HTML = `
        <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                  <ion-icon name="close-circle-outline"
                  onclick='eliminarEgresoPorId(${egreso.id})'></ion-icon>
                </button>
             </div>
        </div>
    </div>
    `;
    return HTML;
}

const eliminarEgresoPorId = (id)=>{
    let indiceEleminar = egresos.findIndex (egreso => egreso.id === id);
    egresos.splice(indiceEleminar, 1);
    cargarCabecero();
    cargarEgresos();
}

let agregarDatoSegunTipo = ()=>{ //Agrega los datos segun sea el tipo
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma ["valor"];    
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}