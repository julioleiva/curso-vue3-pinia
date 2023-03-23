## JavaScript esencial para usar en VUE

Para utilizar Vue3 con Composition API y ```<script setup>```, es necesario tener una comprensión básica de JavaScript y la sintaxis de Vue. A continuación se detallan los principales conceptos de JavaScript que se necesitan para utilizar Vue3 con Composition API y ```<script setup>```:

**Declaración de variables y constantes**: Se utilizan para almacenar datos. En Vue3, se recomienda utilizar constantes para las variables reactivas.

**Funciones**: Se utilizan para ejecutar acciones y realizar cálculos. Las funciones son necesarias para definir los hooks de Vue, como onMounted y watchEffect.

**Arrow functions**: Son una forma abreviada de definir funciones en JavaScript. Son especialmente útiles para definir funciones en línea, como en los hooks de Vue.

**Objetos**: Son estructuras de datos que se utilizan para almacenar información. En Vue3, se utilizan objetos para definir el estado del componente.

**Spread operator**: Es una sintaxis que se utiliza para expandir un objeto o una matriz en un nuevo objeto o matriz. En Vue3, se utiliza el spread operator para combinar múltiples objetos y proporcionar propiedades a los componentes.

**Destructuring**: Es una sintaxis que se utiliza para extraer propiedades de un objeto o elementos de una matriz en variables separadas. En Vue3, se utiliza la destructuración para acceder a las propiedades del estado del componente.

**Importación y exportación de módulos**: Es una sintaxis que se utiliza para importar y exportar código de otros archivos. En Vue3, se utilizan las importaciones y exportaciones para modularizar el código y facilitar su reutilización.

**Template literals**: Es una sintaxis que se utiliza para definir cadenas de texto con interpolación de variables. En Vue3, se utilizan los template literals para definir los templates de los componentes.

Con estos conceptos básicos de JavaScript en mente, podemos empezar a utilizar Vue3 con Composition API y ```<script setup>```. Para ello, se debe escribir el código en un archivo .vue y utilizar la siguiente sintaxis:

```js
<template>
  <!-- El template del componente -->
</template>

<script setup>
  // Aquí se define el estado del componente y los hooks
</script>
````

Dentro de la sección ```<script setup>```, se pueden definir las variables reactivas, los hooks de Vue y las funciones del componente. Por ejemplo:

```js
<template>
  <button @click="increment">
    +
  </button>
  <div>{{ count }}</div>
</template>

<script setup>
  import { ref, onMounted, watchEffect } from 'vue'

  const count = ref(0)

  function increment() {
    count.value++
  }

  onMounted(() => {
    console.log('El componente se ha montado')
  })

  watchEffect(() => {
    console.log(`El contador tiene el valor ${count.value}`)
  })

</script>
````

En este ejemplo, se importa la función ref de Vue y se utiliza para definir la variable count como una variable reactiva con valor inicial 0. Luego, se define la función increment que incrementa el valor de count. Además, se utilizan los hooks de Vue onMounted y watchEffect para imprimir mensajes en la consola cuando el componente se monta y cuando count cambia de valor.

## Sitios de interés

### [Documentación Oficial](https://vuejs.org/guide/introduction.html)
### [Playgound SFC](https://sfc.vuejs.org/)
### [Vue DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=es) 

## Explicación básica de la diferencia entre Composition API y Options API(Seguiremos incidiendo en esto)

Vue.js es un framework de JavaScript que ofrece varias opciones para la definición de componentes. En particular, existen dos formas principales de definir componentes en Vue: mediante la Options API y mediante la Composition API con script setup.

La Options API es la forma "tradicional" de definir componentes en Vue. En este enfoque, se define un objeto de opciones que especifica las propiedades, métodos, hooks de ciclo de vida y otros detalles del componente. Por ejemplo, aquí hay un ejemplo de un componente de Vue definido utilizando la Options API:

```js
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      message: '¡Hola, mundo!'
    }
  }
}
</script>
```

Por otro lado, la Composition API con script setup es una forma más moderna y flexible de definir componentes en Vue. En lugar de definir un objeto de opciones, el componente se define como una función que utiliza una serie de "hooks" para especificar las propiedades, métodos, hooks de ciclo de vida y otros detalles del componente. Aquí hay un ejemplo de cómo se define un componente utilizando la Composition API con script setup:

```js
<template>
  <div>{{ message }}</div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('¡Hola, mundo!');

</script>
```

En este ejemplo, la sintaxis ```<script setup>``` se utiliza para definir el estado del componente mediante la creación de un objeto reactivo utilizando la función ```ref()```


La sintaxis ```<script setup>``` es una forma más concisa y legible de definir componentes en Vue. Permite definir el estado, las propiedades computadas, los métodos y los hooks de ciclo de vida en una sección de código separada, lo que hace que el código sea más fácil de leer y mantener. Además, la sintaxis ```<script setup>``` se integra bien con las herramientas de compilación modernas como Vite y permite la carga diferida de código para una mejor eficiencia del rendimiento.

Una de las principales ventajas de la Composition API con script setup es que permite una mejor organización del código y una reutilización más fácil de la lógica del componente. Además, la Composition API facilita la creación de componentes más pequeños y modulares, lo que puede mejorar el rendimiento y la capacidad de mantenimiento de la aplicación.

En resumen, la Options API es una forma más tradicional de definir componentes en Vue, mientras que la Composition API con script setup es una forma más moderna y flexible. La Composition API facilita la reutilización del código y la organización del mismo, lo que puede hacer que el desarrollo de componentes sea más fácil y rápido.

Vue3 admite las dos APIs, aunque es aconsejable usar la Composition API.

# Aspectos fundamentales en VUE

## Sintaxis de plantilla

### Text Interpolation

La forma más básica de vinculación de datos es la interpolación de texto utilizando la sintaxis "Mustache" (llaves dobles):

```js
<script setup>
import { ref } from 'vue'

const firtsName = "Lebron"
const lastName = "James"

</script>

<template>
<p>Name: {{ firtsName }}</p>
<p>Last: {{ lastName }}</p>


</template>
```

