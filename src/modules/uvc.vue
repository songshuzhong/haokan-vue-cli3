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
      <span class="sf-uvc__header__users">
        {{ time }}
      </span>
    </div>
    <template v-if="isReady">
      <ul
        v-loading="isInfoLoading"
        class="sf-uvc__list"
      >
        <li class="sf-uvc__list__title">
          {{ title }}
        </li>
        <template v-if="!uvcMapper.isEmpty">
          <template v-for="(value, key) in categories">
            <div
              v-if="uvcMapper[key]"
              :key="key"
              :data-label="key"
              class="sf-uvc__list__item"
            >
              <span
                :label="key"
                class="sf-uvc__list__item__label"
              >
                {{ getItemLabel(key) }}：
              </span>
              <div
                class="sf-uvc__list__item__value"
                :label="getItemValue(key, value)"
              >
                <span class="sf-uvc__list__item__value--ellipsis">
                  {{ getItemValue(key, value) }}
                </span>
              </div>
            </div>
          </template>
        </template>
        <template v-else>
          <div class="sf-uvc__list__item__empty">
            空
          </div>
        </template>
      </ul>
    </template>
  </div>
</template>
<script>
import uvcService from '@services/uvc';
import eventHub from '@services/eventHub';

export default {
  name: 'SfcUvc',
  props: {
    dynamicForm: {
      type: Object,
      required: true
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
      isDown: false,
      isInfoLoading: false,
      isApiLoading: false,
      isReady: false,
      categories: {},
      uvcMapper: {
        isEmpty: true
      },
      time: '',
      scrollTop: 0,
      startTop: 0,
    };
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
    uvcService.registerEventHub(this.dynamicForm.eventHub).onEventEffect();
    eventHub.on('uvc-service:info', detail => this.onInfoEventEffect(detail));
    eventHub.on('uvc-service:api', detail => this.onApiEventEffect(detail));

    window.addEventListener('scroll', e => this.onScrolling(e));
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScrolling);
  },
  methods: {
    getStartTop() {
      const section = this.$refs[`section${this.index}`];
      if (section) {
        const {top} = section.getBoundingClientRect();
        this.startTop = top;
      }
    },
    onScrolling() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.isDown = this.scrollTop - scrollTop > 0;
      this.scrollTop = scrollTop;

      const section = this.$refs[`section${this.index}`];
      if (section) {
        const sectionRect = section.getBoundingClientRect();
        const sectionReactP = section.parentNode.getBoundingClientRect();

        this.getAttention(section, sectionRect, sectionReactP);
      }
    },
    onApiEventEffect(detail) {
      if (detail.isLoading) {
        this.isApiLoading = true;
      } else if (!detail.isLoading && detail.data) {
        this.isApiLoading = false;
        this.time = detail.intersection_number;
      } else if (!detail.isLoading) {
        this.isApiLoading = false;
      }
    },
    onInfoEventEffect(detail) {
      if (detail.isLoading) {
        this.isInfoLoading = true;
      } else if (!detail.isLoading && detail.data) {
        this.isInfoLoading = false;
        this.uvcMapper.isEmpty = false;
        for (const key in detail.categories) {
          if (
            detail.categories.hasOwnProperty(key) &&
            this.categories.hasOwnProperty(key)
          ) {
            this.categories[key] = detail.categories[key];
          }
        }
        for (const key in detail.dynamicField) {
          if (detail.dynamicField.hasOwnProperty(key)) {
            this.uvcMapper[key] = detail.dynamicField[key];
          }
        }
      } else if (!detail.isLoading) {
        this.isInfoLoading = false;
      }
      // DOM重排完毕，获取准确距离
      this.getStartTop();
    },
    /**
     *
     * @param section 当前dom节点
     * @param sectionReact 当前dom节点信息
     * @param sectionRectP 当前dom父级节点信息
     * @desc 10: 10px缓冲 130: 浮动header高度和
     */
    getAttention(section, sectionReact, sectionRectP) {
      if (!this.isDown) {
        if (sectionRectP.bottom - 10 < sectionReact.bottom) {
          section.style.transform = `translate3d(0, ${sectionRectP.height - sectionReact.height}px, 0)`;
        } else if (sectionRectP.top < 130) {
          section.style.transform = `translate3d(0, ${this.scrollTop - this.startTop + 130}px, 0)`;
        }
      } else {
        if (sectionRectP.top + 10 > sectionReact.top) {
          // console.log('stop')
        } else if (sectionRectP.bottom >= sectionReact.height + 120) {
          section.style.transform = `translate3d(0, ${this.scrollTop - this.startTop + 120}px, 0)`;
        }
      }
    },
    getItemLabel(name) {
      let result;
      try {
        if (this.uvcMapper[name]) {
          result = this.uvcMapper[name].label;
        } else {
          result = name;
        }
      } catch (e) {
        console.error(e, name);
      }

      return result;
    },
    getItemValue(name, value) {
      if (this.uvcMapper[name]) {
        return this.uvcMapper[name].desc;
      }
      return value;
    },
  },
};
</script>
