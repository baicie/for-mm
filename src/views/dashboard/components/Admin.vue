<script lang="ts" setup>
import { ref, watchEffect } from "vue"

const base = ref({
  open: false,
  title: "应发工资 公式设置",
  radio: "",
  script: [],
  contents: "",
  texts: "",
  open2: false,
  title2: "试算",
  result: 0,
  params: []
})

// params
// {code: "", value:"""}

const panel = ref([
  {
    code: "+",
    content: "+",
    text: "+"
  },
  {
    code: "*",
    content: "*",
    text: "乘以"
  },
  {
    code: "1",
    content: "1"
  },
  {
    code: "2",
    content: "2"
  },
  {
    code: "3",
    content: "3"
  },
  {
    code: "4",
    content: "4"
  }
])

const options = ref([
  {
    code: "a",
    content: "入职时间",
    type: "var"
  },
  {
    code: "b",
    content: "单位名称",
    type: "var"
  }
])

function handlePanel(item) {
  console.log("handle", item)
  base.value.script.push(item)
}

function onRadioChange(value) {
  console.log(value)
}

function onRadioClick(item) {
  console.log("onRadioChange", item)
  base.value.script.push(item)
}

function handleCacle() {
  base.value.open2 = !base.value.open2
  base.value.params = []
  for (const item of base.value.script.filter((item) => item.type == "var")) {
    const res = {
      code: item.code,
      text: item.content,
      value: 1
    }

    base.value.params.push(res)
  }
}

function handleCacle2() {
  let scripts = ""
  console.log(base.value.params, base.value.script)

  for (const item of base.value.script) {
    if (item.type == "var") {
      const param = base.value.params.find((it) => it.code === item.code)
      if (param) {
        scripts += param.value
      }
    } else {
      scripts += item.code
    }
  }
  console.log("scripts", scripts)

  console.log("result: ", eval(scripts))
  base.value.result = eval(scripts)
}

watchEffect(() => {
  base.value.contents = ""
  base.value.texts = ""
  for (const item of base.value.script) {
    base.value.contents += item.content
    base.value.texts += item.text ?? item.content
  }
})
</script>
<template>
  <div>
    {{ base }}
    <el-button @click="base.open = !base.open"> open </el-button>
    <el-dialog :title="base.title" v-model="base.open">
      <div>
        <div class="top">
          <div class="left">
            <template v-for="item in panel" :key="item.code">
              <el-button @click="handlePanel(item)">{{ item.content }}</el-button>
            </template>
          </div>
          <div class="right">{{ base.contents }}</div>
        </div>
        <div class="bottom">
          <div class="left">
            <el-scrollbar>
              <el-radio-group v-model="base.radio" size="small" @change="onRadioChange">
                <el-radio-button
                  @click="onRadioClick(item)"
                  v-for="item in options"
                  :key="item.code"
                  :label="item.content"
                />
              </el-radio-group>
            </el-scrollbar>
          </div>
          <div class="rigth">
            {{ base.texts }}
          </div>
        </div>

        <el-button @click="handleCacle">试算</el-button>
      </div>
    </el-dialog>

    <el-dialog v-model="base.open2" :title="base.title2">
      <div>
        {{ base.contents }}
        {{ base.result }}

        <el-table :data="base.params">
          <el-table-column prop="text" label="参数" />
          <el-table-column label="带入值">
            <template #default="{ row }">
              <el-input-number v-model="row.value" />
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="handleCacle2">shisuan</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped></style>