La etiqueta mustache se sustituirá por el valor de las propiedades de la instancia del componente correspondiente. También se actualizará cada vez que cambie la propiedad msg (Reactividad)

### Attribute Bindings
Enlaces de atributos

La etiqueta mustache no pueden utilizarse dentro de atributos HTML. En su lugar, usamos una **directiva v-bind**:

```js
<script setup>
import { ref } from 'vue'
const dynamicId = ref('my_id')

</script>

<template>
<div :id="dynamicId"></div>
</template>
``` 

La **directiva** v-bind indica a Vue que mantenga el atributo id del elemento sincronizado con la propiedad dynamicId del componente. Si el valor vinculado es nulo o indefinido, el atributo se eliminará del elemento renderizado.

### Atributos booleanos
Los atributos booleanos son atributos que pueden indicar valores verdadero / falso mediante su presencia en un elemento. Por ejemplo, disabled es uno de los atributos booleanos más utilizados.

v-bind funciona de forma un poco diferente en este caso:

```js
<script setup>
import { ref } from 'vue'
const isButtonDisabled = ref(true)

</script>

<template>
<button :disabled="isButtonDisabled">Button</button>
</template>
```

El atributo disabled se incluirá si isButtonDisabled tiene un valor verdadero. También se incluirá si el valor es una cadena vacía, manteniendo la coherencia con <button disabled="">. Para otros valores falsos, el atributo se omitirá.

### Uso de expresiones JavaScript

Hasta ahora sólo hemos estado vinculando a simples claves de propiedad en nuestras plantillas. Pero Vue realmente soporta todo el poder de las expresiones JavaScript dentro de todos los enlaces de datos:

```js
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

Estas expresiones se evaluarán como JavaScript en el ámbito de datos de la instancia actual del componente.

En las plantillas Vue, las expresiones JavaScript pueden utilizarse en las siguientes posiciones:

1) Dentro de interpolaciones de texto (moustaches)
2)En el valor de atributo de cualquier directiva Vue (atributos especiales que empiezan por v-)

### Sólo expresiones
Cada enlace sólo puede contener una única expresión. Una expresión es un fragmento de código que puede evaluarse para obtener un valor. Una simple comprobación es si se puede utilizar después del retorno.

Por lo tanto, lo siguiente NO funcionará:

```js
<!-- esto es un stament(afirmación), no una expresión: -->
{{ var a = 1 }}

<!-- el control de flujo tampoco funcionará, debemos usar expresiones ternarias -->
{{ if (ok) { return message } }}
```

## Directivas
Las directivas son atributos especiales con el prefijo v-. Vue proporciona una serie de directivas incorporadas, incluyendo v-html y v-bind que hemos visto antes.

Se espera que los valores de los atributos de las directivas sean expresiones JavaScript simples (con la excepción de v-for, v-on y v-slot, que veremos más adelante). El trabajo de una directiva es aplicar reactivamente actualizaciones al DOM cuando cambia el valor de su expresión. Tomemos v-if como ejemplo:

```js
<script setup>
import { ref } from 'vue'
const seen = ref(true)

</script>

<template>
<p v-if="seen">Me ves</p>
<p >{{ seen ? 'Me ves' : 'No me ves'}}</p>

</template>
```
  
# Reactividad  

## Declarando el Estado Reactivo
Podemos crear un objeto o array reactivo con la función reactive():

```js
import { reactive } from 'vue
const state = reactive({ count: 0 })
```


Los objetos reactivos son proxies de JavaScript y se comportan igual que los objetos normales. La diferencia es que Vue es capaz de rastrear el acceso a las propiedades y las mutaciones de un objeto reactivo.


```js
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```  

## Tiempo de actualización del DOM
Cuando se muta el estado reactivo, el DOM se actualiza automáticamente. Sin embargo, debe tenerse en cuenta que las actualizaciones del DOM no se aplican de forma sincrónica. En su lugar, Vue las almacena hasta el "siguiente tick" en el ciclo de actualización para asegurar que cada componente se actualiza sólo una vez sin importar cuántos cambios de estado hayas hecho.

Para esperar a que se complete la actualización del DOM después de un cambio de estado, puedes utilizar la API global nextTick():

```js
<script setup>
import { reactive, nextTick } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
  nextTick(() => {
    console.log(state.count)
  })
}

</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```
  
  
## Reactividad Profunda
En Vue, el estado es “profundamente" reactivo por defecto. Esto significa que puedes esperar que los cambios sean detectados incluso cuando mutes objetos anidados o arrays:

```js
<script setup>
import { reactive } from 'vue'

