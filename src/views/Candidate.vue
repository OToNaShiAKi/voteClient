<template>
  <div class="candidate">
    <div class="avatar">
      <van-uploader :after-read="avatarRead" v-model="avatar" :max-count="1" />
      <span>{{ avatar.length ? avatar[0].file.name : "选择照片" }}</span>
    </div>
    <van-field label="候选人" v-model="name" />
    <van-field label="竞选宣言" v-model="declaration" />
    <van-field type="textarea" label="个人简介" autosize v-model="introduce" />
    <div class="departments">
      <label>所在部门</label>
      <van-radio-group checked-color="#ff976a" v-model="department" direction="horizontal">
        <van-radio
          class="department"
          v-for="item in departments"
          :key="item.key"
          :name="item.key"
        >{{ item.name }}</van-radio>
      </van-radio-group>
    </div>
    <van-button
      :disabled="!(avatar.length && declaration && department && introduce && name)"
      round
      type="warning"
      block
      @click="candidate"
    >添加候选人</van-button>
  </div>
</template>

<script>
import { AddCandidate } from "./../serve/";

export default {
  name: "vote",
  data: () => ({
    name: "",
    department: "",
    introduce: "",
    declaration: "",
    avatar: [],
    departments: [
      { name: "科协主席", key: "president" },
      { name: "策划部", key: "office" },
      { name: "媒体部", key: "media" },
      { name: "编辑部", key: "editor" },
      { name: "雁祉作坊", key: "workshop" },
      { name: "One Echo", key: "onecho" }
    ]
  }),
  methods: {
    avatarRead(file) {
      this.avatar = [file];
    },
    candidate() {
      const person = new FormData();
      person.append("name", this.name);
      person.append("department", this.department);
      person.append("declaration", this.declaration);
      person.append("introduce", this.introduce);
      person.append("avatar", this.avatar[0].file);
      AddCandidate(person);
    }
  }
};
</script>

<style lang="less" scoped>
.candidate {
  padding: 20px;
  .avatar {
    color: white;
    margin: 0 0 10px;
    display: flex;
    align-items: center;
    span {
      word-break: break-all;
    }
  }
  .departments {
    color: white;
    label {
      padding: 10px;
      display: inline-block;
      font-size: 14px;
    }
    .department {
      margin: 0 10px 20px;
      /deep/span {
        color: white;
      }
    }
  }
}
</style>