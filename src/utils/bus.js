import Vue from 'vue'
const Bus = new Vue()
Bus.emit = Bus.$emit
Bus.on = Bus.$on
Bus.once = Bus.$once
Bus.off = Bus.$off

export default Bus
