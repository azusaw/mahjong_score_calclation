<template>
  <div class="text bg">
    <v-container class="mx-auto text-center" style="max-width: 25rem">
      <div class="mx-auto text-right">
        <v-btn depressed plain color="#fff" @click="changeLang">{{
          this.lang
        }}</v-btn>
      </div>
      <h1
        style="
          color: #ff8f00;
          font-size: 1.2rem;
          line-height: 6rem;
          letter-spacing: 3px;
        "
      >
        {{ wordList.TOOL_NAME }}
      </h1>
      <v-tooltip bottom color="#F3F3F3">
        <template v-slot:activator="{ on, attrs }">
          <span style="font-size: 1.1rem" v-bind="attrs" v-on="on"
            ><v-icon class="mx-2">$mdiHelpCircleOutline</v-icon
            ><b>{{ wordList.RULE }}</b>
          </span>
        </template>
        <div class="text">
          <ol>
            <template v-for="rule in wordList.RULE_DETAIL">
              <li>&nbsp;{{ rule }}</li>
            </template>
          </ol>
        </div>
      </v-tooltip>
      {{ wordList.RULE_DESCRIPTION }}
      <v-checkbox
        v-model="isNotAhanMember"
        :label="wordList.I_AM_NOT_AHAN"
        on-icon="$mdiCheckboxMarked"
        off-icon="$mdiCheckboxBlankOutline"
        class="pl-2"
      />
      <v-expansion-panels v-if="isNotAhanMember" flat>
        <v-expansion-panel style="background-color: #fff2e3">
          <v-expansion-panel-header>{{
            wordList.EDITING_RULES
          }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form ref="form" v-model="rulesValid">
              <v-row align="center">
                <v-col cols="4">{{ wordList.OKA }}</v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="oka"
                    :label="wordList.POINTS"
                    type="number"
                    :rules="[(v) => !!v || wordList.REQUIRED]"
                    dense
                  />
                </v-col>
                <v-col cols="4">{{ wordList.UMA }}</v-col>
                <v-col cols="8">
                  <template v-for="idx of Object.keys(uma)">
                    <v-text-field
                      v-model="uma[idx]"
                      type="number"
                      :rules="[(v) => !!v || wordList.REQUIRED]"
                      dense
                      style="width: 50%"
                    />
                  </template>
                </v-col>
                <v-col cols="4">{{ wordList.ROUND }}</v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="roundBase"
                    type="number"
                    :rules="[(v) => !!v || wordList.REQUIRED]"
                    dense
                    :suffix="`${wordList.ROUND_DOWN} ${+roundBase + 1} ${
                      wordList.ROUND_UP
                    }`"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-card class="my-4 pa-8">
        <v-form ref="form" v-model="scoresValid">
          <v-row v-for="(item, idx) in results" :key="idx" align="center">
            <v-col cols="4">
              <v-text-field
                v-if="isNotAhanMember"
                v-model="item.name"
                :label="wordList.NAME + ++idx"
                :rules="[(v) => !!v || wordList.REQUIRED]"
                dense
              />
              <span v-else style="font-size: 1.2rem">{{ item.name }}</span>
            </v-col>
            <v-col cols="8">
              <v-text-field
                v-model="item.score"
                :label="wordList.POINTS"
                type="number"
                :rules="[(v) => !!v || wordList.REQUIRED]"
                dense
              />
            </v-col>
          </v-row>
          <v-btn
            x-large
            color="primary"
            :disabled="!rulesValid || !scoresValid"
            @click="calc()"
          >
            <span style="font-size: 1.2rem">{{ wordList.CALCULATE }}</span>
          </v-btn>
        </v-form>
      </v-card>
      <div>
        {{ wordList.SCORE_DESCRIPTION }}
        <a
          href="https://onedrive.live.com/view.aspx?resid=381523E30066D964!1985&ithint=file%2cxlsx&wdLOR=c9BA1D837-F38A-414C-B55D-38D525B8F16B&authkey=!AFTAnNJkNG1bLMY"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ wordList.CLICK_HERE }}
        </a>
      </div>
      <v-dialog v-model="dialog" max-width="30rem">
        <v-card class="pa-4">
          <div
            v-for="(item, index) in results"
            :key="index"
            style="line-height: 2.5rem; font-size: 1rem"
          >
            {{ item.rank }}&ensp;{{ item.name }}：&nbsp;{{ item.score }}&ensp;
            <span
              v-if="item.point >= 0"
              style="font-weight: bold; color: #66bb6a"
              >+{{ item.point }}</span
            >
            <span v-else style="font-weight: bold; color: #ef5350">{{
              item.point
            }}</span>
          </div>
          <div class="my-2 text-center">
            <img :src="img" :alt="wordList.IMAGE" width="250" />
          </div>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { JP, ENG } from "~/data/language";
export default {
  data: () => ({
    lang: "JP",
    wordList: JP,
    isNotAhanMember: false,
    rulesValid: true,
    scoresValid: true,
    dialog: false,
    oka: 25000,
    uma: [5, 10],
    roundBase: 5,
    /* 入力状態を保持するため、入力と別の配列で管理する */
    results: [
      { rank: "", name: "宮谷", score: "", point: 0 },
      { rank: "", name: "わた", score: "", point: 0 },
      { rank: "", name: "八田", score: "", point: 0 },
      { rank: "", name: "半田", score: "", point: 0 },
    ],
    img: "",
    ahanImgs: [
      { name: "宮谷", win: "ichikawa", lose: "washizu" },
      { name: "わた", win: "nangou", lose: "akagi" },
      { name: "八田", win: "gori", lose: "uozumi" },
      { name: "半田", win: "kaiji", lose: "hiro" },
    ],
  }),
  methods: {
    changeLang() {
      switch (this.lang) {
        case "JP":
          this.lang = "ENG";
          this.wordList = ENG;
          break;
        default:
          this.lang = "JP";
          this.wordList = JP;
      }
    },
    calc() {
      /* 順位の計算 */
      this.results.sort((a, b) => {
        return a.score < b.score ? 1 : -1;
      });
      this.results.forEach((tmp, idx) => (tmp.rank = idx + 1));
      this.results.forEach((tmp) => {
        /* オカの計算 */
        tmp.point = Math.floor((tmp.score - this.oka) / 1000);
        if (tmp.score % 1000 >= (this.roundBase + 1) * 100) {
          tmp.point++;
        } else if (
          tmp.score % 1000 < 0 &&
          tmp.score % 1000 > (this.roundBase + 1) * -100
        ) {
          /* 負数はMath.floorで1多く丸められるので、捨の場合は+1する */
          tmp.point++;
        }
        /* ウマの計算 */
        switch (tmp.rank) {
          case 1:
            tmp.point += this.uma[1];
            break;
          case 2:
            tmp.point += this.uma[0];
            break;
          case 3:
            tmp.point -= this.uma[0];
            break;
          case 4:
            tmp.point -= this.uma[1];
        }
      });
      this.setImg();
      /* RANKを文字列に変換 */
      this.results.forEach(
        (tmp) =>
          (tmp.rank =
            this.lang === "JP"
              ? `${tmp.rank} ${JP.RANK}`
              : `${ENG.RANK} ${tmp.rank}`)
      );
      this.dialog = true;
    },
    setImg() {
      let img = "who";
      if (!this.isNotAhanMember) {
        /* A班の場合は各メンバーの画像をランダムで設定 */
        const random = Math.floor(Math.random() * 11);
        if (random % 2 === 0) {
          img = this.ahanImgs.find((v) => v.name === this.results[0].name).win;
        } else {
          img = this.ahanImgs.find((v) => v.name === this.results[3].name).lose;
        }
      }
      this.img = require("@/assets/img/" + img + ".jpg");
    },
  },
};
</script>

<style scoped lang="scss">
.text {
  letter-spacing: 0.15rem;
  color: #333;
}
.bg {
  background-color: #ffdcb9;
  min-height: 100vh;
}
</style>
