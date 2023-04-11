## Función watch:
 Se usa para observar los cambios en loadMoreRef. 
 La función watch recibe dos argumentos: el valor que se va a observar y una función que se ejecutará cuando el valor observado cambie.

En este caso, loadMoreRef es el valor que se está observando. loadMoreRef es una referencia (ref) que apunta al elemento HTML utilizado para detectar si se ha llegado al final de la lista de contactos.

La función que se ejecuta cuando loadMoreRef cambia se define como:

```javascript
(newValue) => {
  if (newValue) {
    observer.observe(newValue)
  }
}
````

Cuando loadMoreRef cambia, la función recibe el nuevo valor en el parámetro newValue. Si newValue es un valor verdadero (no es null, undefined, etc.), se llama a la función observe del objeto observer, que es una instancia de Intersection Observer.

El propósito de este código es actualizar la observación del Intersection Observer cuando loadMoreRef cambia. De esta manera, el Intersection Observer puede continuar detectando cuando se llega al final de la lista de contactos y cargar más contactos cuando sea necesario.



##  Intersection Observer:
Creamos un Intersection Observer para detectar si se ha llegado al final de la lista de contactos y cargar más contactos en consecuencia. Vamos a analizar cada parte del código:

const loadMoreRef = ref(null): Se crea una referencia loadMoreRef e inicialmente se le asigna null. Esta referencia se utilizará para apuntar al elemento HTML que se emplea para detectar si se ha llegado al final de la lista.

const observer = new IntersectionObserver(...): Se crea una instancia de Intersection Observer llamada observer. La función de devolución de llamada (callback) recibe el parámetro entries, que contiene información sobre los elementos observados y su intersección. Si el primer elemento de entries (en este caso, entries[0]) está intersectando (es decir, es visible en la pantalla), se llama a la función loadMoreContacts del store para cargar más contactos.

onMounted(...): Este hook de ciclo de vida de Vue se ejecuta después de montar el componente. Dentro de esta función, si loadMoreRef.value tiene un valor verdadero (no es null, undefined, etc.), se llama a la función observe del objeto observer, pasándole loadMoreRef.value como argumento. Esto inicia la observación del elemento HTML apuntado por loadMoreRef.

watch(loadMoreRef, ...): Se utiliza la función watch de Vue para observar los cambios en loadMoreRef. Cuando loadMoreRef cambia, se ejecuta la función de devolución de llamada (callback) que recibe el nuevo valor en el parámetro newValue. Si newValue tiene un valor verdadero, se llama a la función observe del objeto observer, pasándole newValue como argumento. Esto actualiza la observación del elemento HTML apuntado por loadMoreRef.

En resumen, este código crea un Intersection Observer que detecta cuando se llega al final de la lista de contactos y carga más contactos si es necesario. Además, utiliza el hook onMounted y la función watch para iniciar y actualizar la observación del elemento HTML utilizado para la detección.