# Components

## Props

### Declaración de Props

Los componentes de Vue requieren una declaración explícita de props para que Vue sepa qué props externos pasados al componente deben ser tratados como atributos de paso (que se discutirán en su sección dedicada).

En los SFC que usan <script setup>, los props se pueden declarar usando la macro defineProps():

```vue
<script setup>
const props = defineProps(['foo'])
console.log(props.foo)
</script>
```  

En los componentes que no usan <script setup>, los props se declaran usando la opción props:

```js
export default {
  props: ['foo'],
  setup(props) {
    // setup() recibe props como primer argumento.
    console.log(props.foo)
  }
}
```

Observa que el argumento pasado a defineProps() es el mismo que el valor proporcionado a la opción props: la misma API de opciones de props se comparte entre los dos estilos de declaración.

Además de declarar props usando una matriz de cadenas, también podemos usar la sintaxis de objeto:

```vue
<script setup>
defineProps({
  title: String,
  likes: Number
})
```

```js
// en componentes que no usan <script setup>
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

Para cada propiedad en la sintaxis de declaración de objeto, la clave es el nombre del prop, mientras que el valor debe ser la función constructora del tipo esperado.

Esto no solo documenta su componente, sino que también advertirá a otros desarrolladores que usen su componente en la consola del navegador si pasan el tipo incorrecto. Discutiremos más detalles sobre la validación de props más adelante en esta página.

Si estás usando TypeScript con <script setup>, también es posible declarar props usando solo anotaciones de tipo:

```vue
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

## Detalles del paso de Props

### Casing de los nombres de Props

Declaramos los nombres de props largos usando camelCase porque esto evita tener que usar comillas cuando se usan como claves de propiedad, y nos permite hacer referencia a ellos directamente en expresiones de plantilla porque son identificadores de JavaScript válidos:

```js
defineProps({
  greetingMessage: String
})
```

```html
<span>{{ greetingMessage }}</span>
```

Técnicamente, también se puede usar camelCase al pasar props a un componente hijo (excepto en las plantillas DOM). Sin embargo, la convención es usar kebab-case en todos los casos para alinearse con los atributos HTML:

```vue
<MyComponent greeting-message="hello" />
```

Usamos PascalCase para las etiquetas de los componentes cuando es posible porque mejora la legibilidad de la plantilla al diferenciar los componentes de Vue de los elementos nativos. Sin embargo, no hay tanto beneficio práctico en usar camelCase al pasar props, por lo que elegimos seguir las convenciones de cada lenguaje.

## Props estáticos vs. dinámicos

Hasta ahora, has visto props pasados como valores estáticos, como en:

```vue
<BlogPost title="Mi viaje con Vue" />
```

También has visto props asignados dinámicamente con v-bind o su atajo :, como en:

```vue
<!-- Asignar dinámicamente el valor de una variable -->
<BlogPost :title="post.title" />
<!-- Asignar dinámicamente el valor de una expresión compleja -->
<BlogPost :title="post.title + ' por ' + post.author.name" />
```

## Pasando diferentes tipos de valores

En los dos ejemplos anteriores, sucedió que pasamos valores de cadena, pero cualquier tipo de valor se puede pasar a un prop.

### Número

```html
Copy code
<!-- Aunque `42` es estático, necesitamos v-bind para decirle a Vue que -->
<!-- esta es una expresión de JavaScript en lugar de una cadena.      -->
<BlogPost :likes="42" />

<!-- Asignar dinámicamente el valor de una variable. -->
<BlogPost :likes="post.likes" />
```
### Booleano

```html
<!-- Incluir el prop sin valor implicará `true`. -->
<BlogPost is-published />

<!-- Aunque `false` es estático, necesitamos v-bind para decirle a Vue que -->
<!-- esta es una expresión de JavaScript en lugar de una cadena.          -->
<BlogPost :is-published="false" />

<!-- Asignar dinámicamente el valor de una variable. -->
<BlogPost :is-published="post.isPublished" />
```

### Array

```vue
<!-- Aunque la matriz es estática, necesitamos v-bind para decirle a Vue que -->
<!-- esta es una expresión de JavaScript en lugar de una cadena.            -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- Asignar dinámicamente el valor de una variable. -->
<BlogPost :comment-ids="post.commentIds" />
```

### Objeto

```vue
<!-- Aunque el objeto es estático, necesitamos v-bind para decirle a Vue que -->
<!-- esta es una expresión de JavaScript en lugar de una cadena.            -->
<BlogPost
  :author="{
    name: 'Verónica',
    company: 'Veridian Dynamics'
  }"
 />

<!-- Asignar dinámicamente el valor de una variable. -->
<BlogPost :author="post.author" />
```

## Enlazando múltiples propiedades usando un objeto

Si quieres pasar todas las propiedades de un objeto como props, puedes usar v-bind sin un argumento (v-bind en lugar de :nombre-de-prop). Por ejemplo, dada un objeto post:

```js
const post = {
  id: 1,
  title: 'Mi viaje con Vue'
}
```
La siguiente plantilla:

```vue
<BlogPost v-bind="post" />
```

Será equivalente a:

```vue
<BlogPost :id="post.id" :title="post.title" />
```

** Flujo de datos unidireccional

Todos los props forman una vinculación unidireccional descendente entre la propiedad secundaria y la principal: cuando se actualiza la propiedad principal, se transmitirá a la secundaria, pero no al revés. Esto evita que los componentes secundarios muten accidentalmente el estado del principal, lo que puede hacer que el flujo de datos de su aplicación sea más difícil de entender.

Además, cada vez que se actualiza el componente principal, todas las props en el componente secundario se actualizarán con el valor más reciente. Esto significa que no debes intentar mutar unapropiedad dentro de un componente secundario. Si lo haces, Vue te avisará en la consola:

