<template>
  <div class="home">
    <van-tabs
      v-model="active"
      title-inactive-color="#bbb"
      color="#ff976a"
      title-active-color="#ff976a"
      background="transparent"
    >
      <van-tab v-for="(item, key) in departments" :key="key" :title="item.name" :name="key">
        <van-swipe indicator-color="#ff976a" v-if="item.cards.length" class="tab-swiper" loop>
          <van-swipe-item v-for="card in item.cards" :key="card._id">
            <div class="avatar">
              <van-image
                width="70"
                height="70"
                round
                fit="cover"
                :src="'http://localhost:5000/' + card.avatar"
              />
              <div class="info">
                <p class="name">{{ card.name }}</p>
                <p class="declaration">{{ card.declaration }}</p>
              </div>
            </div>
            <p class="introduce">{{ card.introduce }}</p>
            <van-checkbox
              @click="checked[key] = { name: card.name, _id: card._id }"
              checked-color="#ff976a"
              class="pick"
              :value="checked[key]._id === card._id"
            >PICK TA</van-checkbox>
          </van-swipe-item>
        </van-swipe>
        <van-empty image="search" v-else description="列表尚无数据" />
      </van-tab>
    </van-tabs>
    <div class="voter">
      <van-field :border="false" class="field" center v-model="voter" label="投票人姓名">
        <template #button>
          <van-button :disabled="!voter" size="small" @click="voteAll" type="warning ">提交投票</van-button>
        </template>
      </van-field>
      <p class="tip">姓名不做展示，只做唯一认证，避免重复投票，非与会人员投票数据将在结算时被清除。</p>
    </div>
  </div>
</template>

<script>
import { GetCandidates, VoteCandidates } from "./../serve/";
import { Notify, Dialog } from "vant";

export default {
  name: "Home",
  data: () => ({
    voter: "",
    active: "president",
    departments: {
      president: { name: "科协主席", cards: [] },
      office: { name: "策划部", cards: [] },
      media: { name: "媒体部", cards: [] },
      editor: { name: "编辑部", cards: [] },
      workshop: { name: "雁祉作坊", cards: [] },
      onecho: { name: "One Echo", cards: [] }
    },
    checked: {
      president: {},
      office: {},
      media: {},
      editor: {},
      workshop: {},
      onecho: {}
    }
  }),
  async created() {
    const cards = await GetCandidates();
    if (!cards.length) return;
    for (let card of cards) {
      this.departments[card.department].cards.push(card);
    }
  },
  methods: {
    voteAll() {
      let message = "";
      for (let pick in this.checked) {
        if (!this.checked[pick]._id) {
          Notify({
            type: "danger",
            message: `未选择任何一位${this.departments[pick].name}候选人`
          });
          return;
        }
        message += `${this.departments[pick].name}： ${this.checked[pick].name} \n`;
      }

      Dialog.confirm({
        title: "我的投票",
        message
      }).then(() => {
        VoteCandidates(this.checked, this.voter);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 60px);
  .tab-swiper {
    color: white;
    margin: 20px 20px 0;
    .avatar {
      display: flex;
      align-items: center;
      .info {
        margin-left: 20px;
        .name {
          font-size: 18px;
          margin: 0;
        }
        .declaration {
          font-size: 15px;
          margin: 0;
        }
      }
    }
    .introduce {
      margin: 10px 0 10px;
      word-break: break-all;
      font-size: 14px;
    }
    .pick {
      /deep/span {
        color: #ff976a;
      }
      margin-bottom: 20px;
    }
  }
  .voter {
    padding: 0 20px 10px;
    .field {
      background-color: transparent;
      color: white;
      /deep/input {
        color: white;
      }
    }
    .tip {
      color: #ccc;
      margin: 6px 10px;
      font-size: 12px;
    }
  }
}
</style>
