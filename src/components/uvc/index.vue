<template>
  <div
    :ref="`section${index}`"
    class="sf-uvc"
  >
    <div
      v-if="showHead"
      v-loading="isApiLoading"
      class="sf-uvc__header"
    >
      <span class="sf-uvc__header__estimate">
        人群覆盖预估
      </span>
      <el-tooltip
        effect="dark"
        placement="top"
        content="根据微博各广告位日活用户量级计算得出，供参考最终数据以真实投放为准"
      >
        <span class="sf-uvc__header__estimate__tip" />
      </el-tooltip>
      <span class="sf-uvc__header__users">
        {{ time }}
      </span>
    </div>
    <template v-if="isReady">
      <div
        v-loading="isInfoLoading"
        class="sf-uvc__list"
      >
        <div class="sf-uvc__list__title">
          {{ title }}
        </div>
        <template v-if="isEmpty">
          <div class="sf-uvc__list__item__empty">
            空
          </div>
        </template>
        <div
          v-else
          class="sf-uvc__list__main"
          :style="{maxHeight: `${maxHeight}px`}"
        >
          <template v-for="(value, name, i) in uvcMapper">
            <template v-if="isPrimitiveType(value)">
              <sfc-uvc-item
                :key="value.desc+value.text"
                :index="i"
                :uvc-mapper="uvcMapper"
                :value="value"
                :name="name"
              />
            </template>
            <template v-else>
              <template v-for="(v, k) in value">
                <sfc-uvc-item
                  :key="v"
                  :index="i"
                  :uvc-mapper="uvcMapper"
                  :value="v"
                  :name="k"
                />
              </template>
            </template>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import DeepCopy from 'deep-copy';
import ElTooltip from 'element-ui/lib/tooltip';
import uvcService from './uvc';
import SfcUvcItem from './item';

export default {
  name: 'SfcUvc',
  components: {
    SfcUvcItem,
    ElTooltip
  },
  props: {
    dynamicForm: {
      type: Object,
      required: false
    },
    structure: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    showHead: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      eventHub: new Vue(),
      isDown: false,
      isInfoLoading: false,
      isApiLoading: false,
      isReady: false,
      categories: {},
      isEmpty: true,
      uvcMapper: {},
      time: '',
      scrollTop: 0,
      startTop: 0,
      sectionHeight: 0,
      maxHeight: 0,
      isTopChanged: false
    };
  },
  watch: {
    dynamicForm: {
      handler(val) {
        if (val) {
          uvcService.registerEventHub(this.dynamicForm.eventHub).onEventEffect();
          this.eventHub.on('uvc-service:info', detail => this.onInfoEventEffect(detail));
          this.eventHub.on('uvc-service:api', detail => this.onApiEventEffect(detail));
        }
      },
      immediate: true
    },
    sectionHeight: {
      handler(val, old) {
        if (val !== old) {
          this.maxHeight = val - 108 > 500? 500: val - 108;
        }
      }
    },
  },
  created() {
    Object.keys(this.structure.sections[this.index].fields).forEach(name => {
      if (!name.startsWith('fe')) {
        this.categories[name] = {};
      }
    });
    this.isReady = true;
  },
  mounted() {
    window.addEventListener('scroll', this.onScrolling);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScrolling);
  },
  methods: {
    isPrimitiveType(value) {
      return value.hasOwnProperty('desc');
    },
    getMaxHeight() {
      const section = document.querySelectorAll('.sf-uvc')[this.index - 2];
      const sectionP = section.parentNode;
      const sectionHeight = sectionP.offsetHeight;

      this.sectionHeight = sectionHeight - 40;
    },
    onScrolling() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const section = document.querySelectorAll('.sf-uvc')[this.index - 2];
      const sectionP = section.parentNode;
      const sectionHeight = sectionP.offsetHeight;

      this.startTop = sectionP.offsetTop;

      if (scrollTop - this.startTop + 50 > 0 && scrollTop - this.startTop + 50 < sectionHeight - section.offsetHeight) {
        section.style.transform = `translate3d(0, ${scrollTop - this.startTop + 50}px, 0)`;
      } else if (scrollTop - this.startTop + 50 <= 0) {
        section.style.transform = 'translate3d(0, 0px, 0)';
      } else {
        section.style.transform = `translate3d(0, ${sectionHeight - section.offsetHeight}px, 0)`;
      }
    },
    onApiEventEffect(detail) {
      if (detail.isLoading) {
        this.isApiLoading = true;
      } else if (!detail.isLoading && detail.data) {
        this.isApiLoading = false;
        this.time = detail.data.intersection_number;
        for (const key in detail.data) {
          if (
            detail.data.hasOwnProperty(key) &&
            this.categories.hasOwnProperty(key)
          ) {
            this.categories[key] = detail.data[key];
          }
        }
      } else if (!detail.isLoading) {
        this.isApiLoading = false;
      }
    },
    onInfoEventEffect(detail) {
      if (detail.isLoading) {
        this.isInfoLoading = true;
      } else if (!detail.isLoading && detail.data) {
        const uvcMapper = DeepCopy(this.uvcMapper);

        this.isInfoLoading = false;
        this.isEmpty = false;
        for (const key in this.categories) {
          if (this.categories.hasOwnProperty(key) && detail.data.hasOwnProperty(key)) {
            uvcMapper[key] = detail.data[key];
          }
        }
        this.uvcMapper = uvcMapper;
        this.getMaxHeight();
      } else if (!detail.isLoading) {
        this.isInfoLoading = false;
      }
    },
  },
};
</script>
