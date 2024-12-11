<script setup lang="ts">
import { Chart } from '@antv/g2';
import { onMounted, ref } from 'vue';

const chartRef = ref();

onMounted(() => {

  const chart = new Chart({ container: chartRef.value });

  chart.options({
    type: "interval",
    autoFit: true,
    data: [
      { letter: "A", frequency: 0.08167 },
      { letter: "B", frequency: 0.01492 },
      { letter: "C", frequency: 0.02782 },
      { letter: "D", frequency: 0.04253 },
      { letter: "E", frequency: 0.12702 },
      { letter: "F", frequency: 0.02288 },
    ],
    encode: { x: "letter", y: "frequency", color: 'letter' },
    scale: {
      color: { palette: 'ylGn' }
    },
    coordinate: { transform: [{ type: "transpose" }] },


  });
  chart.render();
})


</script>

<template>
  <div>
    <div ref="chartRef" style="" </div>
    </div>
</template>

<style scoped lang="scss"></style>
