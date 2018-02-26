import Soul from './Soul';
import Body from '../main/Body/Body';
import Menu from '../main/Home/Menu';

const routerConfigs = [{
  path: '/',
  name: '菜单',
  component: Menu
}];

Soul.menu.forEach((item) => {
  item.pages.forEach((page) => {
    routerConfigs.push({
      path: page.router,
      name: page.title,
      component: Body,
      props: () => page
    });
  });
});

export default routerConfigs;