const obj = reactive({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  obj.nested.count++
  obj.arr.push('baz')
}

</script>

<template>
  <button @click="mutateDeeply">
    Cambiar
  </button>
  <div>
    {{obj.nested.count}}
  </div>
  <div>
    {{obj.arr}}
  </div>
</template>
```
  
También es posible crear explícitamente objetos reactivos superficiales en los que la reactividad sólo se rastrea en el nivel raíz, pero normalmente sólo se necesitan en casos de uso avanzados.

### Reactive Proxy vs. Original
Es importante tener en cuenta que el valor devuelto por reactive() es un Proxy del objeto original, que no es igual al objeto original:

```js
const raw = {}
const proxy = reactive(raw)

// proxy NO es igual al original.
console.log(proxy === raw) // false
```

Sólo el proxy es reactivo - mutar el objeto original no desencadenará actualizaciones. Por lo tanto, la mejor práctica cuando se trabaja con el sistema de reactividad de Vue es utilizar exclusivamente las versiones proxy de su estado.

Para asegurar un acceso consistente al proxy, llamar a reactive() sobre el mismo objeto siempre devuelve el mismo proxy, y llamar a reactive() sobre un proxy existente también devuelve ese mismo proxy:

```js
// calling reactive() on the same object returns the same proxy
console.log(reactive(raw) === proxy) // true

// calling reactive() on a proxy returns itself
console.log(reactive(proxy) === proxy) // true
```

Esta regla se aplica también a los objetos anidados. Debido a la reactividad profunda, los objetos anidados dentro de un objeto reactivo también son proxies:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```  
  
### Limitaciones de reactive()
La API reactive() tiene dos limitaciones:

Sólo funciona para tipos de objeto (objetos, matrices y tipos de colección como Map y Set). No puede manejar tipos primitivos como string, number o boolean.

Dado que el seguimiento de la reactividad de Vue funciona sobre el acceso a propiedades, debemos mantener siempre la misma referencia al objeto reactivo. Esto significa que no podemos "reemplazar" fácilmente un objeto reactivo porque se pierde la conexión de reactividad con la primera referencia:
Since Vue's reactivity tracking works over property access, we must always keep the same reference to the reactive object. This means we can't easily "replace" a reactive object because the reactivity connection to the first reference is lost:

```js
let state = reactive({ count: 0 })

// la referencia anterior ({ count: 0 }) ya no se rastrea (¡se ha perdido la conexión de reactividad!)
state = reactive({ count: 1 })
```  

También significa que cuando asignemos o desestructuremos una propiedad de un objeto reactivo en variables locales, o cuando pasemos esa propiedad a una función, perderemos la conexión de reactividad:

```js
const state = reactive({ count: 0 })

// n es una variable local desconectada
// from state.count.
let n = state.count
// does not affect original state
n++

// count también está desconectado de state.count.
let { count } = state
// no afecta al estado original
count++

// la función recibe un número plano y
// no podrá seguir los cambios en state.count
callSomeFunction(state.count)
```  

### Reactive Variables with ref()
Para hacer frente a las limitaciones de reactive(), Vue también proporciona una función ref() que nos permite crear "refs" reactivas que pueden contener cualquier tipo de valor:

```js
import { ref } from 'vue'

const count = ref(0)
```  

ref() toma el argumento y lo devuelve envuelto dentro de un objeto ref con una propiedad .value:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

Al igual que las propiedades de un objeto reactivo, la propiedad .value de una ref es reactiva. Además, cuando contiene tipos de objeto, ref convierte automáticamente su .value con reactive().

Una ref que contenga un valor de objeto puede sustituir reactivamente al objeto completo:

```js
const objectRef = ref({ count: 0 })

// esto funciona de forma reactiva
objectRef.value = { count: 1 }
```
  
Las referencias también pueden pasarse a funciones o desestructurarse a partir de objetos planos sin perder reactividad:

```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// la función recibe una ref
// necesita acceder al valor a través de .value pero
// conservará la conexión de reactividad
callSomeFunction(obj.foo)

// todavía reactivo
const { foo, bar } = obj
```  

En otras palabras, ref() nos permite crear una "referencia" a cualquier valor y pasarla sin perder reactividad. Esta capacidad es bastante importante, ya que se utiliza con frecuencia cuando se extrae la lógica en Composable Functions.

## Ref Unwrapping en plantillas
Cuando se accede a las refs como propiedades de nivel superior en la plantilla, se "desenvuelven" automáticamente, por lo que no es necesario utilizar .value. Aquí está el ejemplo del contador anterior, utilizando ref() en su lugar:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }} <!-- no .value needed -->
  </button>
</template>
```

Ten en cuenta que el "desenvolvimiento" sólo se aplica si la referencia es una propiedad de nivel superior en el contexto de representación de la plantilla. Por ejemplo, object es una propiedad de nivel superior, pero object.foo no lo es.

Por lo tanto, dado el siguiente objeto:

```js
const object = { foo: ref(1) }
```  

The following expression will NOT work as expected:

```js
{{ object.foo + 1 }}
```
 
El resultado renderizado será [objet Object] porque object.foo es un objeto ref. Podemos solucionarlo haciendo que foo sea una propiedad de nivel superior:

```js
const { foo } = object

{{ foo + 1 }}
``` 
  
Ahora el resultado del renderizado será 2.

Una cosa a tener en cuenta es que una referencia también se desenvolverá si es el valor final evaluado de una interpolación de texto (es decir, una etiqueta {{ }}), por lo que lo siguiente se representará 1:

```js
{{ object.foo }}
```  

Esto es sólo una característica de conveniencia de la interpolación de texto y es equivalente a {{ object.foo.value }}.

## Ref Unwrapping en Objetos Reactivos
Cuando se accede a una referencia o se muta como una propiedad de un objeto reactivo, también se desenvuelve automáticamente para que se comporte como una propiedad normal:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
``` 
  
