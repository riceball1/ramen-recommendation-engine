<template>
  <div class="bg-black text-slate-50 h-screen">
    <Header />
    <main>
      <div class="px-6 lg:px-8">
        <h2
          class="text-4xl font-bold tracking-tight sm:text-center sm:text-4xl p-6"
        >
          Ramen Recommendation Quiz
        </h2>
        <form
          @submit.prevent="handleSubmit"
          class="p-6 lg:p-8 flex content-center flex-col gap-3 m-auto border-solid border-2 border-teal-500 max-w-xl "
        >
          <div class="flex justify-center content-center items-center flex-col">
            <h3>Do you eat meat or not?</h3>
            <fieldset
              class="mt-6 text-lg leading-8 sm:text-center flex justify-center content-center items-center gap-5"
            >
              <label for="yes-meat">Yes</label>
              <input
                type="radio"
                value="yes"
                class="h-10"
                id="yes-meat"
                name="meat"
              />
              <label for="no-meat">No</label>
              <input
                type="radio"
                value="no"
                class="h-10"
                id="no-meat"
                name="meat"
              />
            </fieldset>
          </div>

          <div class="flex justify-center content-center items-center flex-col">
            <h3>Do you have any allergies?</h3>
            <fieldset
              class="mt-6 text-lg leading-8 sm:text-center flex justify-center content-center items-center gap-5"
            >
              <label for="yes-allergies">Yes</label>
              <input
                type="radio"
                value="yes"
                class="h-10"
                id="yes-allergies"
                name="allergies"
              />
              <label for="no-allergies">No</label>
              <input
                type="radio"
                value="no"
                class="h-10"
                id="no-allergies"
                name="allergies"
              />
            </fieldset>
          </div>

          <div class="flex justify-center content-center items-center flex-col">
            <h3>Are you trying to save money?</h3>

            <fieldset
              class="mt-6 text-lg leading-8 sm:text-center flex justify-center content-center items-center gap-5"
            >
              <label for="yes-cheap">Yes</label>
              <input
                type="radio"
                value="yes"
                class="h-10"
                id="yes-cheap"
                name="cheap"
              />
              <label for="no-cheap">No</label>
              <input
                type="radio"
                value="no"
                class="h-10"
                id="no-cheap"
                name="cheap"
              />
            </fieldset>
          </div>

          <div class="flex justify-center content-center items-center flex-col">
            <h3>Do you like to eat spicy food?</h3>
            <fieldset
              class="mt-6 text-lg leading-8 sm:text-center flex justify-center content-center items-center gap-5"
            >
              <label for="yes-spicy">Yes</label>
              <input
                type="radio"
                value="yes"
                class="h-10"
                id="yes-spicy"
                name="spicy"
              />
              <label for="no-spicy">No</label>
              <input
                type="radio"
                value="no"
                class="h-10"
                id="no-spicy"
                name="spicy"
              />
            </fieldset>
          </div>

          <div class="flex justify-center content-center items-center flex-col">
            <h3>Do you like thin or thick noodles?</h3>

            <fieldset
              class="mt-6 text-lg leading-8 sm:text-center flex justify-center content-center items-center gap-5"
            >
              <label for="thick">Thick</label>
              <input
                type="radio"
                value="thick"
                class="h-10"
                id="thick"
                name="noodle-type"
              />
              <label for="thin">Thin</label>
              <input
                type="radio"
                value="thin"
                class="h-10"
                id="thin"
                name="noodle-type"
              />
            </fieldset>
          </div>

          <button
            type="submit"
            class="inline-block rounded-lg bg-teal-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-teal-200 hover:bg-black hover:ring-teal flex self-center"
          >
            Submit Quiz
          </button>
        </form>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
export default {
  methods: {
    handleSubmit: function () {
      alert("Quiz submitted!");
    },
  },
};
</script>
