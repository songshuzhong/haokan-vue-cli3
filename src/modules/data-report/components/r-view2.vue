<template>
  <div>
    <process-pie />
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import Processor from '@/modules/data-report/components/c-process.vue';
  import ProcessPie from '@/modules/data-report/components/c-process-pie.vue';

  @Component({
    components: {
      Processor,
      ProcessPie
    }
  })
  export default class View2 extends Vue {}
</script>