Si se asigna una nueva referencia a una propiedad vinculada a una referencia existente, ésta sustituirá a la anterior:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// original ref is now disconnected from state.count
console.log(count.value) // 1
```  
  
Ref unwrapping only happens when nested inside a deep reactive object. It does not apply when it is accessed as a property of a shallow reactive object.

## Ref Unwrapping en Arrays y Colecciones
A diferencia de los objetos reactivos, no se realiza ningún desenvolvimiento cuando se accede a la referencia como elemento de una matriz reactiva o de un tipo de colección nativa como Map:

```js
const books = reactive([ref('Vue 3 Guide')])
// necesita .value aquí
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
necesita .value aquí
console.log(map.get('count').value)
```

# Propiedades computadas (calculadas) Computed Properties

Las expresiones en las plantillas son muy convenientes, pero están destinadas a operaciones simples. Colocar demasiada lógica en las plantillas puede hacerlas voluminosas y difíciles de mantener. Por ejemplo, si tenemos un objeto con una matriz anidada:

```js
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Guía avanzada',
    'Vue 3 - Guía básica',
    'Vue 4 - El misterio'
  ]
})
```
  
Y queremos mostrar diferentes mensajes según si el autor ya tiene algunos libros o no:

```html
<p>Tiene libros publicados:</p>
<span>{{ author.books.length > 0 ? 'Sí' : 'No' }}</span>
```

En este punto, la plantilla se está volviendo un poco desordenada. Tenemos que mirarla durante un segundo antes de darnos cuenta de que realiza un cálculo según author.books. Más importante aún, probablemente no queremos repetirnos si necesitamos incluir este cálculo en la plantilla más de una vez.

Es por eso que para la lógica compleja que incluye datos reactivos, se recomienda utilizar una propiedad computada. Aquí está el mismo ejemplo, refactorizado:

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Guía avanzada',
    'Vue 3 - Guía básica',
    'Vue 4 - El misterio'
  ]
})

// una referencia calculada
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Sí' : 'No'
})
</script>

<template>
  <p>Tiene libros publicados:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

Aquí hemos declarado una propiedad calculada publishedBooksMessage. La función computed() espera recibir una función getter, y el valor devuelto es una referencia calculada. Al igual que las referencias normales, puede acceder al resultado calculado como publishedBooksMessage.value. Las referencias calculadas también se desempaquetan automáticamente en las plantillas, por lo que puede hacer referencia a ellas sin .value en las expresiones de la plantilla.

Una propiedad calculada hace un seguimiento automático de sus dependencias reactivas. Vue es consciente de que el cálculo de publishedBooksMessage depende de author.books, por lo que actualizará cualquier enlace que dependa de publishedBooksMessage cuando author.books cambie.

## Caché de propiedades calculadas frente a métodos
Es posible que haya notado que podemos lograr el mismo resultado invocando un método en la expresión:

```html
<p>{{ calculateBooksMessage() }}</p>
```
  
```js
// en el componente
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Sí' : 'No'
}
```

En lugar de una propiedad calculada, podemos definir la misma función como un método. Para el resultado final, los dos enfoques son exactamente iguales. Sin embargo, la diferencia es que las propiedades calculadas se almacenan en caché en función de sus dependencias reactivas. Una propiedad calculada solo se volverá a evaluar cuando alguna de sus dependencias reactivas haya cambiado. Esto significa que mientras author.books no haya cambiado, múltiples accesos a publishedBooksMessage devolverán inmediatamente el resultado calculado previamente sin tener que ejecutar la función getter de nuevo.

Esto también significa que la siguiente propiedad calculada nunca se actualizará, porque Date.now() no es una dependencia reactiva:

```js
const now = computed(() => Date.now())
```

En comparación, una llamada a método siempre ejecutará la función cada vez que se produzca un nuevo renderizado.

¿Por qué necesitamos caché? Imagina que tenemos una propiedad calculada costosa llamada list, que requiere recorrer una matriz enorme y hacer muchos cálculos. Luego podemos tener otras propiedades calculadas que, a su vez, dependen de list. ¡Sin caché, estaríamos ejecutando el getter de list muchas más veces de lo necesario! En casos en los que no se desee caché, utiliza una llamada a método en su lugar.

### Propiedades calculadas editables
Las propiedades calculadas son por defecto de solo lectura. Si intentas asignar un nuevo valor a una propiedad calculada, recibirás una advertencia en tiempo de ejecución. En los casos raros en los que necesitas una propiedad calculada "editable", puedes crear una proporcionando tanto un getter como un setter:

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // Nota: estamos usando la sintaxis de asignación por destructuración aquí.
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

Ahora, cuando se ejecuta fullName.value = 'John Doe', se invocará el setter y firstName y lastName se actualizarán en consecuencia.

### Buenas prácticas

Los getter deben ser libres de efectos secundarios. Es importante recordar que las funciones getter de las propiedades calculadas deben realizar solo cálculos puros y estar libres de efectos secundarios. Por ejemplo, ¡no realices solicitudes asincrónicas o mutaciones en el DOM dentro de un getter de una propiedad calculada! Piensa en una propiedad calculada como describir declarativamente cómo derivar un valor basado en otros valores; su única responsabilidad debe ser calcular y devolver ese valor. Más adelante en la guía, discutiremos cómo podemos realizar efectos secundarios en respuesta a los cambios de estado con los watchers.

Evita mutar el valor devuelto por una propiedad calculada. El valor devuelto por una propiedad calculada es un estado derivado. Piensa en él como una instantánea temporal: cada vez que cambia el estado de origen, se crea una nueva instantánea. No tiene sentido mutar una instantánea, por lo que el valor devuelto por una propiedad calculada debe tratarse como de solo lectura y nunca debe mutarse; en su lugar, actualiza el estado de origen en el que depende para desencadenar nuevas operaciones de cálculo.
  
  
# Propiedades de Clase y style bindings
  
Una necesidad común para la vinculación de datos es manipular la lista de clases y los estilos en línea de un elemento. Dado que class y style son ambos atributos, podemos utilizar v-bind para asignarles un valor de cadena dinámicamente, al igual que con otros atributos. Sin embargo, tratar de generar esos valores mediante la concatenación de cadenas puede ser tedioso y propenso a errores. Por esta razón, Vue proporciona mejoras especiales cuando se utiliza v-bind con class y style. Además de las cadenas, las expresiones también pueden evaluar objetos o matrices.

## Vinculación de clases HTML
Podemos pasar un objeto a :class (abreviatura de v-bind:class) para alternar dinámicamente las clases:

```vue
<template>
  <div :class="{ active: isActive }"></div>
</template>
```

La sintaxis anterior significa que la presencia de la clase active será determinada por la veracidad de la propiedad de datos isActive.

Puedes tener varias clases alternadas teniendo más campos en el objeto. Además, la directiva :class también puede coexistir con el atributo de clase normal. Por lo tanto, dado el siguiente estado:

```js
const isActive = ref(true)
const hasError = ref(false)
```  

Y la siguiente plantilla:

```vue
<template>
  <div
    class="static"
    :class="{ active: isActive, 'text-danger': hasError }"
  ></div>
</template>
```

Se renderizará:

```html
<div class="static active"></div>
```

Cuando isActive o hasError cambia, la lista de clases se actualizará en consecuencia. Por ejemplo, si hasError se vuelve true, la lista de clases se convertirá en "static active text-danger".

El objeto vinculado no tiene que ser en línea:

```js
const classObject = reactive({
  active: true,
  'text-danger': false
})
```

```vue
<template>
  <div :class="classObject"></div>
