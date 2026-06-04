<script setup lang="ts">
import FeatureRunTerminal from './FeatureRunTerminal.vue';
</script>

<template>
  <section id="feature-run" class="wrapper border-t grid md:grid-cols-2 md:divide-x divide-nickel">
    <div class="px-5 py-6 md:p-10 flex flex-col justify-between gap-15">
      <div class="flex flex-col gap-5">
        <span class="text-grey text-xs font-mono uppercase tracking-wide">Vite+ run</span>
        <h4 class="text-white">Задача Vite для монорепозиториев и сценариев</h4>
        <p class="text-white/70 text-base max-w-[25rem] text-pretty">
          Запускайте встроенные команды и сценарии
          <code class="mx-1 outline-none bg-nickel/50 text-aqua">package.json</code>
          с автоматическим кэшированием и выполнением с учётом зависимостей.
        </p>
        <ul class="checkmark-list">
          <li>Автоматическое отслеживание входных данных для кэшируемых задач</li>
          <li>Выполнение с учётом зависимостей между пакетами рабочего пространства</li>
          <li>
            Привычный запуск сценариев через
            <code class="mx-1 outline-none bg-nickel/50 text-aqua">vp run</code>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col min-h-[22rem] sm:min-h-[30rem]">
      <div class="bg-viteplus pl-5 sm:pl-10 h-full overflow-clip flex flex-col justify-center py-6">
        <FeatureRunTerminal />
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-viteplus {
  background-image: url('@local-assets/backgrounds/viteplus.jpg');
  background-size: cover;
  background-position: center;
}
</style>
