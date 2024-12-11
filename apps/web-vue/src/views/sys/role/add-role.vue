<script setup lang="ts">
import {
  reactive,
  ref,
  defineProps,
  onMounted,
  defineEmits,
  toRaw,
  watch,
} from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { fetchCreateRole, fetchUpdateRole } from '@/api/role'
import { cloneDeep } from 'lodash-es';

const props = defineProps(['type', 'visible', 'roleInfo'])
const formRef = ref<FormInstance>()
const emit = defineEmits(['cancel', 'add'])

onMounted(() => { })

watch(
  props,
  () => {
    if (props.visible && props.type === 'edit') {
      form.value = props.roleInfo
    }
  },
  {
    deep: true,
  },
)

const init_data = {
  name: null,
  code: null,
  enable: true,
}
const form = ref(cloneDeep(init_data))

const rules = reactive<FormRules>({
  name: [{ required: true, message: '角色名不能为空', trigger: 'blur' }],
  code: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
})

const handleCancel = () => {
  formRef.value.resetFields()
  form.value = cloneDeep(init_data)
  emit('cancel')
}

const handleOk = async () => {
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      console.log('创建表单数据', toRaw(form.value))
      try {
        props.type === 'add' ? await fetchCreateRole(form.value) : await fetchUpdateRole(props.roleInfo.id, form.value)
        formRef.value.resetFields()
        form.value = cloneDeep(init_data)
        emit('add')
      } catch (err) {

      }
    } else {
    }
  })
}
</script>

<template>
  <el-dialog v-model="props.visible" :title="type === 'add' ? '新增角色' : '编辑角色'" width="450" :before-close="handleCancel">
    <el-form ref="formRef" :model="form" label-width="auto" :rules="rules">
      <el-form-item label="角色名" prop="name">
        <el-input v-model="form.name" clearable />
      </el-form-item>
      <el-form-item label="角色编码" prop="code">
        <el-input v-model="form.code" clearable />
      </el-form-item>
      <el-form-item label="状态" prop="enable">
        <el-switch v-model="form.enable" active-text="开启" inactive-text="禁用" inline-prompt />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleOk">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
