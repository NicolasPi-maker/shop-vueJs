<template>
  <div class="card">
    <h3 class="mb-20">Ajouter un article</h3>
    <form method="post" @submit="trySubmit">
      <div class="d-flex flex-column mb-20">
        <label ref="titleInput" for="title" class="mb-5">Titre*</label>
        <input type="text" v-model="title.value.value" id="title" :class="(setStyleValidation(title))">
        <small class="form-error" v-if="title.errorMessage.value">{{ title.errorMessage.value }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label for="img" class="mb-5">Image*</label>
        <input type="text" v-model="image.value.value" id="img" :class="(setStyleValidation(image))">
        <small class="form-error" v-if="image.errorMessage.value">{{ image.errorMessage.value }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label for="price" class="mb-5">Prix*</label>
        <input type="number" v-model="price.value.value" id="price" min="0" :class="(setStyleValidation(price))">
        <small class="form-error" v-if="price.errorMessage.value">{{ price.errorMessage.value }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label for="description" class="mb-5">Description*</label>
        <textarea  type="text" v-model="(description.value.value as string)" id="description" :class="(setStyleValidation(description))"></textarea>
        <small class="form-error" v-if="description.errorMessage.value">{{ description.errorMessage.value }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label for="stock" class="mb-5">Stock*</label>
        <input type="number" v-model="stock.value.value" id="stock" min="0" :class="(setStyleValidation(stock))">
        <small class="form-error" v-if="stock.errorMessage.value">{{ stock.errorMessage.value }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label for="category" class="mb-5">Categorie*</label>
        <select v-model="category.value.value" id="title" :class="(setStyleValidation(category))">
          <option value="" disabled selected>Choisissez une catégorie</option>
          <option value="all">Tous</option>
          <option value="gamer">Jeu</option>
          <option value="desktop">Bureau</option>
          <option value="streaming">Live</option>
        </select>
        <small class="form-error" v-if="category.errorMessage.value">{{ category.errorMessage.value }}</small>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">Sauvegarder</button>
    </form>
  </div>
</template>

<script setup lang="ts">
  import {toTypedSchema} from "@vee-validate/zod";
  import {z} from "zod";
  import {useField, useForm} from "vee-validate";
  import {onMounted, ref} from "vue";
  import type {FieldContext} from "vee-validate"

  const setStyleValidation = (field: FieldContext) => {
    if (field.meta.valid && field.meta.validated) {
      return 'success';
    } else if (!field.meta.valid && field.meta.validated) {
      return 'error';
    }
  }

  const titleInput = ref<HTMLInputElement | null>(null);
  onMounted(() => {
    titleInput.value?.focus();
  });

  const required = { required_error : 'Veuillez renseigner ce champ'};

  const validationSchema = toTypedSchema(
      z.object({
        title:
            z.string(required)
            .min(1, { message: 'Le titre doit faire au moins 1 caractère'})
            .max(20, { message: 'Le titre doit faire moins de 10 caractères'}),
        image: z.string(required).min(1, { message: 'Veuillez renseigner une image'}),
        price:
            z.number(required)
            .min(0, { message: 'Le prix doit être supérieur à 0'})
            .max(15000, { message: 'Le prix doit être inférieur à 15000'}),
        description:
            z.string(required)
            .min(10, { message: 'La description doit faire au moins 10 caractères'}),
        stock: z.number(required)
            .min(1, { message: 'Le stock doit être supérieur à 0'}),
        category: z.string(required),
      })
  );

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema,
  });

  const title = useField('title');
  const image = useField('image');
  const price = useField('price');
  const description = useField('description');
  const stock = useField('stock');
  const category = useField('category');


  const trySubmit = handleSubmit(async(formValues, { resetForm }) => {
    try {
      await fetch('https://restapi.fr/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });
      resetForm();
      titleInput.value?.focus();
    } catch (error) {
      console.log(error);
    }
  });
</script>

<style scoped>
@import "src/assets/base.css";
  .card {
    width: 100%;
    max-width: 500px;
  }

  .success {
    border-color : #7bed9f;
    &:focus {
      outline-color: #7bed9f;
    }
  }

  .error {
    border-color: #ff6b6b;
      animation: bodyCheckOnError 0.5s ease-in-out 0s 1 normal none running;

    &:focus {
      outline-color: #ff6b6b;
    }
  }

  @keyframes bodyCheckOnError {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-10px);
    }
    50% {
      transform: translateX(10px);
    }
    75% {
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>