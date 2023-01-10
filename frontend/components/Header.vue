<template>
  <div class="px-6 lg:px-8">
    <div
      class="mx-auto max-w-3xl pt-10 pb-20 sm:pt-5 sm:pb-10 flex flex-row justify-evenly items-center content-center"
    >
      <h1 class="text-4xl font-bold tracking-tight text-teal-500">
        Ramen Recommendation Engine
      </h1>
      <img src="/ramen.png" class="w-10 h-10" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Header",
});
</script>
