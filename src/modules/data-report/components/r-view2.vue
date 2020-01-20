<template>
  <div>
    <process-pie />
    <process-bar :value="100" />
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import Processor from '@/modules/data-report/components/c-process.vue';
  import ProcessPie from '@/modules/data-report/components/c-process-pie.vue';
  import ProcessBar from '@/modules/data-report/components/c-process-bar1.vue';

  @Component({
    components: {
      Processor,
      ProcessPie,
      ProcessBar
    }
  })
  export default class View2 extends Vue {}
</script>
