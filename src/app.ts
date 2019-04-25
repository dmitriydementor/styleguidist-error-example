import '@babel/polyfill'

require('./scripts/bootstrap-datetimepicker')

// Libraries imports
import Vue from 'vue'
import Toastr from 'vue-toastr'
import VueEvents from 'vue-events'
import VModal from 'vue-js-modal'
import VueResource from 'vue-resource'
import 'vue-datetime/dist/vue-datetime.css'
import { Datetime } from 'vue-datetime'
import { Settings } from 'luxon'

// Custom imports
import Datepicker from './components/Datepicker.vue'
import CrudTable from '@/components/common/tables/CrudTable.vue'


// Component declarations
Vue.component('date-picker', Datepicker)
Vue.component('crud-table', CrudTable)

// Library applies
Settings.defaultLocale = 'nl'
Vue.use(Datetime)
Vue.use(VModal)
Vue.use(VueEvents)
Vue.use(VueResource)
Vue.use(Toastr)

interface VueInterface {
    $toastr
}

const app = new Vue({
    el: '#app',
})

// Exports
export const eventHub = new Vue()
export const vm: VueInterface = new Vue()
