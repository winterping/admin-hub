<script setup lang="ts">
import { Plus, Edit, Delete, Search, RefreshLeft } from '@element-plus/icons-vue'
import { ref, reactive, watch, toRaw, onMounted } from 'vue'
import { fetchUsers, fetchUpdateUser, fetchRemoveUser } from '@/api/user'
import AddUser from './add-user.vue'
import { cloneDeep } from 'lodash-es'

const query = reactive({
  username: null,
  pageSize: 20,
  pageNo: 1,
  enable: null,
})

const tableData = ref({
  list: [],
  total: 0,
})
const visible = ref(false)
const openType = ref('add')
const loading = ref(true)
const userInfo = ref({})

const getTableData = async () => {
  loading.value = true
  // console.log('查询字段', toRaw(query))
  try {
    const res = await fetchUsers(query)
    // console.log('ressss', res.data);
    tableData.value = res.data;
    loading.value = false;
  } catch (err) {
    loading.value = false
  }
}

const handleOpen = (type, info = {}) => {
  visible.value = true
  openType.value = type
  if (type === 'edit') {
    userInfo.value = cloneDeep(info)
  }
}

onMounted(() => {
  getTableData()
})

const handleAdd = () => {
  visible.value = false
  getTableData()
}

const handleCancel = () => {
  visible.value = false
}

const changeSwitch = async (val, info) => {
  try {
    await fetchUpdateUser(info.id, {
      enable: val,
    })
    getTableData()
  } catch (err) { }
}

const changePage = () => {
  getTableData()
}

const handleDelete = async (info) => {
  try {
    await fetchRemoveUser(info.id)
    getTableData()
  } catch (err) { }
}

const handleReset = () => {
  query.enable = null;
  query.username = null;
  query.pageNo = 1;
  getTableData();
}
</script>

<template>
  <div class="nav">
    <div class="query">
      <div class="query-item">
        <span style="margin-right: 5px">用户名</span>
        <el-input v-model="query.username" style="width: 200px" placeholder="请输入用户名" clearable />
      </div>
      <div class="query-item">
        <span style="margin-right: 5px">状态</span>
        <el-select v-model="query.enable" placeholder="请选择状态" style="width: 200px" clearable>
          <el-option label="启用" :value="true"></el-option>
          <el-option label="禁用" :value="false"></el-option>
        </el-select>
      </div>
      <div>
        <el-button :icon="RefreshLeft" style="margin-right: 10px;color:#347AE2 ;border-color: #347AE2;"
          @click="handleReset">重置</el-button>
        <el-button type="primary" :icon="Search" color="#347AE2" @click="getTableData">搜索</el-button>
      </div>
    </div>
    <div class="operate">
      <el-button type="primary" :icon="Plus" style="float: right" color="#347AE2"
        @click="handleOpen('add')">新增用户</el-button>
    </div>
  </div>
  <div class="table-container">
    <el-table v-loading="loading" :data="tableData.list" header-cell-class-name="custom-header"
      row-class-name="custom-row">
      >
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="code" label="角色">
        <template #default="{ row }">
          <el-tag v-for="item in row.roles" :key="item.id" type="primary" style="margin-right: 5px;" effect="light"
            size="small">
            {{ item.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="enable" label="状态">
        <template #default="{ row }">
          <el-switch v-model="row.enable" :disabled="row.id === 1" inline-prompt active-text="启用" inactive-text="禁用"
            @change="(val) => {
              changeSwitch(val, row)
            }
              " />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <!-- 编辑 -->
          <el-button type="primary" :icon="Edit" :disabled="row.code === 'super_admin'" circle
            @click="handleOpen('edit', row)" />
          <!-- 删除 -->
          <el-popconfirm width="200" title="确认删除" @confirm="handleDelete(row)">
            <template #reference>
              <el-button type="danger" :icon="Delete" :disabled="row.id === 1" circle style="margin-left: 20px" />
            </template>
            <template #actions="{ confirm, cancel }">
              <el-button size="small" @click="cancel">取消</el-button>
              <el-button type="danger" size="small" @click="confirm">
                确认
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination v-model:current-page="query.pageNo" v-model:page-size="query.pageSize" class="pagination"
        layout="slot, sizes, prev, pager, next, jumper" :page-sizes="[20, 30, 50, 100]" :total="tableData.total"
        background :pager-count="5" @change="changePage">
        <span>共{{ tableData.total }}条数据</span>
      </el-pagination>
    </div>
  </div>
  <AddUser :visible="visible" :type="openType" :userInfo="userInfo" @cancel="handleCancel" @add="handleAdd" />
</template>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;

  .query {
    display: flex;

    .query-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
    }
  }
}

.table-container {
  flex: 1;
  margin-top: 20px;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  overflow-y: auto;
  /* 启用滚动 */
  display: flex;
  flex-direction: column;
}

.custom-header {
  background-color: var(--bg-color) !important;
  color: rgba(115, 119, 139, 1);
  height: 56px;
  line-height: 56px;
  border-bottom: none !important;
  position: sticky;
  top: 0;
  z-index: 1;
}

.custom-row {
  height: 56px;
  line-height: 56px;
}

.pagination {
  margin-top: 30px;
  float: right;
  width: auto;
}
</style>
