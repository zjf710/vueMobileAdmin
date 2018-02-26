<template>
  <default-form
    :formItems="formItems"
    :title="title"
    :url="url"
    :buttonText="buttonText"
    :onSubmit="onSubmit"
  />
</template>

<script>
  import _ from 'lodash';
  import { querystring } from 'vux';

  import DefaultForm from '../Form/DefaultForm';

  export default {
    name: 'zs-filter',
    components: {
      DefaultForm
    },
    props: {
      'form-items': {
        type: Array,
        default: () => ([])
      },
      linkTo: {
        type: String
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
        default: '查询'
      }
    },
    methods: {
      onSubmit(params) {
        if (this.linkTo) {
          const p = {};
          _.map(params, (item, key) => {
            if (item !== undefined) {
              if (item.item) {
                p[key] = _.get(item.item, 'value');
              } else {
                p[key] = _.get(item, 'value', item);
              }
            }
          });
          this.$router.push(`${this.linkTo}?${querystring.stringify(p)}`);
        }
      }
    }
  };
</script>
