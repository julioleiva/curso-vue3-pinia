## Crear componente SearchInput
Primero, creamos un nuevo componente llamado SearchInput.vue que incluya el input para la búsqueda.

```vue
<template>
  <input
    type="text"
    :value="searchQuery"
    @input="handleInput"
    placeholder="Search contacts..."
  />
</template>

<script setup>
import { defineProps, defineEmit } from 'vue'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
})

const emit = defineEmit(['update-search-query'])

const handleInput = (event) => {
  emit('update-search-query', event.target.value)
}
</script>
```

Luego, actualiza el componente que contenía el input originalmente para que utilice el nuevo componente SearchInput.

Por ejemplo, en Home.vue:

```vue
<template>
  <div class="container">
    <SearchInput
      :searchQuery="searchQuery.value"
      @update-search-query="updateSearchQuery"
    />
    <!-- El resto de tu código -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SearchInput from './components/SearchInput.vue'

// El resto de tus imports y código

const searchQuery = ref('')

const updateSearchQuery = (newValue) => {
  searchQuery.value = newValue
  store.setSearchQuery(searchQuery.value)
}

// El resto de tu código
</script>
```

Ahora, el componente SearchInput se encarga de manejar el input de búsqueda y comunica los cambios a través de un **evento personalizado llamado update-search-query**. El componente Home.vue recibe estos cambios y actualiza la búsqueda en consecuencia.


## Crear un component Modal e implementarlo con el Built-in de Vue Teleport

Primero, crea un nuevo componente llamado Modal.vue.



```vue
<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <header>
        <slot name="header">Default header</slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer">
          <button @click="closeModal">Close</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { defineEmit } from 'vue'

const emit = defineEmit(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background-color: #fff;
  border-radius: 4px;
  padding: 1rem;
  min-width: 300px;
}

header,
footer {
  padding: 0.5rem 0;
}

main {
  padding: 1rem 0;
}
</style>
```

Luego, en el componente donde deseas usar el modal, importa Modal.vue y utiliza el elemento <teleport> de Vue para renderizar el contenido del modal en un lugar diferente del DOM.

Por ejemplo, en Home.vue:

```vue
<template>
  <div class="container">
    <!-- Tu contenido existente -->
    <button @click="showModal = true">Open Modal</button>

    <teleport to="body">
      <Modal v-if="showModal" @close="showModal = false">
        <template #header>
          <h2>Custom header</h2>
        </template>
        <p>Modal content goes here</p>
        <template #footer>
          <button @click="showModal = false">Close</button>
        </template>
      </Modal>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Modal from './components/Modal.vue'

// Tus imports y código existentes

const showModal = ref(false)

// El resto de tu código
</script>
```

Ahora, al hacer clic en el botón "Open Modal", se mostrará el componente Modal. El modal se renderiza dentro de un elemento <teleport> que lo transporta al elemento body del DOM. De esta manera, el modal aparece por encima de todo el contenido y no hereda ningún estilo del componente principal.

## Qué son los slots?
Los slots en Vue.js son una forma de componer y reutilizar componentes permitiendo la inclusión de contenido personalizado en ellos. Los slots proporcionan una forma flexible de insertar contenido personalizado en un componente sin tener que modificar su estructura interna. Son especialmente útiles cuando se crea una biblioteca de componentes, ya que permiten a los usuarios de los componentes personalizar el contenido sin tener que modificar el propio componente.
Un componente en Vue puede tener uno o más slots. Para utilizar un slot, se necesita definirlo en el componente hijo utilizando la etiqueta especial <slot> y luego proporcionar el contenido personalizado en el componente padre utilizando las etiquetas <template> y v-slot.
Hay dos tipos principales de slots en Vue.js:

**Slots por defecto**: Si no se especifica ningún atributo name en la etiqueta <slot>, se crea un slot por defecto. El contenido proporcionado en el componente padre se muestra en el slot por defecto si no se asigna a ningún otro slot específico.

```vue
<!-- Componente Hijo -->
<template>
  <div>
    <slot></slot>
  </div>
</template>
```
```vue
<!-- Componente Padre -->
<template>
  <Hijo>
    <template v-slot:default>
      Contenido personalizado aquí.
    </template>
  </Hijo>
</template>
```

**Slots con nombre:** Los slots con nombre permiten definir varios slots en un componente, cada uno con un nombre único. Para utilizar un slot con nombre, se debe agregar el atributo name a la etiqueta <slot> en el componente hijo y proporcionar el contenido en el componente padre utilizando el atributo v-slot:nombre en la etiqueta <template>.

```vue
<!-- Componente Hijo -->
<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

```vue
<!-- Componente Padre -->
<template>
  <Hijo>
    <template v-slot:header>
      Contenido del encabezado.
    </template>
    <template v-slot:default>
      Contenido principal.
    </template>
    <template v-slot:footer>
      Contenido del pie de página.
    </template>
  </Hijo>
</template>
```

Utilizando slots, puedes crear componentes más flexibles y reutilizables que se pueden personalizar fácilmente según las necesidades del proyecto.


