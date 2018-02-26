<template>
  <p v-if="listItems.length <= 0" class="zeus-empty-prompt">
    未查到数据
  </p>
  <group v-else class="zeus-base-list">
    <cell
      v-for="(item, key) in listItems"
      :key="key"
      :title="item.text"
      :inline-desc="item.desc"
      is-link
      :link="link ? `${link}?${getUrlParams(item)}` : undefined"
      @click.native="onClick(item, $event)"
    />
  </group>
</template>

<script>
  import { querystring } from 'vux';

  export default {
    name: 'default-list',
    props: {
      'list-items': {
        type: Array,
        default: () => ([])
      },
      url: {
        type: String,
        default: ''
      },
      link: {
        type: String,
        default: ''
      },
      onCellClick: {
        type: Function
      }
    },
    methods: {
      getUrlParams: item => querystring.stringify(item),
      onClick(item, e) {
        e.stopPropagation();
        if (this.onCellClick) {
          this.onCellClick(item);
        }
      }
    }
  };
</script>
