import {
  Group,
  GroupTitle,
  Cell,
  Popup,
  XInput,
  XButton,
  Search,
  CheckIcon,
  WechatPlugin,
  ToastPlugin,
  LoadingPlugin
} from 'vux';

import ViewBox from '../components/ViewBox/ViewBox';
import PopupSelector from '../components/PopupSelector/PopupSelector';

// 注册组件
export default (VueTemp) => {
  const Vue = VueTemp;

  // 第三方组件
  Vue.component('zsButton', XButton);
  Vue.component('group', Group);
  Vue.component('groupTitle', GroupTitle);
  Vue.component('cell', Cell);
  Vue.component('zsInput', XInput);
  Vue.component('popup', Popup);
  Vue.component('search', Search);
  Vue.component('checkIcon', CheckIcon);

  // 本地组件
  Vue.component('viewBox', ViewBox);
  Vue.component('popupSelector', PopupSelector);

  // toast工具，设置默认值
  Vue.use(ToastPlugin, {
    type: 'text',
    position: 'middle',
    width: '80%',
    time: 3000
  });
  // loading工具
  Vue.use(LoadingPlugin);
  // 微信工具注册
  Vue.use(WechatPlugin);
};
