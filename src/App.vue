<script setup>
import NavBar from './components/NavBar.vue';
import PromoBanner from './components/PromoBanner.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <PromoBanner />
  <NavBar />
  <RouterView />
  <Footer />
</template>