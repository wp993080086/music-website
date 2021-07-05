import Vue from "vue";
import {
  Button,
  Input,
  Message,
  MessageBox,
  Notification,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Radio,
  RadioGroup,
  RadioButton,
  Tabs,
  TabPane
} from "element-ui";

Vue.use(Button)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Tabs)
Vue.use(TabPane)

//消息组件需要进行全局挂载
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification