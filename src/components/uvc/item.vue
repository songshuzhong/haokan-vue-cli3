<template functional>
  <div
    class="sf-uvc__list__item"
    :class="{'first-child': props.index === 0}"
  >
    <span class="sf-uvc__list__item__label">
      {{ props.value.desc }}：
    </span>
    <div class="sf-uvc__list__item__value">
      {{ props.value.text }}
    </div>
  </div>
</template>
