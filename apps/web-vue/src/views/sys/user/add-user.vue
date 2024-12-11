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
import { fetchAllRoles } from '@/api/role';
import { fetchCreateUser, fetchUpdateUser } from '@/api/user';
import { cloneDeep } from 'lodash-es';

const props = defineProps(['type', 'visible', 'userInfo'])
const formRef = ref<FormInstance>()
const emit = defineEmits(['cancel', 'add'])
const roles = ref([]);

const getAllRoles = async () => {
  try {
    const res = await fetchAllRoles();
    // console.log('res.data', res.data);
    roles.value = res.data;

  } catch (err) { }

}

onMounted(() => {
  getAllRoles();
})

watch(
  props,
  () => {
    if (props.visible && props.type === 'edit') {
      // console.log('props', props.userInfo);
      const { username, enable, roles } = props.userInfo
      form.value = {
        username,
        enable,
        roleIds: roles.map(role => role.id)
      }
    }
  },
  {
    deep: true,
  },
)

const init_data = {
  username: null,
  password: null,
  roleIds: [],
  enable: true,
}

const form: any = ref(cloneDeep(init_data))

const rules = reactive<FormRules>({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  roleIds: [{ required: true, message: '请至少选择一个角色', trigger: 'change' }],
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
        props.type === 'add' ? await fetchCreateUser(form.value) : await fetchUpdateUser(props.userInfo.id, form.value)
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
  <el-dialog v-model="props.visible" :title="type === 'add' ? '新增用户' : '编辑'" width="450" :before-close="handleCancel">
    <el-form ref="formRef" :model="form" label-width="auto" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="props.type === 'add'">
        <el-input v-model="form.password" clearable />
      </el-form-item>
      <el-form-item label="角色" prop="roleIds">
        <el-select v-model="form.roleIds" multiple placeholder="请选择角色">
          <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.id" :disabled="userInfo.id === 1&&role.id===1" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="enable">
        <el-switch v-model="form.enable" active-text="开启" inactive-text="禁用" inline-prompt
          :disabled="userInfo.id === 1" />
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
