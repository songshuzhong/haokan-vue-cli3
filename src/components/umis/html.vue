<template>
  <div v-html="html" />
</template>
<script>
export default {
  name: 'MisHtml',
  props: {
    html: {
      type: String,
      required: true,
    },
  },
}
</script>
