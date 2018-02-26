/*
* 组件统一处理方法
* */

// 组件提交成功回调方法
export function submitCompleteDeal(res) {
  const {
    status,
    message
  } = res;

  if (status === 200) {
    if (this.successDirect) {
      this.$router.push({
        path: `/${this.successDirect}`,
        query: { message: message || `${this.buttonText}成功` }
      });
    } else {
      this.$vux.toast.show({
        type: 'success',
        width: '7.6em',
        text: message || `${this.buttonText || ''}成功`
      });
      if (this.getData && this.getData instanceof Function) {
        this.getData();
      }
    }
  } else {
    this.$vux.toast.show({
      type: 'cancel',
      width: '7.6em',
      text: message || `${this.buttonText || ''}失败`
    });
  }
}

export function formValidate(formItemList) {
  for (let i = 0; i < formItemList.length; i += 1) {
    const item = formItemList[i];
    // 验证是否为空
    if (item.required && !item.value) {
      this.$vux.toast.show({
        text: `${item.label}为必填项`
      });
      return false;
    }

    // 如果指定格式，则验证格式
    if (item.regex) {
      const input = _.get(this.$refs[item.name][0], '$refs.formItem');
      // 验证格式
      if (!input.valid) {
        this.$vux.toast.show({
          text: input.firstError,
          time: 2000
        });
        return false;
      }
    }
  }

  return true;
}
