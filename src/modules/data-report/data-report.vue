<template>
  <div class="ft-report-wrapper">
    <navigator
        :isFixed="true"
        :items="tabItems"
        @toggle-tab="handleTabChange"
    />
    <router-view />
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';

  import '../../assets/styles/reset.scss';
  @Component
  export default class DataReport extends Vue {
    private tabItems = [
      {
        name: 'view1',
        text: 'view1'
      }, {
        name: 'view2',
        text: 'view2'
      }
    ];

    private handleTabChange(item: any): void {
      this.$router.push({path: item.name});
    }
  }
</script>
<style lang="scss">
  .ft-report-wrapper {
    padding-top: 50px;
  }
</style>
