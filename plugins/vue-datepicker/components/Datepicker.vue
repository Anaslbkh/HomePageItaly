<template>
  <div class="w-full vdp-datepicker" :class="[wrapperClass, isRtl ? 'rtl' : '']">
    <date-input
      :id="id"
      ref="datepickerBox"
      :selected-date="selectedDateValue"
      :pre-selected-date="preSelectedDate"
      :reset-typed-date="resetTypedDate"
      :format="format"
      :output-format="outputFormat"
      :translation="translation"
      :inline="inline"
      :name="name"
      :ref-name="refName"
      :placeholder="placeholder"
      :input-class="inputClass"
      :typeable="typeable"
      :clear-button="clearButton"
      :clear-button-icon="clearButtonIcon"
      :calendar-button="calendarButton"
      :calendar-button-icon="calendarButtonIcon"
      :calendar-button-icon-content="calendarButtonIconContent"
      :disabled="disabled"
      :required="required"
      :bootstrap-styling="bootstrapStyling"
      :use-utc="useUtc"
      @showCalendar="showCalendar"
      @closeCalendar="close"
      @typedDate="setTypedDate"
      @clearDate="clearDate"
    >
      <slot slot="afterDateInput" name="afterDateInput" />
    </date-input>

    <!-- Day View -->
    <picker-day
      :page-date="pageDate"
      :selected-date="selectedDate"
      :show-day-view="showDayView"
      :full-month-name="fullMonthName"
      :allowed-to-show-view="allowedToShowView"
      :disabled-dates="disabledDates"
      :highlighted="highlighted"
      :calendar-class="calendarClass"
      :calendar-style="calendarStyle"
      :translation="translation"
      :page-timestamp="pageTimestamp"
      :is-rtl="isRtl"
      :monday-first="mondayFirst"
      :day-cell-content="dayCellContent"
      :use-utc="useUtc"
      @changedMonth="handleChangedMonthFromDayPicker"
      @setDate="setDate"
      @selectDate="selectDate"
      @showMonthCalendar="showMonthCalendar"
      @showYearCalendar="showYearCalendar"
      @selectedDisabled="selectDisabledDate"
      @blurPickers="blurPickers"
    >
      <slot slot="beforeCalendarHeader" name="beforeCalendarHeader" />
    </picker-day>

    <!-- Month View -->
    <picker-month
      v-if="allowedToShowView('month')"
      ref="monthPicker"
      :page-date="pageDate"
      :selected-date="selectedDate"
      :show-month-view="showMonthView"
      :allowed-to-show-view="allowedToShowView"
      :disabled-dates="disabledDates"
      :calendar-class="calendarClass"
      :calendar-style="calendarStyle"
      :translation="translation"
      :is-rtl="isRtl"
      :use-utc="useUtc"
      @selectMonth="selectMonth"
      @showYearCalendar="showYearCalendar"
      @changedYear="setPageDate"
    >
      <slot slot="beforeCalendarHeader" name="beforeCalendarHeader" />
    </picker-month>

    <!-- Year View -->
    <picker-year
      v-if="allowedToShowView('year')"
      :page-date="pageDate"
      :selected-date="selectedDate"
      :show-year-view="showYearView"
      :allowed-to-show-view="allowedToShowView"
      :disabled-dates="disabledDates"
      :calendar-class="calendarClass"
      :calendar-style="calendarStyle"
      :translation="translation"
      :is-rtl="isRtl"
      :use-utc="useUtc"
      @selectYear="selectYear"
      @changedDecade="setPageDate"
    >
      <slot slot="beforeCalendarHeader" name="beforeCalendarHeader" />
    </picker-year>
  </div>
</template>
<script>
import utils, { makeDateUtils } from '../utils/DateUtils'
import DateInput from './DateInput.vue'
import PickerDay from './PickerDay.vue'
import PickerMonth from './PickerMonth.vue'
import PickerYear from './PickerYear.vue'

