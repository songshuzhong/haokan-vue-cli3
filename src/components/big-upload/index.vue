<template>
  <div>
    <uploader />
    <list />
  </div>
</template>
<script>
import Uploader from './head'
import List from './list'

export default {
  name: 'BigUpload',
  components: {
    Uploader,
    List,
  },
}
</script>