</template>
```

Esto renderizará el mismo resultado. También podemos vincular a una propiedad calculada que devuelve un objeto. Este es un patrón común y poderoso:

```js
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
```  

```vue
<template>
  <div :class="classObject"></div>
</template>
```

## Vinculación de matrices
Podemos vincular :class a una matriz para aplicar una lista de clases:

```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```

```vue
<template>
  <div :class="[activeClass, errorClass]"></div>
</template>
```  

Lo que renderizará:

```html
<div class="active text-danger"></div>
```

Si también deseas alternar una clase en la lista condicionalmente, puedes hacerlo con una expresión ternaria:

```vue
<template>
  <div :class="[isActive ? activeClass : '', errorClass]"></div>
</template>
```

Esto siempre aplicará errorClass, pero activeClass solo se aplicará cuando isActive sea veraz.

Sin embargo, esto puede ser un poco verboso si tienes múltiples clases condicionales. Es por eso que también es posible utilizar la sintaxis de objeto dentro de la sintaxis de matriz:

```vue
<template>
  <div :class="[{ active: isActive }, errorClass]"></div>
</template>
```
  
## Con componentes
Esta sección asume conocimiento de componentes. Siéntete libre de saltarla y regresar más tarde.

Cuando utilizas el atributo class en un componente con un único elemento raíz, esas clases se agregarán al elemento raíz del componente y se fusionarán con cualquier clase existente que ya tenga.

Por ejemplo, si tenemos un componente llamado MyComponent con la siguiente plantilla:

```vue
<template>
  <!-- plantilla del componente hijo -->
  <p class="foo bar">¡Hola!</p>
</template>
```

Luego agregamos algunas clases al usarlo:

```vue
<template>
  <!-- al usar el componente -->
  <MyComponent class="baz boo" />
</template>
```

El HTML renderizado será:

```html
<p class="foo bar baz boo">¡Hola!</p>
```

Lo mismo ocurre con las vinculaciones de clases:

```vue
<template>
  <MyComponent :class="{ active: isActive }" />
</template>
```

Cuando isActive es verdadero, el HTML renderizado será:

```html
<p class="foo bar active">¡Hola!</p>
```

Si tu componente tiene múltiples elementos raíz, deberás definir qué elemento recibirá esta clase. Puedes hacer esto utilizando la propiedad del componente $attrs:

```vue
<template>
  <!-- plantilla de MyComponent usando $attrs -->
  <p :class="$attrs.class">¡Hola!</p>
  <span>Este es un componente hijo</span>
</template>
```
  
```vue
<template>
  <MyComponent class="baz" />
</template>
```

Se renderizará:

```html
<p class="baz">¡Hola!</p>
<span>Este es un componente hijo</span>
```

Puedes obtener más información sobre la herencia de atributos de componentes en la sección de atributos en cascada.

## Vinculación de estilos en línea
  3
###Vinculación a objetos
:style admite la vinculación a valores de objetos JavaScript, lo que corresponde a la propiedad de estilo de un elemento HTML:

```js
const activeColor = ref('red')
const fontSize = ref(30)
```
  
```vue
<template>
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
</template>
```

Aunque se recomiendan las claves camelCase, :style también admite claves de propiedad CSS con guiones en su nombre (correspondientes a cómo se utilizan en CSS real), por ejemplo:

```vue
<template>
  <div :style="{ 'font-size': fontSize + 'px' }"></div>
</template>
```  

A menudo es una buena idea vincular un objeto de estilo directamente para que la plantilla sea más limpia:

```js
const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})
```
  
```vue
<template>
  <div :style="styleObject"></div>
</template>
```

Nuevamente, la vinculación de estilo de objeto se utiliza a menudo en conjunción con propiedades calculadas que devuelven objetos.

### Vinculación a matrices
  
Podemos vincular :style a una matriz de varios objetos de estilo. Estos objetos se fusionarán y se aplicarán al mismo elemento:

```vue
<template>
  <div :style="[baseStyles, overridingStyles]"></div>
</template>
```

*** Auto-prefixado
Cuando usas una propiedad CSS que requiere un prefijo de proveedor en :style, Vue automáticamente agregará el prefijo correspondiente. Vue lo hace comprobando en tiempo de ejecución qué propiedades de estilo son compatibles en el navegador actual. Si el navegador no admite una propiedad en particular, se probarán varias variantes con prefijos para tratar de encontrar una que sea compatible.

Múltiples valores
Puedes proporcionar una matriz de múltiples valores (con prefijo) a una propiedad de estilo, por ejemplo:

```vue
<template>
  <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
</template>
```
  
Esto solo renderizará el último valor en la matriz que el navegador admite. En este ejemplo, renderizará display: flex para los navegadores que admiten la versión sin prefijo de flexbox.

# Renderizado de listas  

## v-for
Podemos usar la directiva v-for para renderizar una lista de elementos basada en un array. La directiva v-for requiere una sintaxis especial en forma de item in items, donde items es el array de datos fuente y item es un alias para el elemento del array que está siendo iterado:

```js
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

```html
<li v-for="item in items">
  {{ item.message }}
</li>
```  

Dentro del alcance de v-for, las expresiones de plantilla tienen acceso a todas las propiedades del alcance padre. Además, v-for también admite un segundo alias opcional para el índice del elemento actual:

```js
const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```
  
```html
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```


```
Parent - 0 - Foo
Parent - 1 - Bar
```

El alcance de variable de v-for es similar al siguiente código JavaScript:

```js
const parentMessage = 'Parent'
const items = [
  /* ... */
]

items.forEach((item, index) => {
  // tiene acceso al alcance externo `parentMessage`
  // pero `item` y `index` solo están disponibles aquí
  console.log(parentMessage, item.message, index)
})
```  

Observa cómo el valor de v-for coincide con la firma de función del callback de forEach. De hecho, se puede utilizar la deconstrucción en el alias de elemento de v-for similar a la deconstrucción de los argumentos de función:

```html
<li v-for="{ message } in items">
  {{ message }}
</li>
```

con alias de índice:

```html
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```


