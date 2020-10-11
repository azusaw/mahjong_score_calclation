<template>
  <div class="home">
    <v-container class="mx-auto" style="text-align: center; max-width: 27rem">
      <h1 style="font-size: 1.5rem; line-height: 6rem; color: #FB8C00; letter-spacing: 0.2rem">麻雀&nbsp;点数計算ツール</h1>
        <v-tooltip bottom color="#F3F3F3">
          <template v-slot:activator="{ on, attrs }">
            <span style="font-weight: bold; font-size: 1.1rem" v-bind="attrs" v-on="on">
              <v-icon class="mx-1" color="primary">$mdiHelpCircleOutline</v-icon>A班ルール
            </span>
          </template>
          <span style="color: #333333; line-height: 2rem">
            <ol>
              <li>&nbsp;オカなし(25000点返し)</li>
              <li>&nbsp;ウマあり(5-10)</li>
              <li>&nbsp;焼き鳥の罰符は6000点(有効の場合)</li>
              <li>&nbsp;罰符対象外の人で分ける</li>
              <li>&nbsp;飛びの罰符はなし</li>
              <li>&nbsp;1000点単位以下の端数は五捨六入</li>
            </ol>
          </span>
        </v-tooltip>
      で点数を計算するよ！
      <v-form class="my-2 mx-4">
        <v-row v-for="(item, index) in member" :key="index" align="center">
          <v-col cols="4">
            <span style="font-size: 1.2rem">{{item.name}}</span>
          </v-col>
          <v-col cols="8">
            <v-text-field v-model="item.result" label="点数" type="number" required></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-btn x-large dark color="#FFA726" class="mt-2" @click="calc()" >
        点数を計算する
      </v-btn>
      <div style="line-height: 5rem">
        累計のExcelは
        <a
          href='https://onedrive.live.com/view.aspx?resid=381523E30066D964!1985&ithint=file%2cxlsx&wdLOR=c9BA1D837-F38A-414C-B55D-38D525B8F16B&authkey=!AFTAnNJkNG1bLMY'
          target="_blank"
          rel="noopener noreferrer"
        >
          ここをクリック
        </a>
      </div>
      <v-dialog v-model="dialog" max-width="30rem">
        <v-card class="pa-4">
          <div v-for="(item, index) in results" :key="index" style="line-height: 2.5rem; font-size: 1rem">
            {{item.rank}}位&ensp;{{item.name}}：&nbsp;{{item.result}}&ensp;
            <span v-if="item.point >= 0" style="font-weight: bold; color: #66BB6A">+{{item.point}}</span>
            <span v-else style="font-weight: bold; color: #EF5350">{{item.point}}</span>
          </div>
          <div class="my-2" style="text-align: center">
            <img :src="img" width="250"></img>
          </div>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  methods: {
    calc() {
      const OKA = 25000
      const UMA = [5, 10]
      let i = 0

      /* 順位を確定し、画像を設定 */
      for(var tmp1 of this.member) {
        for(var tmp2 of this.results) {
          if (tmp1.name == tmp2.name) {
            tmp2.result = tmp1.result
          }
        }
      }
      this.results.sort(function(a, b){
        if(a.result < b.result) return 1
        if(a.result > b.result) return -1
        return 0
      })
      for(var tmp of this.results) {
        tmp.rank = ++i
      }
      this.setImg()

      for(var tmp of this.results) {
        /* オカの計算 */   
        tmp.point = Math.floor((tmp.result - OKA) / 1000)
        if(tmp.result % 1000 >= 600) {
          tmp.point++
        } else if(tmp.result % 1000 < 0 && tmp.result % 1000 > -600) {
          /* 負数はMath.floorで1多く丸められるので、捨の場合は+1する */
          tmp.point++
        }

        /* ウマの計算 */
        switch(tmp.rank) {
          case 1:
            tmp.point += UMA[1]
            break
          case 2:
            tmp.point += UMA[0]
            break
          case 3:
            tmp.point -= UMA[0]
            break
          case 4:
            tmp.point -= UMA[1]
        }
      }
      this.dialog = true
    },
    setImg() {
      var img = ''
      var random = Math.floor( Math.random() * 11 )

      for(var tmp of this.results) {
        if(random % 2 == 0 && tmp.rank == 1) {
          /* 勝利画像を設定 */
          switch(tmp.name) {
            case '宮谷':
              img = 'ichikawa'
              break
            case 'わた':
              img = 'nangou'
              break
            case '八田':
              img = 'gori'
              break
            default:
              img = 'kaiji'
          }
        } else if(random % 2 == 1 && tmp.rank == 4) {
          /* 敗北画像を設定 */
          switch(tmp.name) {
            case '宮谷':
              img = 'washizu'
              break
            case 'わた':
              img = 'akagi'
              break
            case '八田':
              img = 'uozumi'
              break
            default:
              img = 'hiro'
          }
        }
      }
      this.img = require("@/assets/img/" + img + ".jpg")
    }
  },
  data: () => ({
    dialog: false,
    member: [
      { name: "宮谷", result: '' },
      { name: "わた", result: '' },
      { name: "八田", result: '' },
      { name: "半田", result: '' },
    ],
    /* 入力状態を保存するため入力と別の配列で管理する */
    results: [
      { rank: '', name: "宮谷", result: '', point: 0 },
      { rank: '', name: "わた", result: '', point: 0 },
      { rank: '', name: "八田", result: '', point: 0 },
      { rank: '', name: "半田", result: '', point: 0 },
    ],
    img: ''
  })
};
</script>

<style scoped lang="scss">
.home {
  letter-spacing: 0.15rem;
  color: #333333;
}
</style>
