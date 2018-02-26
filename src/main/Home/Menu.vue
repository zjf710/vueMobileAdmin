<template>
  <div class="zeus-menu">
    <router-link
      v-for="(item, key) in menu"
      v-if="!item.hidden"
      class="menu-item"
      :to="item.pages[0].router"
      :key="key"
    >
      <span class="icon-container">
        <i :class="`anticon icon-${item.iconName}`" />
      </span>
      <span>{{item.menuName}}</span>
    </router-link>
    <div v-if="$root.environment === 'development'" class="menu-item">
      <span class="icon-container">
        <i class="anticon icon-plus" />
      </span>
      <span>添加菜单</span>
    </div>
  </div>
</template>

<script>
  import { menu } from '../../configs/Soul';
  import './index.scss';

  export default {
    name: 'Menu',
    data() {
      return {
        menu
      };
    }
  };
</script>