export default {
  components: {
    DateInput,
    PickerDay,
    PickerMonth,
    PickerYear
  },
  props: {
    value: {
      validator: val => utils.validateDateInput(val)
    },
    showOnSelectOnly: {
      type: Boolean,
      default: false
    },
    name: String,
    refName: String,
    id: String,
    format: {
      type: [String, Function],
      default: null
    },
    outputFormat: {
      type: [String, Function],
      default: 'yyyy-MM-dd'
    },
    lang: {
      type: String,
      default: 'en'
    },
    // language: {
    //   type: Object,
    //   default: () => en
    // },
    openDate: {
      validator: val => utils.validateDateInput(val)
    },
    preSelectedDate: {
      validator: val => utils.validateDateInput(val)
    },
    dayCellContent: Function,
    fullMonthName: Boolean,
    disabledDates: Object,
    highlighted: Object,
    placeholder: String,
    inline: Boolean,
    calendarClass: [String, Object, Array],
    inputClass: [String, Object, Array],
    wrapperClass: [String, Object, Array],
    mondayFirst: Boolean,
    clearButton: Boolean,
    clearButtonIcon: String,
    calendarButton: Boolean,
    calendarButtonIcon: String,
    calendarButtonIconContent: String,
    bootstrapStyling: Boolean,
    initialView: String,
    disabled: Boolean,
    required: Boolean,
    typeable: Boolean,
    useUtc: Boolean,
    minimumView: {
      type: String,
      default: 'day'
    },
    maximumView: {
      type: String,
      default: 'year'
    }
  },
  data() {
    const startDate = this.openDate ? new Date(this.openDate) : new Date()
    const constructedDateUtils = makeDateUtils(this.useUtc)
    const pageTimestamp = constructedDateUtils.setDate(startDate, 1)
    return {
      /*
       * Vue cannot observe changes to a Date Object so date must be stored as a timestamp
       * This represents the first day of the current viewing month
       * {Number}
       */
      pageTimestamp,
      /*
       * Selected Date
       * {Date}
       */
      selectedDate: null,
      /*
       * Selected Date that will be shown
       * {Date}
       */
      selectedDateValue: null,
      /*
       * Flags to show calendar views
       * {Boolean}
       */
      showDayView: false,
      showMonthView: false,
      showYearView: false,
      /*
       * Positioning
       */
      calendarHeight: 0,
      resetTypedDate: new Date(),
      utils: constructedDateUtils
    }
  },
  computed: {
    computedInitialView() {
      if (!this.initialView) {
        return this.minimumView
      }

      return this.initialView
    },
    pageDate() {
      return new Date(this.pageTimestamp)
    },

    translation() {
      return this.lang ? require('../locale/translations/' + this.lang).default : {}
    },
    calendarStyle() {
      return {
        position: this.isInline ? 'static' : undefined
      }
    },
    isOpen() {
      return this.showDayView || this.showMonthView || this.showYearView
    },
    isInline() {
      return !!this.inline
    },
    isRtl() {
      return this.translation.rtl === true
    }
  },
  watch: {
    value(value) {
      this.setValue(value, true)
    },
    openDate() {
      this.setPageDate()
    },
    initialView() {
      this.setInitialView()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * Called in the event that the user navigates to date pages and
     * closes the picker without selecting a date.
     */
    resetDefaultPageDate() {
      if (this.selectedDate === null) {
        this.setPageDate()
        return
      }
      this.setPageDate(this.selectedDate)
    },
    blurPickers() {
      this.showMonthView = this.showYearView = false
    },
    /**
     * Effectively a toggle to show/hide the calendar
     * @return {mixed}
     */
    showCalendar() {
      if (this.disabled || this.isInline) {
        return false
      }
      if (this.isOpen) {
        return this.close(true)
      }
      this.setInitialView()
    },
    /**
     * Sets the initial picker page view: day, month or year
     */
    setInitialView() {
      const initialView = this.computedInitialView
      if (!this.allowedToShowView(initialView)) {
        throw new Error(`initialView '${this.initialView}' cannot be rendered based on minimum '${this.minimumView}' and maximum '${this.maximumView}'`)
      }
      switch (initialView) {
        case 'year':
          this.showYearCalendar()
          break
        case 'month':
          this.showMonthCalendar()
          break
        default:
          this.showDayCalendar()
          break
      }

      this.$refs.datepickerBox.$refs[this.refName].focus()
    },
    /**
     * Are we allowed to show a specific picker view?
     * @param {String} view
     * @return {Boolean}
     */
    allowedToShowView(view) {
      const views = ['day', 'month', 'year']
      const minimumViewIndex = views.indexOf(this.minimumView)
      const maximumViewIndex = views.indexOf(this.maximumView)
      const viewIndex = views.indexOf(view)

      return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex
    },
    /**
     * Show the day picker
     * @return {Boolean}
     */
    showDayCalendar() {
      if (!this.allowedToShowView('day')) {
        return false
      }
      this.close()
      this.showDayView = true
      return true
    },
    /**
     * Show the month picker
     * @return {Boolean}
     */
    showMonthCalendar() {
      if (!this.allowedToShowView('month')) {
        return false
      }
      this.showYearView = false
      this.showMonthView = true
      return true
    },
    /**
     * Show the year picker
     * @return {Boolean}
     */
    showYearCalendar() {
      if (!this.allowedToShowView('year')) {
        return false
      }
      this.showMonthView = false
      this.showYearView = true
      return true
    },
    /**
     * Set the selected date
     * @param {Number} timestamp
     */
    setDate(timestamp) {
      const date = new Date(timestamp)
      this.selectedDate = this.selectedDateValue = date
      this.setPageDate(date)
      this.$emit('selected', date)
      this.$emit('input', date)
    },
    /**
     * Clear the selected date
     */
    clearDate() {
      this.selectedDate = null
      this.setPageDate()
      this.$emit('selected', null)
      this.$emit('input', null)
      this.$emit('cleared')
    },
    /**
     * @param {Object} date
     * @param {Boolean} keepOpen
     */
    selectDate(date, keepOpen = false) {
      if (keepOpen === false) {
        this.setDate(date.timestamp)
      } else {
        this.setValue(date.timestamp)
      }
      if (!this.isInline && keepOpen === false) {
        this.close(true)
      }
      this.resetTypedDate = new Date()
    },
    /**
     * @param {Object} date
     */
    selectDisabledDate(date) {
      this.$emit('selectedDisabled', date)
    },
    /**
     * @param {Object} month
     */
    selectMonth(month) {
      const date = new Date(month.timestamp)
      this.setPageDate(date)
      this.$emit('changedMonth', month)
      this.showDayCalendar()

      this.selectDate(month, true)
    },
    /**
     * @param {Object} year
     */
    selectYear(year) {
      const date = new Date(year.timestamp)
      this.setPageDate(date)
      this.$emit('changedYear', year)

      this.selectDate(year, true)

      this.showYearView = false
    },
    /**
     * Set the datepicker value
     * @param {Date|String|Number|null} date
     * @param {Boolean} force
     */
    setValue(date, force) {
      if (typeof date === 'string' || typeof date === 'number') {
        const parsed = new Date(date)
        date = isNaN(parsed.valueOf()) ? null : parsed
      }
      if (!date) {
        this.setPageDate()
        return
      }
      if (this.showOnSelectOnly === false || force === true) {
        this.selectedDateValue = date
      }
      this.setPageDate(date)
    },
    /**
     * Sets the date that the calendar should open on
     */
    setPageDate(date) {
      if (!date) {
        if (this.openDate) {
          date = new Date(this.openDate)
        } else {
          date = new Date()
        }
      }

      this.selectedDate = date
      this.pageTimestamp = this.utils.setDate(new Date(date), 1)

      this.blurPickers()
    },
    /**
     * Handles a month change from the day picker
     */
    handleChangedMonthFromDayPicker(date) {
      this.setPageDate(date)
      this.$emit('changedMonth', date)
    },
    /**
     * Set the date from a typedDate event
     */
    setTypedDate(date) {
      this.setDate(date.getTime())
    },
    /**
     * Close all calendar layers
     * @param {Boolean} emitEvent - emit close event
     */
    close(emitEvent) {
      this.showDayView = this.showMonthView = this.showYearView = false
      if (!this.isInline) {
        if (emitEvent) {
          this.$emit('closed')
        }
        document.removeEventListener('click', this.clickOutside, false)
      }
    },
    /**
     * Initiate the component
     */
    init() {
      if (this.value) {
        this.setValue(this.value, true)
      }
      if (this.openDate) {
        this.setPageDate()
      }
      if (this.isInline) {
        this.setInitialView()
      }
    }
  }
}
</script>
<style>
@import '../styles/style.css';
</style>
