<template>
  <el-avatar
    :icon="icon"
    :shape="shape"
    :size="size"
    :fit="fit"
    :src="src"
    :src-set="srcSet"
    :alt="alt"
  />
</template>
<script>
import ElAvatar from 'element-ui/lib/avatar'

export default {
  name: 'MisAvatar',
  components: {
    ElAvatar,
  },
  props: {
    icon: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
      default: 'large',
      options: ['number', 'large', 'medium', 'small'],
    },
    shape: {
      type: String,
      required: false,
      default: 'circle',
      options: ['circle', 'square'],
    },
    src: {
      type: String,
      required: false,
    },
    srcSet: {
      type: String,
      required: false,
    },
    alt: {
      type: String,
      required: false,
    },
    fit: {
      type: String,
      required: false,
      default: 'cover',
      options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    },
  },
}
</script>
