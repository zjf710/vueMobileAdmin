<template>
  <div class="zeus-group-list">
    <group v-for="(group, i) in groupItems" :key="i" :title="group.groupTitle">
      <cell
        v-for="(item, key) in group.items"
        :key="key"
        :title="item.text"
        is-link
        :link="link ? `${link}?${getUrlParams(item, group)}` : undefined"
        @click.native="onClick(item, group, $event)"
      />
    </group>
    <p v-if="groupItems.length <= 0" class="zeus-empty-prompt">
      未查到数据
    </p>
  </div>
</template>

<script>
  import { querystring } from 'vux';

  export default {
    name: 'group-list',
    props: {
      'group-items': {
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
      getUrlParams(item, group) {
        const params = {
          group: group.value
        };
        return querystring.stringify(Object.assign({}, params, item));
      },
      onClick(item, group, e) {
        e.stopPropagation();
        if (this.onCellClick) {
          this.onCellClick(item, group);
        }
      }
    }
  };
</script>
