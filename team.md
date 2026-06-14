---
layout: page
title: Наша команда
description: Развитием Vite+ руководит международная команда.
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamPageSection,
  VPTeamMembers
} from '@voidzero-dev/vitepress-theme'
import { core } from './_data/team'
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Наша команда</template>
    <template #lead>
      Участники команды, работающие над Vite+ и отвечающие за его разработку, сопровождение и взаимодействие с сообществом.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="core" />
  <!-- <VPTeamPageSection v-if="emeriti.length">
    <template #title>Почётные участники команды</template>
    <template #lead>
      Здесь мы отдаём дань уважения бывшим участникам команды, которые внесли значительный вклад в развитие проекта в прошлом.
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="emeriti" />
    </template>
  </VPTeamPageSection> -->
</VPTeamPage>
