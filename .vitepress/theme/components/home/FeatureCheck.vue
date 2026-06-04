<script setup lang="ts">
import oxcIcon from '@assets/icons/oxc-light.svg';
</script>

<template>
  <section id="feature-check" class="wrapper border-t grid md:grid-cols-2 divide-x divide-nickel">
    <div class="px-5 py-6 md:p-10 flex flex-col justify-between gap-15">
      <div class="flex flex-col gap-5">
        <span class="text-grey text-xs font-mono uppercase tracking-wide">Vite+ check</span>
        <h4 class="text-white">Форматирование, линтинг и проверка типов за один проход</h4>
        <p class="text-white/70 text-base max-w-[25rem] text-pretty">
          Поддерживайте единообразие в каждом репозитории одной командой на базе Oxlint, Oxfmt и
          <code class="mx-1 outline-none bg-nickel/50 text-aqua">tsgo</code>.
        </p>
        <ul class="checkmark-list">
          <li>
            Форматирование, совместимое с <code class="mx-1 outline-none bg-nickel/50 text-aqua">Prettier</code>
          </li>
          <li>
            Более 750 правил, совместимых с <code class="mx-1 outline-none bg-nickel/50 text-aqua">ESLint</code>
          </li>
          <li>
            Линтинг с учётом типов и быстрая проверка типов с помощью
            <code class="mx-1 outline-none bg-nickel/50 text-aqua">tsgo</code>
          </li>
          <li>
            <code class="mx-1 outline-none bg-nickel/50 text-aqua">vp check --fix</code> автоматически исправляет, где это возможно
          </li>
        </ul>
      </div>
      <div class="flex flex-wrap gap-3">
        <div class="px-3 py-1.5 bg-slate rounded w-fit flex gap-2 items-center">
          <span class="text-grey text-sm font-mono hidden md:inline">На базе</span>
          <a href="https://oxc.rs/" target="_blank">
            <figure class="project-icon">
              <img loading="lazy" :src="oxcIcon" alt="Oxc" class="w-[20px] h-[12px]" />
              <figcaption>Oxc / Oxlint</figcaption>
            </figure>
          </a>
        </div>
        <div class="px-3 py-1.5 bg-slate rounded w-fit flex gap-2 items-center">
          <span class="text-grey text-sm font-mono hidden md:inline">На базе</span>
          <a href="https://oxc.rs/docs/guide/usage/formatter" target="_blank">
            <figure class="project-icon">
              <img loading="lazy" :src="oxcIcon" alt="Oxc" class="w-[20px] h-[12px]" />
              <figcaption>Oxc / Oxfmt</figcaption>
            </figure>
          </a>
        </div>
      </div>
    </div>
    <div class="flex flex-col min-h-[22rem] sm:min-h-[30rem]">
      <div class="bg-oxc pl-10 h-full flex flex-col justify-center overflow-clip">
        <div
          class="mr-5 sm:mr-10 px-5 py-6 relative bg-slate rounded-tl rounded-bl outline-1 outline-offset-[2px] outline-white/20 font-mono text-sm leading-[1.5rem] text-white"
        >
          <div class="text-white">$ vp check</div>
          <div class="h-4" />
          <div>
            <span class="terminal-blue">pass:</span>
            All <span class="text-white">42 files</span> are correctly formatted
            <span class="text-grey">(88ms, 16 threads)</span>
          </div>
          <div class="h-4" />
          <div class="text-grey">
            <span class="terminal-blue">pass:</span>
            Found no warnings, lint errors, or type errors in
            <span class="text-white">42 files</span>
            <span class="text-grey">(184ms, 16 threads)</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-oxc {
  background-image: url('@local-assets/backgrounds/oxc.jpg');
  background-size: cover;
  background-position: center;
}
</style>
