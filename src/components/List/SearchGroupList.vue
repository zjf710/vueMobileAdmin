<template>
  <div class="zeus-search-group-list">
    <search ref="search" :placeholder="searchPlaceholder" :value="keyword" @on-change="onChange" :autoFixed="false" />
    <group-list
      :groupItems="groupItems"
      :url="url"
      :link="linkTo"
      :onCellClick="onClick"
    />
  </div>
</template>

<script>
  import _ from 'lodash';
  import { querystring } from 'vux';

  import GroupList from './GroupList';
  import './index.scss';

  export default {
    name: 'search-group-list',
    components: {
      GroupList
    },
    data() {
      return {
        groupItemsOrg: [],
        groupItems: [],
        keyword: ''
      };
    },
    props: {
      url: {
        type: String,
        default: ''
      },
      searchPlaceholder: {
        type: String,
        default: '请输入关键词搜索'
      },
      linkTo: {
        type: String
      },
      groupList: {
        type: Array
      },
      onCellClick: {
        type: Function
      }
    },
    methods: {
      onChange(value) {
        const groupItemsTemp = _.map(this.groupItemsOrg, group => ({
          groupTitle: group.groupTitle,
          name: group.name,
          value: group.value,
          items: _.filter(group.items, item => (
            item.text.toLowerCase().indexOf(value.toLowerCase()) >= 0
          ))
        }));

        this.keyword = value;
        this.groupItems = _.filter(groupItemsTemp, group => group.items.length > 0);
      },
      onClick(...arg) {
        this.onChange('');
        if (this.onCellClick) {
          this.onCellClick(...arg);
        }
      }
    },
    mounted() {
      // 传入默认值
      if (this.groupList) {
        this.groupItemsOrg = this.groupList;
        this.groupItems = this.groupList;
      }
      // 请求数据
      if (this.url) {
        this.$http.get(`${this.url}?${querystring.stringify(this.$route.query)}`)
          .then((res) => {
            const {
              status,
              data,
              message
            } = res.data;

            if (status === 200) {
              this.groupItemsOrg = data;
              this.groupItems = data;
            } else {
              this.$vux.toast.show({
                text: message || '服务异常'
              });
            }
          });
      }
    },
    watch: {
      groupList() {
        this.groupItemsOrg = this.groupList;
        this.groupItems = this.groupList;
      }
    }
  };
</script>
