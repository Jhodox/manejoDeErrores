# manejoDeErrores

### Función de suma de elementos de un array
~~~
function realizarOperacion(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError("[-] El argumento proporcionado no es un array.");
    }

    if (arr.length === 0) {
        throw new Error("[-] El array no puede estar vacío.");
    }

    //Retornar resultado
    return arr.reduce((a, b) => a + b, 0);
}
~~~

## try catch
Un bloque *try* Se usa para indicar que un bloque de código puede lanzar una excepción. Un bloque catch debe seguir siempre al bloque try para manejar los errores con eficacia.

Llamamos a la función `realizarOperacion()` dentro del bloque *try*, de esta forma en caso de que ocurra un error, el bloque *try* dejara de ejecutarse hasta el punto en el que ocurrio el error y el bloque *catch* atrapara el error que retorno la función y ejecutara el codigo dentro de este bloque. 

~~~
try {
    const resultado = realizarOperacion([]);
    console.log("Resultado de la operación:", resultado);
} catch (error) {
    console.error("[-] Se ha producido un error:", error.message);
} finally {
    console.log("Se termino de ejecutar la información")
}
~~~

También es posible añadir un bloque *finally* el cual se ejecutara sin importar que ocurra o no un error

## Thow
Se utiliza para lanzar errores y crear excepciones en el entorno de ejecución de JavaScript de forma manual. Es posible hacer thow a cualquier cosa.

> Podemos observar su utilización en la función `realizarOperacion()`

~~~
if (!Array.isArray(arr)) {
        throw new TypeError("[-] El argumento proporcionado no es un array.");
    }

    if (arr.length === 0) {
        throw new Error("[-] El array no puede estar vacío.");
    }
~~~

En caso de que el array esté vacío o parametro enviado no sea un array Simulamos un error en el que retornara el mensaje que asignamos

## Callback
Cuando utilizamos callbacks, el manejo de errores usando thow puede volverse complicado. Si alteramos un poco nuestras funciones de callback para que estas puedan procesar los errores esto puede ser beneficioso

#### Función Callback
~~~
function callback(error, result) {
    if (error !== null) {
        console.log(error);
        return;
    }
    console.log(result);
}
~~~

#### Suma de elementos adaptada a callbacks
~~~
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
~~~

Al momento de crear un error, este se arroja por medio del callback para que este lo procese en lugar de arrojarlo con thow

#### Ejemplo de como llamar a la función utilizando callback
~~~
try {
    realizarOperacionConCallback([], callback);
} catch (error) {
    console.log("[-] Error: ", e);
}
~~~

## Promesas
una promesa rechazada no termina tu script. Sin embargo, tienes que implementar un bloque catch para gestionar los errores en las promesas.

Para este ejemplo crearemos la siguiente promesa que esperar durante los milisegundos que especifiquemos en el parametro al momento de llamar a la promesa

~~~
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
~~~

>Funcion modificada para aceptar promesas
~~~
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
~~~

>Al llamar a la función que utiliza promesas NO tenemos que manejarlo de esta manera
~~~
try {
    realizarOperacionAsincrona([]).then((res) => console.log(res));
} catch (error) {
    console.log("[-] Error: ", error);
}
~~~

>Podemos eliminar el try catch y añadir la llamada a catch directamente en la funcion de la siguiente manera:
~~~
realizarOperacionAsincrona([])
    .then((res) => console.log(res))
    .catch((error) => console.log("[-] Error: ", error));
~~~