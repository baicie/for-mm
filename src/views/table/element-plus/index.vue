<script lang="ts" setup>
import MyTable from "@/components/Table/index.vue"
import { TableHeader } from "@/components/Table/types"
import { reactive } from "vue"

const state = reactive({
  tableHeader: [
    {
      prop: "order",
      lable: "序号"
    },
    {
      prop: "username",
      lable: "username",
      sortable: true
    },
    {
      prop: "options",
      lable: "options",
      slot: "options"
    }
  ] as TableHeader[]
})
</script>

<template>
  <div>table</div>
  <MyTable :table-header="state.tableHeader" api="">
    <template #options="{ row, demo, index }">
      <el-button
        @click="
          () => {
            console.log(row, index)
          }
        "
      >
        {{ demo }}</el-button
      >
    </template>
  </MyTable>
</template>

<style lang="scss" scoped></style>