```js
const props = defineProps(['foo'])
// ❌ advertencia, ¡las props son de solo lectura!
props.foo = 'bar'
```
  
Por lo general, hay dos casos en los que es tentador mutar un prop:

El prop se utiliza para pasar un valor inicial;
el componente secundario quiere usarlo como una propiedad de datos local después. En este caso, es mejor definir una propiedad de datos local que use el prop como su valor inicial:

```js
const props = defineProps(['initialCounter'])

// counter solo usa props.initialCounter como valor inicial;
// está desconectado de futuras actualizaciones de prop.
const counter = ref(props.initialCounter)
```

El prop se pasa como un valor sin procesar que necesita ser transformado. En este caso, es mejor definir una propiedad computada que use el valor del prop:

```js
const props = defineProps(['size'])
// propiedad computada que se actualiza automáticamente cuando cambia la prop
const sizeNormalizado = computed(() => props.size.trim().toLowerCase())
```

## Mutando objetos/arrays como props

Cuando se pasan objetos y matrices como props, aunque el componente secundario no puede mutar la vinculación de la prop, podrá mutar las propiedades anidadas del objeto o la matriz. Esto se debe a que en JavaScript, los objetos y las matrices se pasan por referencia, y es demasiado costoso para Vue evitar dichas mutaciones.

La principal desventaja de estas mutaciones es que permite que el componente secundario afecte el estado principal de una manera que no es obvia para el componente principal, lo que potencialmente dificulta la comprensión del flujo de datos en el futuro. Como buena práctica, debes evitar tales mutaciones a menos que el componente principal y secundario estén estrechamente acoplados por diseño. En la mayoría de los casos, el componente secundario debe emitir un evento para permitir que el componente principal realice la mutación.

## Validación de props

Los componentes pueden especificar requisitos para sus props, como los tipos que ya has visto. Si un requisito no se cumple, Vue te avisará en la consola de JavaScript del navegador. Esto es especialmente útil al desarrollar un componente que está destinado a ser utilizado por otros.

Para especificar la validación de props, puedes proporcionar un objeto con requisitos de validación a la macro defineProps (), en lugar de una matriz de cadenas. Por ejemplo:

```js
defineProps({
  // Comprobación básica de tipo
  // (los valores `null` y `undefined` permitirán cualquier tipo)
  propA: Number,
  // Múltiples tipos posibles
  propB: [String, Number],
  // Cadena obligatoria
  propC: {
    type: String,
    required: true
  },
  // Número con un valor predeterminado
  propD: {
    type: Number,
    default: 100
  },
  // Objeto con un valor predeterminado
  propE: {
    type: Object,
    // Los valores predeterminados de objetos o matrices deben devolverse desde
    // una función de fábrica. La función recibe las props sin procesar
    // recibidas por el componente como argumento.
    default(rawProps) {
      return { mensaje: 'hola'

    }
    },
// Función con un valor predeterminado
propG: {
type: Function,
// A diferencia del valor predeterminado de objetos o matrices, esto no es una fábrica.
// función: esta es una función que sirve como valor predeterminado.
default() {
return 'Función predeterminada'
}
}
})
```

**TIP**
El código dentro del argumento defineProps () no puede acceder a otras variables declaradas en `<script setup>`, porque toda la expresión se mueve a un ámbito de función externo cuando se compila.

### Detalles adicionales:
- Todas las props son opcionales de forma predeterminada, a menos que se especifique `required: true`.
- Una prop opcional ausente, que no sea Boolean, tendrá un valor `undefined`.
- Las props Boolean ausentes se convertirán en `false`. Puedes cambiar esto estableciendo un valor predeterminado: es decir, `default: undefined` para comportarse como una prop no booleana.
- Si se especifica un valor predeterminado, se utilizará si el valor de prop resuelto es `undefined`: esto incluye tanto cuando falta la prop como cuando se pasa un valor explícito `undefined`.
- Cuando falla la validación de la prop, Vue producirá una advertencia en la consola (si se usa la versión de desarrollo).
- Si se utilizan las declaraciones de props basadas en tipos, Vue intentará compilar las anotaciones de tipos en declaraciones de props equivalentes en tiempo de ejecución. Por ejemplo, `defineProps<{ msg: string }>` se compilará en `{ msg: { type: String, required: true }}`.

## Comprobaciones de tipo en tiempo de ejecución

El tipo puede ser uno de los siguientes constructores nativos:

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol

Además, el tipo también puede ser una clase personalizada o una función constructora, y la comprobación se realizará con una comprobación instanceof. Por ejemplo, dada la siguiente clase:

```js
class Persona {
  constructor(nombre, apellido) {
    this.nombre = nombre
    this.apellido = apellido
  }
}
```
Puedes usarla como tipo de una prop:
```js
defineProps({
  autor: Persona
})
````

Vue usará instanceof Persona para validar si el valor de la prop autor es realmente una instancia de la clase Persona.

## Casteo Booleano

Las props con tipo Boolean tienen reglas especiales de casteo para imitar el comportamiento de los atributos booleanos nativos. Dado un <MyComponent> con la siguiente declaración:

```js
defineProps({
  deshabilitado: Boolean
})
````

El componente se puede usar así:

```html
<!-- equivalente a pasar :deshabilitado="true" -->
<MyComponent deshabilitado />

<!-- equivalente a pasar :deshabilitado="false" -->
<MyComponent />
````

Cuando se declara una prop para permitir múltiples tipos, por ejemplo:

```js
defineProps({
  deshabilitado: [Boolean, Number]
})
````

Las reglas de casteo para Boolean se aplicarán independientemente del orden de aparición de los tipos.
