// Uso de try...catch para manejar errores
try {
    // const resultado = realizarOperacion([]);
} catch (error) {
    console.error("[-] Se ha producido un error:", error.message);
} finally {
    console.log("Se termino de ejecutar la información");
}

// Función que simula una operación que puede fallar
function realizarOperacion(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError("[-] El argumento proporcionado no es un array");
    }

    // Simulamos un error si el array está vacío
    if (arr.length === 0) {
        throw new Error("[-] El array no puede estar vacío.");
    }

    // Retornar resultado
    return arr.reduce((a, b) => a + b, 0);
}

setTimeout(function () {
    // realizarOperacion("cadena");
}, 1000);

// CALLBACK
function callback(error, result) {
    if (error !== null) {
        console.log(error);
        return;
    }
    console.log(result);
}

// Función que simula una operación que puede fallar
function realizarOperacionConCallback(arr) {
    if (!Array.isArray(arr)) {
        callback(
            new TypeError("[-] El argumento proporcionado no es un array")
        );
    }

    // Simulamos un error si el array está vacío
    if (arr.length === 0) {
        callback(new TypeError("[-] El array no puede estar vacío."));
    }

    // Operación exitosa: calculamos la suma de los elementos del array
    callback(
        null,
        arr.reduce((a, b) => a + b, 0)
    );
}

try {
    realizarOperacionConCallback([], callback);
} catch (error) {
    console.log("[-] Error: ", e);
}

try {
    // realizarOperacionConCallback("Cadena", callback);
} catch (error) {
    console.log("[-] Error: ", error);
}

// PROMESAS
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function realizarOperacionAsincrona(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError("[-] El argumento proporcionado no es un array");
    }

    // Simulamos un error si el array está vacío
    if (arr.length === 0) {
        throw new Error("[-] El array no puede estar vacío.");
    }

    await delay(3000);
    // Retornar resultado
    return arr.reduce((a, b) => a + b, 0);
}

realizarOperacionAsincrona([])
    .then((res) => console.log(res))
    .catch((error) => console.log("[-] Error: ", error));