Para v-for anidados, el alcance funciona de manera similar a las funciones anidadas. Cada alcance de v-for tiene acceso a los alcances superiores:

```html
<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>
```

También se puede usar "of" como delimitador en lugar de "in", de modo que se parezca más a la sintaxis de los iteradores de JavaScript:

```html
<div v-for="item of items"></div>
```

### v-for con un objeto
También se puede usar v-for para iterar por las propiedades de un objeto. El orden de iteración se basará en el resultado de llamar a Object.keys() en el objeto:

```js
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
```

```html
<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```

También se puede proporcionar un segundo alias para el nombre de la propiedad (es decir, la clave):

```html
<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>
```


Y otro para el índice:

```html
<li v-for="(value, key, index) in myObject">
{{ index }}. {{ key }}: {{ value }}
</li>
```

### v-for con un rango
v-for también puede tomar un número entero. En este caso, repetirá la plantilla esa cantidad de veces, basándose en un rango de 1...n.

```html
<span v-for="n in 10">{{ n }}</span>
```
  
Nota que aquí n comienza con un valor inicial de 1 en lugar de 0.

### v-for en <template>
Similar a template v-if, también se puede usar una etiqueta <template> con v-for para renderizar un bloque de múltiples elementos. Por ejemplo:

```vue
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

#### v-for con v-if
Nota: No se recomienda usar v-if y v-for en el mismo elemento debido a la precedencia implícita. Consulte la guía de estilo para obtener más detalles.

Cuando existen en el mismo nodo, v-if tiene una prioridad mayor que v-for. Eso significa que la condición v-if no tendrá acceso a las variables del alcance de v-for:

```vue
<!--
Esto lanzará un error porque la propiedad "todo"
no está definida en la instancia.
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

Esto se puede solucionar moviendo v-for a una etiqueta <template> contenedora (que también es más explícito):

```vue
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

### Mantener el estado con la clave
Cuando Vue está actualizando una lista de elementos renderizados con v-for, por defecto utiliza una estrategia de "parcheo en su lugar". Si el orden de los elementos de datos ha cambiado, en lugar de mover los elementos del DOM para que coincidan con el orden de los elementos, Vue parchea cada elemento en su lugar y se asegura de que refleje lo que debería ser renderizado en ese índice en particular.

Este modo predeterminado es eficiente, pero solo es adecuado cuando la salida de renderizado de la lista no depende del estado de los componentes secundarios o del estado temporal del DOM (por ejemplo, los valores de entrada del formulario).

Para darle a Vue una pista para que pueda realizar un seguimiento de la identidad de cada nodo y, por lo tanto, reutilizar y reordenar los elementos existentes, es necesario proporcionar un atributo clave único para cada elemento:

```vue
<div v-for="item in items" :key="item.id">
  <!-- contenido -->
</div>
```

Cuando se utiliza <template v-for>, la clave debe colocarse en el contenedor <template>:

```vue
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```
Nota: la clave aquí es un atributo especial que se vincula con v-bind. No debe confundirse con la variable de propiedad clave al usar v-for con un objeto.

Se recomienda proporcionar un atributo clave con v-for siempre que sea posible, a menos que el contenido DOM iterado sea simple (es decir, no contiene componentes ni elementos DOM con estado) o que esté intencionalmente confiando en el comportamiento predeterminado para obtener ganancias de rendimiento.

La vinculación de claves espera valores primitivos, es decir, cadenas y números. No use objetos como claves de v-for. Para obtener información detallada sobre el uso del atributo clave, consulte la documentación de la API de clave.

### v-for con un componente
Esta sección asume conocimientos de Componentes. Siéntete libre de saltar y volver más tarde.

Puedes usar directamente v-for en un componente, como cualquier elemento normal (no olvides proporcionar una clave):

```vue
<MyComponent v-for="item in items" :key="item.id" />
```

Sin embargo, esto no pasará automáticamente ningún dato al componente, porque los componentes tienen ámbitos aislados propios. Para pasar los datos iterados al componente, también deberíamos usar props:

```vue
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>
```

La razón por la que no se inyecta automáticamente el item en el componente es porque eso hace que el componente esté estrechamente acoplado a cómo funciona v-for. Ser explícito acerca de dónde provienen sus datos hace que el componente sea reutilizable en otras situaciones.

Echa un vistazo a este ejemplo de una lista de tareas simples para ver cómo renderizar una lista de componentes usando v-for, pasando diferentes datos a cada instancia.

## Detección de cambios de matriz
### Métodos de mutación
Vue es capaz de detectar cuando se llaman a los métodos de mutación de una matriz reactiva y desencadenar las actualizaciones necesarias. Estos métodos de mutación son:

push()
pop()
shift()
unshift()
splice()
sort()
reverse()
  
### Reemplazar una matriz
Los métodos de mutación, como su nombre indica, mutan la matriz original en la que se llaman. En comparación, también hay métodos no mutantes, como filter(), concat() y slice(), que no mutan la matriz original, pero siempre devuelven una nueva matriz. Cuando se trabaja con métodos no mutantes, debemos reemplazar la matriz antigua por la nueva:

```js
// `items` es una ref con valor de array
items.value = items.value.filter((item) => item.message.match(/Foo/))
```

Podrías pensar que esto hará que Vue descarte el DOM existente y vuelva a renderizar toda la lista; por suerte, ese no es el caso. Vue implementa algunas heurísticas inteligentes para maximizar la reutilización de elementos DOM, por lo que reemplazar una matriz por otra que contenga objetos superpuestos es una operación muy eficiente.

## Mostrar resultados filtrados / ordenados
A veces queremos mostrar una versión filtrada o ordenada de una matriz sin mutar o restablecer los datos originales. En este caso, puede crear una propiedad computada que devuelva la matriz filtrada o ordenada.

Por ejemplo:

```js
const numbers = ref([1, 2, 3, 4, 5])

const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})
```

```vue
<li v-for="n in evenNumbers">{{ n }}</li>
```

En situaciones donde las propiedades computadas no son factibles (por ejemplo, dentro de bucles v-for anidados), se puede usar un método:

```js
const sets = ref([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10]
])

