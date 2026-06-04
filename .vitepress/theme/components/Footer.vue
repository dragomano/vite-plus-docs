<template>
  <footer class="bg-primary" data-theme="dark">
    <Sponsors
      description="Vite+ — бесплатный инструмент с открытым исходным кодом. Его создание стало возможным благодаря полноценной команде и увлечённым контрибьюторам open-source."
      sponsorLinkText="Внести вклад"
      sponsorLink="https://github.com/voidzero-dev/vite-plus/blob/main/CONTRIBUTING.md"
    />
    <section class="wrapper">
      <Footer
        heading="Повысьте продуктивность вашей команды на новый уровень с помощью Vite+"
        subheading=" "
        button-text="Первые шаги"
        button-link="/guide"
      />
    </section>
  </footer>
</template>

<style scoped></style>
<script setup lang="ts">
import Footer from '@components/oss/Footer.vue';
import Sponsors from '@components/oss/Sponsors.vue';
</script>
