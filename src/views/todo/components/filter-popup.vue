<template>
  <div class="filter-popup">
    <xxx-popup :show="visible" @close="hide" title="筛选">
      <!-- 表单 -->
      <pro-schema-form :fields="objForm" />

      <!-- 重置 确认 -->
      <div class="c-fixed-bottom">
        <div class="filter-button-group">
          <van-button class="c-button" @click="handleReset">重置</van-button>
          <van-button class="c-button" type="primary" @click="handleSubmit">确认</van-button>
        </div>
      </div>

      <div class="c-ios-seat"></div>
    </xxx-popup>

    <!-- 日期 -->
    <hor-date-picker ref="horDatePickerInstance" />
  </div>
</template>

<script lang="ts" setup>
import { useVisible } from '@daysnap/horn-use'
import { banana, type MetaDataObject } from '@daysnap/banana'
import type { HorDatePickerInstance } from '@daysnap/horn-ui'

const horDatePickerInstance = ref<HorDatePickerInstance>()

const objForm = reactive<MetaDataObject>({
  name: {
    label: '姓名',
    value: '',
    placeholder: '请填写姓名',
    is: 'HorField',
    clearable: true,
    direction: 'column',
    rules: [{ required: true, message: '请填写姓名' }],
  },
  sex: {
    label: '性别',
    value: '',
    placeholder: '请选择性别',
    is: 'HorRadio',
    direction: 'column',
    options: [
      {
        label: '男',
        value: '0',
      },
      {
        label: '女',
        value: '1',
      },
    ],
    rules: [{ required: true, message: '请选择性别' }],
  },
  birthday: {
    label: '生日',
    value: '',
    placeholder: '请选择生日',
    is: 'HorCell',
    arrow: true,
    direction: 'column',
    fn: async (item: any) => {
      console.log(item)
      const { selectedValues } = (await horDatePickerInstance.value!.show({
        modelValue: item.value.split('-').filter(Boolean),
      })) as any
      item.value = selectedValues.join('-')
    },
    rules: [{ required: true, message: '请选择生日' }],
  },
  isLicense: {
    label: '是否上牌',
    value: '',
    is: 'HorRadio',
    direction: 'column',
    options: [
      {
        label: '是',
        value: '0',
      },
      {
        label: '否',
        value: '1',
      },
    ],
    rules: [{ required: true, message: '请选择是否上牌' }],
  },
  license: {
    label: '车牌号',
    value: '',
    placeholder: '请填写车牌号',
    is: 'HorField',
    direction: 'column',
    hidden: (() => objForm.isLicense.value !== '0') as any,
    rules: [{ required: true, message: '请填写车牌号' }],
  },
  hobbies: {
    label: '爱好',
    value: [],
    is: 'HorCheckbox',
    direction: 'column',
    shape: 'square',
    options: [
      {
        label: '唱',
        value: '0',
      },
      {
        label: '跳',
        value: '1',
      },
      {
        label: 'rap',
        value: '2',
      },
      {
        label: '篮球',
        value: '3',
      },
    ],
    rules: [{ required: true, message: '请选择爱好' }],
  },
  remark: {
    label: '备注',
    value: '',
    placeholder: '请填写备注',
    is: 'HorTextarea',
  },
})

const handleSubmit = () => {
  const options = banana.extract(objForm)
  console.log('options => ', options)
}
const handleReset = () => {
  //
}

const { visible, show, hide, confirm } = useVisible()
show()

defineExpose({
  show,
  hide,
  confirm,
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/define.scss';
.filter-popup {
  :deep {
    .hor-view {
      background-color: #fafafa;
    }
  }
}
.filter-button-group {
  @extend %df;
  @extend %aic;
  .c-button {
    @extend %df1;
    + .c-button {
      margin-left: j(10);
    }
  }
}
.c-ios-seat {
  height: j(100);
}
</style>
