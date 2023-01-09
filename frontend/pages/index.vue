<template>
  <div class="bg-black text-slate-50 h-screen">
    <Header />
    <main>
      <div class="px-6 lg:px-8">
        <div class="mx-auto max-w-3xl pt-15 pb-32 sm:pt-24 sm:pb-40">
          <h2
            class="text-4xl font-bold tracking-tight sm:text-center sm:text-4xl"
          >
            Hungry for ramen?
          </h2>
          <p class="mt-6 text-lg leading-8 text-gray-600 sm:text-center text-teal-500">
            Too many choices can stop us in our tracks. That's why we're here to
            help you figure out what kind of ramen will help fill your tummy.
          </p>
          <div class="mt-8 flex gap-x-4 sm:justify-center">
            <a
              href="#"
              class="inline-block rounded-lg bg-teal-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-teal-200 hover:bg-black hover:ring-teal"
            >
              Take the ramen quiz!
              <span class="text-white" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "IndexPage",
});
</script>