function even(numbers) {
  return numbers.filter((number) => number % 2 === 0)
}
```
  
```vue
<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)">{{ n }}</li>
</ul>
```

¡Ten cuidado con reverse() y sort() en una propiedad computada! Estos dos métodos mutarán la matriz original, lo que debe evitarse en los getters computados. Cree una copia de la matriz original antes de llamar a estos métodos:

diff
- return numbers.reverse()
+ return [...numbers].reverse()

# Escuchando Eventos
Podemos usar la directiva v-on, que normalmente acortamos con el símbolo @, para escuchar eventos del DOM y ejecutar algún código JavaScript cuando se activan. El uso sería v-on:click="handler" o con el atajo @click="handler".

El valor del handler puede ser uno de los siguientes:

1)Manejadores en línea: JavaScript en línea que se ejecuta cuando se activa el evento (similar al atributo onclick nativo).

)Manejadores de método: Un nombre de propiedad o ruta que apunta a un método definido en el componente.

## Manejadores en línea
Los manejadores en línea se usan típicamente en casos simples, por ejemplo:

```js
const count = ref(0)

<template>
  <button @click="count++">Agregar 1</button>
  <p>El contador es: {{ count }}</p>
</template>
```

## Manejadores de método
La lógica para muchos manejadores de eventos será más compleja, y probablemente no sea factible con manejadores en línea. Es por eso que v-on también puede aceptar el nombre o la ruta de un método del componente que desea llamar.

Por ejemplo:

```vue
const name = ref('Vue.js')

function greet(event) {
  alert(`Hola ${name.value}!`)
  // `event` es el evento nativo del DOM
  if (event) {
    alert(event.target.tagName)
  }
}

<template>
  <!-- `greet` es el nombre del método definido arriba -->
  <button @click="greet">Saludar</button>
</template>
```

Un manejador de método recibe automáticamente el objeto Event nativo del DOM que lo activa, en el ejemplo anterior, podemos acceder al elemento que dispara el evento a través de event.target.tagName.


## Detección de método frente a en línea
El compilador de plantillas detecta los manejadores de método verificando si la cadena de valor de v-on es un identificador de JavaScript válido o una ruta de acceso a propiedad. Por ejemplo, foo, foo.bar y foo['bar'] se tratan como manejadores de método, mientras que foo() y count++ se tratan como manejadores en línea.

Llamando métodos en manejadores en línea
En lugar de vincular directamente a un nombre de método, también podemos llamar métodos en un manejador en línea. Esto nos permite pasar argumentos personalizados al método en lugar del evento nativo:

```vue
function say(message) {
  alert(message)
}

<template>
  <button @click="say('hola')">Decir hola</button>
  <button @click="say('adiós')">Decir adiós</button>
</template>
```

## Acceder al argumento del evento en manejadores en línea
A veces también necesitamos acceder al evento DOM original en un manejador en línea. Puedes pasarla a un método usando la variable especial $event, o usar una función flecha en línea:

```vue
function warn(message, event) {
  // ahora tenemos acceso al evento nativo
  if (event) {
    event.preventDefault()
  }
  alert(message)
}

<template>
  <!-- usando la variable especial `$event` -->
  <button @click="warn('El formulario aún no se puede enviar.', $event)">
    Enviar
  </button>

  <!-- usando una función flecha en línea -->
<button @click="(event) => warn('El formulario aún no se puede enviar.', event)">
Enviar
</button>
</template>
```

## Modificadores de eventos

Es muy común necesitar llamar a `event.preventDefault()` o `event.stopPropagation()` dentro de los manejadores de eventos. Aunque podemos hacer esto fácilmente dentro de los métodos, sería mejor si los métodos pudieran ser puramente sobre la lógica de los datos en lugar de tener que lidiar con los detalles del evento del DOM.

Para abordar este problema, Vue proporciona modificadores de eventos para `v-on`. Recordemos que los modificadores son sufijos de directiva indicados por un punto.

`.stop`
`.prevent`
`.self`
`.capture`
`.once`
`.passive`

```html
<template>
  <!-- la propagación del evento de clic se detendrá -->
  <a @click.stop="hacerEsto"></a>

  <!-- el envío del formulario ya no recargará la página -->
  <form @submit.prevent="onSubmit"></form>

  <!-- los modificadores se pueden concatenar -->
  <a @click.stop.prevent="hacerEso"></a>

  <!-- solo el modificador -->
  <form @submit.prevent></form>

  <!-- solo activa el manejador si event.target es el propio elemento -->
  <!-- es decir, no proviene de un elemento secundario -->
  <div @click.self="hacerEso">...</div>
</template>
```
** TIP

El orden importa al usar modificadores porque el código relevante se genera en el mismo orden. Por lo tanto, usar @click.prevent.self evitará la acción predeterminada de clic en el propio elemento y sus hijos, mientras que @click.self.prevent solo evitará la acción predeterminada de clic en el propio elemento.

Los modificadores .capture, .once y .passive reflejan las opciones del método addEventListener nativo:

```html
<template>
  <!-- use el modo de captura al agregar el escuchador de eventos -->
  <!-- es decir, un evento dirigido a un elemento interno se maneja aquí antes de ser manejado por ese elemento -->
  <div @click.capture="hacerEsto">...</div>

  <!-- el evento de clic se activará como máximo una vez -->
  <a @click.once="hacerEsto"></a>

  <!-- el comportamiento predeterminado del evento de desplazamiento (desplazamiento) sucederá -->
  <!-- inmediatamente, en lugar de esperar a que `onScroll` se complete -->
  <!-- en caso de que contenga `event.preventDefault ()` -->
  <div @scroll.passive="onScroll">...</div>
