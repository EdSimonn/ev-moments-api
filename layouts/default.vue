<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from "~/components/Footer.vue";
import Navbar from "~/components/Navbar.vue";
</script>
