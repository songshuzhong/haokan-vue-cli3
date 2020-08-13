<template>
  <div class="sc-delivery-schedule">
    <div class="sc-delivery-schedule__content">
      <aside class="sc-delivery-schedule__frame">
        <div class="sc-delivery-schedule__category">
          星期/时间
        </div>
        <div
          v-for="week in 7"
          :key="week"
          class="sc-delivery-schedule__week"
          @click="onWeekClick(week)"
        >
          星期{{ weeks[week - 1] }}
        </div>
      </aside>
      <div class="sc-delivery-schedule__body">
        <div class="sc-delivery-schedule__time">
          <div class="sc-delivery-schedule__time__noon">
            00:00 - 11:00
          </div>
          <div class="sc-delivery-schedule__time__noon">
            12:00 - 23:00
          </div>
        </div>
        <table class="sc-delivery-schedule__body__table">
          <thead>
            <tr>
              <th
                v-for="hour in 24"
                :key="hour"
                :label="createTips(0, hour - 1)"
                class="sc-delivery-schedule__cell"
                @click="onTheadClick(hour - 1)"
              >
                {{ hour - 1 }}
              </th>
            </tr>
          </thead>
          <tbody @mouseleave="onMouseLeave">
            <tr v-for="week in 7" :key="week">
              <td
                v-for="hour in 24"
                :key="hour"
                ref="scheduleCell"
                class="sc-delivery-schedule__cell"
                :data-week="week"
                :data-hour="hour - 1"
                :class="isActive(collector, week, hour - 1) ? 'active' : ''"
                :label="createTips(week, hour - 1)"
                @click="onCellClick"
                @mousedown="onCellDown"
                @mousemove="onCellHover"
                @mouseup="onCellUp"
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="sc-delivery-schedule__tools">
      <div class="sc-delivery-schedule--active">
        已选
      </div>
      <div class="sc-delivery-schedule--unactive">
        未选
      </div>
      <div class="sc-delivery-schedule--tip">
        可拖动鼠标选择时间段
      </div>
      <div class="sc-delivery-schedule--clear" @click="onClearClick">
        清空
      </div>
    </div>
  </div>
</template>
<script>
import DeepCopy from 'deep-copy'
export default {
  name: 'ScDeliverySchedule',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      startX: 0,
      startY: 0,
      isClick: false,
      isDragging: false,
      collector: this.value || {},
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
    }
  },
  watch: {
    value: {
      handler(val) {
        this.collector = val
      },
      immediate: true,
    },
    collector(val) {
      this.$emit('input', val)
    },
  },
  methods: {
    isActive(collector, week, hour) {
      return collector[week] && collector[week].includes(hour)
    },
    isCovered(event, cell) {
      const x = event.target.offsetLeft
      const y = event.target.offsetTop
      const minX = Math.min(x, this.startX)
      const maxX = Math.max(x, this.startX)
      const minY = Math.min(y, this.startY)
      const maxY = Math.max(y, this.startY)

      return (
        cell.offsetLeft >= minX &&
        cell.offsetLeft <= maxX &&
        cell.offsetTop >= minY &&
        cell.offsetTop <= maxY
      )
    },
    createTips(week, hour) {
      const time = hour < 10 ? '0' + hour : hour
      const weeky = week ? `星期${this.weeks[week - 1]}` : ''

      return `${weeky} ${time}:00 - ${time}:59`
    },
    onClearClick() {
      this.collector = {}
    },
    onCellClick(event) {
      if (this.isClick) {
        const collector = DeepCopy(this.collector) || {}
        const week = Number(event.target.dataset.week)
        const hour = Number(event.target.dataset.hour)

        this.reflushCollector(collector, week, hour)
        this.collector = collector
      }
    },
    onCellDown(event) {
      this.isClick = true
      this.isDragging = true
      this.startX = event.target.offsetLeft
      this.startY = event.target.offsetTop
    },
    onCellHover(event) {
      this.isClick = false
      if (this.isDragging) {
        this.$refs.scheduleCell.forEach(cell => {
          if (this.isCovered(event, cell)) {
            cell.classList.add('on-hover')
          } else {
            cell.classList.remove('on-hover')
          }
        })
      }
    },
    onMouseLeave() {
      const collector = DeepCopy(this.collector) || {}
      this.isDragging = false
      this.$refs.scheduleCell.forEach(cell => {
        if (cell.classList.contains('on-hover')) {
          const week = Number(cell.dataset.week)
          const hour = Number(cell.dataset.hour)

          this.reflushCollector(collector, week, hour)
          cell.classList.remove('on-hover')
        }
      })
      this.collector = collector
    },
    onCellUp(event) {
      const collector = DeepCopy(this.collector) || {}

      this.$refs.scheduleCell.forEach(cell => {
        cell.classList.remove('on-hover')

        if (!this.isClick && this.isCovered(event, cell)) {
          const week = Number(cell.dataset.week)
          const hour = Number(cell.dataset.hour)

          this.reflushCollector(collector, week, hour)
        }
      })
      this.collector = collector
      this.isDragging = false
    },
    onTheadClick(hour) {
      const collector = DeepCopy(this.collector) || {}
      for (let i = 1; i < 8; i++) {
        if (!collector[i]) {
          collector[i] = [hour]
        } else if (collector[i].indexOf(hour) === -1) {
          collector[i].push(hour)
        }
      }
      this.collector = collector
    },
    onWeekClick(week) {
      const collector = DeepCopy(this.collector) || {}
      const hours = []
      for (let i = 0; i < 24; i++) {
        hours.push(i)
      }
      collector[week] = hours
      this.collector = collector
    },
    reflushCollector(collector, week, hour) {
      if (!collector[week]) {
        collector[week] = [hour]
      } else if (collector[week] && !collector[week].includes(hour)) {
        collector[week].push(hour)
      } else if (collector[week] && collector[week].includes(hour)) {
        collector[week] = collector[week].filter(item => item !== hour)
        if (!collector[week].length) {
          delete collector[week]
        }
      }
    },
  },
}
</script>
<style lang="scss">
.sc-delivery-schedule {
  position: relative;
  width: 536px;
}

