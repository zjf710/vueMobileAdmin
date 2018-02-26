<template>
  <form
    class="zeus-default-form"
    @submit="submit"
  >
    <header v-if="formHeader" class="form-header">{{formHeader}}</header>
    <div v-if="warning" class="form-warning-text">{{warning}}</div>
    <group :title="title">
      <group-title v-if="formHeader" slot="title" style="margin: 0;padding: 0;" />
      <form-item
        v-for="(item, i) in formItemList"
        v-if="!item.hidden"
        :key="i"
        :item="item"
        :groupList="options[item.name]"
        :formItemType="item.cellType"
        :readOnly="readOnly"
        :ref="item.name"
      />
    </group>
    <group v-if="!getOnly" class="button-container">
      <zs-button action-type="submit" type="primary" size="large">
        {{buttonText}}
      </zs-button>
    </group>
  </form>
</template>

<script>
  import _ from 'lodash';
  import { querystring } from 'vux';

  import {
    submitCompleteDeal,
    formValidate
  } from '../../lib/ComponentCommonMethod';
  import FormItem from './FormItem';
  import './index.scss';

  export default {
    name: 'default-form',
    props: {
      'form-items': {
        type: Array,
        default: () => ([])
      },
      dataBind: {
        type: Array,
        default: () => ([])
      },
      id: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: ''
      },
      buttonText: {
        type: String,
        default: '提交'
      },
      readOnly: {
        type: Boolean,
        default: false
      },
      hidden: {
        type: Boolean,
        default: false
      },
      postOnly: {
        type: Boolean,
        default: false
      },
      getOnly: {
        type: Boolean,
        default: false
      },
      successDirect: {
        type: String
      },
      formHeader: {
        type: String
      },
      warning: {
        type: String
      },
      onSubmit: {
        type: Function
      }
    },
    components: {
      FormItem
    },
    data() {
      return {
        formItemList: this.formItems,
        options: {}
      };
    },
    mounted() {
      if (this.url && !this.postOnly) {
        this.getData();
      }
    },
    updated() {
      if (this.id) {
        const formData = {};
        _.map(this.formItemList, (item) => {
          formData[item.name] = item.value;
        });
        this.$store.commit({
          type: 'setPageData',
          id: this.id,
          data: formData
        });
      }
    },
    methods: {
      getData() {
        this.$http.get(`${this.url}?${querystring.stringify(this.$route.query)}`)
          .then((res) => {
            const {
              status,
              data,
              options,
              message
            } = res.data;

            if (status === 200) {
              this.options = options || {};
              this.formItemList = _.map(_.cloneDeep(this.formItemList), (o) => {
                const item = o;
                item.value = data[item.name];
                return item;
              });
            } else {
              this.$vux.toast.show({
                type: 'cancel',
                text: message || '服务异常'
              });
            }
          });
      },
      submit(e) {
        e.preventDefault();
        const {
          onSubmit,
          formItemList
        } = this;

        if (!formValidate.bind(this)(formItemList)) {
          return;
        }

        const formFieldValues = {};
        // 绑定form数据
        this.formItemList.forEach((item) => {
          formFieldValues[item.name] = item.value;
        });

        // 提供回调
        if (onSubmit) {
          onSubmit(formFieldValues);
        } else if (this.url && !this.getOnly) {
          let params = formFieldValues;
          // 提交数据绑定其他组件
          if (this.dataBind && this.dataBind.length > 0) {
            params = {
              [this.id]: params
            };
            _.map(this.dataBind, (id) => {
              params[id] = this.$store.state.pageData[id];
            });
          }
          this.$http.post(`${this.url}?${querystring.stringify(this.$route.query)}`, params)
            .then((res) => {
              submitCompleteDeal.bind(this)(_.get(res, 'data', {}));
            });
        }
      }
    }
  };
</script>
