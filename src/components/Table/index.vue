<script lang="ts" setup generic="T">
import { PropType } from "vue"
import { reactive } from "vue"
import { List, TableHeader, TableResult } from "./types"
import { onBeforeMount } from "vue"
import { request } from "@/utils/service"
const props = defineProps({
  tableHeader: {
    type: Array as PropType<TableHeader[]>,
    required: true
  },
  api: {
    type: String,
    required: true
  },
  callback: {
    type: Function,
    default: null
  }
})

async function getTableData() {
  const { code, data } = await request<TableResult<T>>({
    url: "table",
    method: "get",
    params: state.pagination
  })

  if (code === 0) {
    state.data = data.list
    state.pagination.total = data.total
  }
}

const state = reactive({
  data: [] as List[],
  loading: false,
  pagination: {
    currentPage: 1,
    size: 10,
    total: 0
  }
})

// 生成序号
function generateOrder(index: number) {
  return (state.pagination.currentPage - 1) * state.pagination.size + index + 1
}

async function currentChange(value: number) {
  state.pagination.currentPage = value
  await getTableData()
}

async function sizeChange(value: number) {
  state.pagination.size = value
  await getTableData()
}

async function sortChange({ column, prop, order }) {
  console.log("sortChange", column, prop, order)
  await getTableData()
}

onBeforeMount(async () => {
  try {
    getTableData()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <el-table @sort-change="sortChange" sortable v-loading="state.loading" :data="state.data">
    <template v-for="item in tableHeader" :key="item.prop">
      <template v-if="item.prop === 'order'">
        <el-table-column :prop="item.prop" :label="item.lable">
          <template #default="{ $index }">
            {{ generateOrder($index) }}
          </template>
        </el-table-column>
      </template>
      <template v-else>
        <el-table-column :sortable="item.sortable" :prop="item.prop" :label="item.lable">
          <template v-if="item.slot" #default="{ row, $index }">
            <slot :name="item.slot" :row="row" demo="maomao" :index="$index" />
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table>

  <el-pagination
    @current-change="currentChange"
    @size-change="sizeChange"
    layout="prev, pager, next"
    :total="state.pagination.total"
  />
</template>

<style lang="scss" scoped></style>