.sc-delivery-schedule__content {
  border-radius: 4px;
  overflow: hidden;
  border: solid 1px $sc-panel-border-color;
  border-bottom: 0;
}

.sc-delivery-schedule__tools {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
}

.sc-delivery-schedule--unactive {
  position: absolute;
  left: 22px;
  font-size: 12px;
  color: $sc-text-color;

  &:before {
    position: absolute;
    left: -22px;
    width: 12px;
    height: 12px;
    border: solid 1px $sc-panel-border-color;
    border-radius: 50%;
    background-color: $sc-delivery-schedule-cell-fill;
    content: '';
  }
}

.sc-delivery-schedule--active {
  position: absolute;
  left: 66px + 22px;
  font-size: 12px;
  color: $sc-text-color;

  &:before {
    position: absolute;
    left: -22px;
    width: 12px;
    height: 12px;
    border: solid 1px $sc-delivery-schedule-cell-active-fill;
    border-radius: 50%;
    background-color: $sc-delivery-schedule-cell-active-fill;
    content: '';
  }
}

.sc-delivery-schedule--tip {
  position: absolute;
  left: 50%;
  font-size: 12px;
  color: $sc-text-color-tip;
  transform: translate3d(-50%, 0, 0);
}

.sc-delivery-schedule--clear {
  @include link();
  position: absolute;
  right: 0;
  height: 26px;
  font-size: 12px;
  line-height: 25px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
}

.sc-delivery-schedule__body {
  width: 456px;
  margin-left: 80px;
}

.sc-delivery-schedule__time {
  width: 456px;
  height: $sc-input-height;
  display: flex;
  align-items: center;
  background: $sc-delivery-schedule-header-fill;
  border: 1px solid $sc-panel-border-color;
  border-bottom: 0;
  border-top: 0;
}

.sc-delivery-schedule__time__noon {
  width: 50%;
  height: $sc-input-height;
  font-size: 12px;
  color: $sc-text-color;
  line-height: $sc-input-height;
  text-align: center;

  &:first-child {
    border-right: 1px solid $sc-input-border-color;
  }
}

.sc-delivery-schedule__frame {
  position: absolute;
  width: 80px;
}

.sc-delivery-schedule__category {
  position: relative;
  width: 80px;
  height: 64px;
  border: 1px solid $sc-panel-border-color;
  border-left: 0;
  border-top: 0;
  background: $sc-delivery-schedule-header-fill;
  border-right: 0;
  text-align: center;
  line-height: 64px;
  font-size: 12px;
  color: $sc-text-color;
}

.sc-delivery-schedule__category__time {
  text-align: right;
}

.sc-delivery-schedule__category__week {
  line-height: 34px;
}

.sc-delivery-schedule__week {
  width: 80px;
  height: $sc-input-height;
  border-bottom: 1px solid $sc-panel-border-color;
  line-height: $sc-input-height;
  text-align: center;
  font-size: 12px;
  color: $sc-text-color;
  background-color: $sc-delivery-schedule-header-fill;
  cursor: pointer;
}

.sc-delivery-schedule__body__table {
  border-collapse: collapse;
  border-spacing: 0;
  border: 0;
  cursor: crosshair;
  th {
    background-color: $sc-delivery-schedule-hour-fill;
    cursor: pointer;
    &.sc-delivery-schedule__cell {
      height: 26px;
      line-height: 26px;
    }
  }
  td {
    background-color: $sc-delivery-schedule-cell-fill;
  }
}

.sc-delivery-schedule__cell {
  width: 19px;
  height: $sc-input-height;
  border: 1px solid $sc-panel-border-color;
  font-size: 12px;
  color: $sc-text-color;
  line-height: $sc-input-height;

  &:hover {
    background-color: $sc-delivery-schedule-cell-hover-fill;

    &:after {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 150px;
      height: 27px;
      margin-left: 14px;
      margin-top: 14px;
      padding: 5px;
      background-color: $sc-white;
      border-radius: 5px;
      border: 1px solid $sc-panel-border-color;
      text-align: center;
      font-size: 12px;
      color: $sc-text-color;
      content: attr(label);
      z-index: 2;
    }
  }

  &.active {
    background-color: $sc-delivery-schedule-cell-active-fill;
  }

  &.on-hover {
    background-color: $sc-delivery-schedule-cell-hover-fill;
  }
}
</style>