</template>
El modificador .passive se usa típicamente con los escuchadores de eventos táctiles para mejorar el rendimiento en dispositivos móviles.
```

** TIP

No uses .passive y .prevent juntos, porque .passive ya indica al navegador que no tienes la intención de evitar el comportamiento predeterminado del evento, y es probable que veas una advertencia del navegador si lo haces.

##Modificadores de teclas
Al escuchar eventos de teclado, a menudo necesitamos verificar teclas específicas. Vue permite agregar modificadores de teclas para v-on o @ al escuchar eventos de teclado:

```html
<template>
  <!-- solo llamar a `submit` cuando la tecla es `Enter` -->
  <input @keyup.enter="submit" />
</template>
```

Puedes usar directamente cualquier nombre de tecla válido expuesto a través de KeyboardEvent.key como modificadores convirtiéndolos a kebab-case.

```html
<template>
  <input @keyup.page-down="onPageDown" />
</template>
```
En el ejemplo anterior, el manejador solo se llamará si $event.key es igual a 'PageDown'.

## Alias de teclas
Vue proporciona alias para las teclas más comúnmente utilizadas:

.enter
.tab
.delete (captura tanto las teclas "Eliminar" como "Retroceso")
.esc
.space
.up
.down
.left
.right

## Teclas de modificador del sistema
Puedes usar los siguientes modificadores para activar escuchadores de eventos de ratón o teclado solo cuando se presiona el modificador de tecla correspondiente:

.ctrl
.alt
.shift
.meta

** Nota

En los teclados de Macintosh, meta es la tecla de comando (⌘). En los teclados de Windows, meta es la tecla de Windows (⊞). En los teclados de Sun Microsystems, meta está marcada como un diamante sólido (◆). En ciertos teclados, específicamente en los teclados de MIT y Lisp machine y sus sucesores, como el teclado Knight, el teclado space-cadet, meta está etiquetada como "META". En los teclados de Symbolics, meta está etiquetada como "META" o "Meta".

Por ejemplo:

```vue
<template>
  <!-- Alt + Enter -->
  <input @keyup.alt.enter="clear" />

  <!-- Ctrl + clic -->
  <div @click.ctrl="hacerAlgo">Hacer algo</div>
</template>
```

** TIP

Ten en cuenta que las teclas de modificador son diferentes de las teclas normales y cuando se usan con eventos keyup, deben presionarse cuando se emite el evento. En otras palabras, keyup.ctrl solo se activará si sueltas una tecla mientras mantienes presionado ctrl. No se activará si sueltas la tecla ctrl sola.

## Modificador .exact
El modificador .exact permite controlar la combinación exacta de modificadores del sistema necesarios para activar un evento.

```html
<template>
  <!-- esto se activará incluso si Alt o Shift también están presionados -->
  <button @click.ctrl="onClick">A</button>

  <!-- esto solo se activará cuando Ctrl y no se presionen otras teclas -->
  <button @click.ctrl.exact="onCtrlClick">A</button>

  <!-- esto solo se activará cuando no se presionen modificadores del sistema -->
  <button @click.exact="onClick">A</button>
</template>
```

## Modificadores de botones de mouse
.left
.right
.middle

Estos modificadores restringen el manejador a eventos activados por un botón de mouse específico.
  
# Lifecycle Hooks
Cada instancia de componente de Vue pasa por una serie de pasos de inicialización cuando se crea, por ejemplo, necesita configurar la observación de datos, compilar la plantilla, montar la instancia en el DOM y actualizar el DOM cuando cambian los datos. En el camino, también ejecuta funciones llamadas ganchos de ciclo de vida, lo que brinda a los usuarios la oportunidad de agregar su propio código en etapas específicas.

## Registro de los lifecycle hooks

Por ejemplo, el gancho onMounted se puede utilizar para ejecutar código después de que el componente haya terminado el renderizado inicial y creado los nodos del DOM:

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`El componente ahora está montado.`)
})
</script>
```


También hay otros ganchos que se llamarán en diferentes etapas del ciclo de vida de la instancia, siendo los más utilizados onMounted, onUpdated y onUnmounted. Al llamar a onMounted, Vue asocia automáticamente la función de devolución de llamada registrada con la instancia de componente activa actual. Esto requiere que estos ganchos se registren de manera sincrónica durante la configuración del componente. Por ejemplo, no haga esto:

```js
setTimeout(() => {
  onMounted(() => {
    // esto no funcionará.
  })
}, 100)
```

Ten en cuenta que esto no significa que la llamada deba colocarse léxicamente dentro de setup() o <script setup>. onMounted() se puede llamar en una función externa siempre que la pila de llamadas sea síncrona y se origine desde dentro de setup().

## Diagrama del ciclo de vida

A continuación se muestra un diagrama del ciclo de vida de la instancia. No es necesario que entienda todo lo que está sucediendo en este momento, pero a medida que aprenda y construya más, será una referencia útil.

![Ciclo de vida](https://dltqhkoxgn1gx.cloudfront.net/img/posts/how-to-use-lifecycle-hooks-in-vue3-1.png)

Esencialmente, cada evento principal del ciclo de vida de Vue está separado en dos hooks que son llamados justo antes de ese evento y justo después. Hay cuatro eventos principales (8 hooks principales) que puedes utilizar en tu aplicación Vue.
  
Creation - se ejecuta cuando se crea el componente
Mounting - se ejecuta cuando se monta el DOM
Updates - se ejecuta cuando se modifican los datos reactivos
Destruction - se ejecuta justo antes de que tu elemento sea destruido.

Excluyendo beforeCreate y created (que son reemplazados por el propio método setup), hay 9 de los hooks del ciclo de vida de la API de Options a los que podemos acceder en nuestro método setup:
  
- onBeforeMount - llamado antes de que comience el montaje
- onMounted - llamado cuando el componente está montado
- onBeforeUpdate - Llamado cuando los datos reactivos cambian y antes de re renderizar
- onUpdated - Llamado después de re-renderizar
- onBeforeUnmount - Llamado antes de que la instancia Vue sea destruida
- onUnmounted - Llamado después de que la instancia es destruida
- onActivated - Llamado cuando un componente mantenido vivo es activado
- onDeactivated - Llamado cuando un componente mantenido vivo es desactivado
- onErrorCaptured - se llama cuando se captura un error de un componente hijo

