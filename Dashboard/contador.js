// Función para incrementar el contador de visitas en localStorage
function incrementarContador() {
    if (localStorage.getItem("contadorVisitas")) {
        // Si el contador ya existe en el almacenamiento local, se incrementa su valor
        var contador = parseInt(localStorage.getItem("contadorVisitas")) + 1;
        localStorage.setItem("contadorVisitas", contador);
    } else {
        // Si el contador no existe, se crea con un valor inicial de 1
        localStorage.setItem("contadorVisitas", 1);
    }
}

// Función para obtener el total de visitas desde localStorage
function obtenerTotalVisitas() {
    var totalVisitas = localStorage.getItem("contadorVisitas") || 0;
    return parseInt(totalVisitas);
}

// Función para obtener el día de la semana actual
function obtenerDiaSemanaActual() {
    var diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    var fechaActual = new Date();
    var diaSemanaActual = fechaActual.getDay();
    return diasSemana[diaSemanaActual];
}

// Función para incrementar el contador de visitas diarias en localStorage
function incrementarContadorDiario() {
    var diaActual = obtenerDiaSemanaActual();

    if (localStorage.getItem(diaActual)) {
        // Si el contador del día actual ya existe en el almacenamiento local, se incrementa su valor
        var contador = parseInt(localStorage.getItem(diaActual)) + 1;
        localStorage.setItem(diaActual, contador);
    } else {
        // Si el contador del día actual no existe, se crea con un valor inicial de 1
        localStorage.setItem(diaActual, 1);
    }
}

// Función para obtener el contador de visitas del día actual desde localStorage
function obtenerContadorDiario() {
    var diaActual = obtenerDiaSemanaActual();
    var contadorDiario = localStorage.getItem(diaActual) || 0;
    return parseInt(contadorDiario);
}

// Función para obtener los datos de visitas por día de la semana, incluyendo el contador del día actual
function obtenerVisitasPorDiaSemana() {
    var visitasPorDiaSemana = [];
    var diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    var diaActual = obtenerDiaSemanaActual();

    // Obtener los contadores de visitas almacenados en localStorage
    for (var i = 0; i < diasSemana.length; i++) {
        var contador = localStorage.getItem(diasSemana[i]) || 0;
        visitasPorDiaSemana.push(parseInt(contador));
    }

    // Actualizar el contador del día actual en el arreglo de visitas por día de la semana
    visitasPorDiaSemana[diasSemana.indexOf(diaActual)] = obtenerContadorDiario();

    return visitasPorDiaSemana;
}

// Función para generar el gráfico de barras y actualizar el total de visitas del día
function generarGraficoBarrasYTotalVisitasDia() {
    var visitasPorDiaSemana = obtenerVisitasPorDiaSemana();

    // Obtener el elemento del documento donde se mostrará el gráfico
    var ctx = document.getElementById("grafico-barras").getContext("2d");

    // Crear el objeto de configuración del gráfico
    var config = {
        type: "bar",
        data: {
            labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
            datasets: [
                {
                    label: "Visitas por día de la semana",
                    data: visitasPorDiaSemana,
                    backgroundColor: "rgba(54, 162, 235, 0.5)", // Color de fondo de las barras
                    borderColor: "rgba(54, 162, 235, 1)", // Color del borde de las barras
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 10
                }
            }
        }
    };

    // Crear el gráfico utilizando Chart.js
    new Chart(ctx, config);

    // Obtener el elemento del documento donde se mostrará el total de visitas del día
    var totalVisitasDiaElement = document.getElementById("total-visitas-dia");

    // Actualizar el total de visitas del día en el HTML
    var totalVisitasDia = obtenerContadorDiario();
    totalVisitasDiaElement.textContent = totalVisitasDia;
}

// Llamar a la función correspondiente según la página actual
if (document.title === "Dashboard") {
    window.onload = function() {
        document.getElementById("total-visitas").innerText = "Total de visitas: " + obtenerTotalVisitas();
        generarGraficoBarrasYTotalVisitasDia();
    };
} else if (document.title === "Pagina Principal") {
    incrementarContador();
    incrementarContadorDiario();
    generarGraficoBarrasYTotalVisitasDia();
}