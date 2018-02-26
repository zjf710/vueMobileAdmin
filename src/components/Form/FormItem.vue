<template>
  <popup-selector
    v-if="formItemType === 'popupSelector'"
    class="form-item"
    :title="item.label"
    :type="item.type"
    :value="item.value ? getValue(item.value) : ''"
    :groupList="groupList"
    :placeholder="item.placeholder || '请选择'"
    :searchPlaceholder="item.searchPlaceholder || '请选择'"
    :onChange="onChange"
  />
  <cell
    v-else-if="formItemType === 'text'"
    class="form-item"
  >
    <p slot="title" style="width:100px;">{{item.label}}</p>
    <p slot="child" style="word-break: break-all;width: calc(100% - 100px);">{{item.value}}</p>
  </cell>
  <cell
    v-else-if="formItemType === 'cell'"
    class="form-item"
    :value="item.value"
  >
    <p slot="title" style="min-width:100px;">{{item.label}}</p>
    <p style="word-break: break-all;">{{item.value}}</p>
  </cell>
  <zs-input
    v-else
    v-model="item.value"
    ref="formItem"
    class="form-item"
    label-width="100px"
    :title="item.label"
    :required="item.required"
    :max="item.max"
    :min="item.min"
    :is-type="item.regex"
    :placeholder="item.placeholder || '请输入'"
    :disabled="item.disabled"
    :type="item.type"
    :readonly="readOnly || item.readOnly"
    placeholder-align="left"
  />
</template>

<script>
  import _ from 'lodash';

  export default {
    name: 'form-item',
    props: {
      item: {
        type: Object,
        default: () => ({})
      },
      groupList: {
        type: Array,
        default: () => ([])
      },
      readOnly: {
        type: Boolean,
        default: false
      },
      formItemType: {
        type: String,
        default: 'input'
      }
    },
    methods: {
      getValue(value) {
        if (value.item) {
          return _.get(value.item, 'text');
        }
        return _.get(value, 'text');
      },
      // 验证
      onChange(params, group) {
        if (group) {
          this.item.value = {
            groupTitle: group.groupTitle,
            name: group.name,
            value: group.value,
            item: params
          };
        } else {
          this.item.value = params;
        }
      }
    }
  };
</script>
