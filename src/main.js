import { createApp } from 'vue'
import './styles/wind.css'
import App from './App.vue'
import router from './router.js'
import { plugin, defaultConfig } from '@formkit/vue'
import axios from 'axios'
import config from '../formkit.config'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
    RiAccountPinBoxLine, FcSalesPerformance, PrSend, CoAmazonPay, CoUnity, MdCategoryOutlined, GiPillDrop,
    IoLogoGooglePlaystore, BiChevronRight, BiChevronDown, BiHeart,
    FaUsersCog, MdManageaccountsTwotone, MdAddcard,
    RiDashboardFill, IoSettingsOutline, BiPlusLg, BiListUl, BiPrinter,
    BiCartDash, BiLayers, BiClipboard2, MdDeleteforeverOutlined, FaRegularEdit,
    MdDashboardcustomizeOutlined, IoNotificationsOutline, RiArrowGoBackFill,
    LaTimesSolid, BiSearch, BiCalendarCheckFill, RiHandCoinLine, FcCalendar, HiDocumentReport, MdStoreTwotone
} from "oh-vue-icons/icons";
import DefaultPage from './layout/Login.vue'
import BaseMaster from './components/BaseMaster.vue'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

addIcons(RiAccountPinBoxLine, RiHandCoinLine, BiListUl, BiPrinter, MdDeleteforeverOutlined, RiArrowGoBackFill, PrSend, CoAmazonPay, BiHeart, FcCalendar, MdStoreTwotone, HiDocumentReport, BiCalendarCheckFill, BiSearch, CoUnity, FcSalesPerformance, IoLogoGooglePlaystore, GiPillDrop, BiCartDash, MdManageaccountsTwotone, MdCategoryOutlined, BiChevronRight, FaUsersCog, BiChevronDown, MdAddcard, RiDashboardFill, IoSettingsOutline, BiPlusLg, BiCartDash, BiLayers, BiClipboard2, MdDashboardcustomizeOutlined, IoNotificationsOutline, FaRegularEdit, LaTimesSolid);

const pinia = createPinia()
const app = createApp(App);
axios.defaults.baseURL = 'http://localhost:7000/api/v1/'

// axios.defaults.baseURL = 'http://localhost:7000/api/v1/'
// axios.defaults.baseURL = 'http://192.168.100.214:7000/api/v1/'
let token = localStorage.getItem('token')
const auth = token ? `Bearer${token}` : ''
axios.defaults.headers.common['Authorization'] = auth;
app.component('DefaultPage', DefaultPage)
app.component('BaseMaster', BaseMaster)
app.use(ToastPlugin)
app.use(pinia)
app.component("icon", OhVueIcon);
app.use(plugin, defaultConfig(config))
app.use(router);

app.mount('#app')
