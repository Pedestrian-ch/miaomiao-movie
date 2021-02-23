<template>
  <div class="cinema_body">
    <Loader v-if="!haveData"></Loader>
    <Scroller v-else>
      <ul>
        <li v-for="item in dataObject.cinemas" :key="item.id">
          <div>
            <span>{{ item.nm }}</span>
            <span class="q"
              ><span class="price">{{ item.sellPrice }}</span> 元起</span
            >
          </div>
          <div class="address">
            <span>{{ item.addr }}</span>
            <span>{{ item.distance }}</span>
          </div>
          <div class="card">
            <div v-if="item.tag.allowRefund" class="bl">退</div>
            <div v-if="item.tag.endorse" class="bl">改签</div>
            <div v-if="item.tag.snack" class="or">小吃</div>
            <div v-if="item.tag.vipTag" class="or">折扣卡</div>
            <div
              v-for="(data, index) in item.tag.hallType.slice(0,4)"
              :key="index"
              class="bl"
            >
              {{ data }}
            </div>
          </div>
          <div v-if="item.promotion.cardPromotionTag" class="address">
            <div class="discount-label normal">
              <img
                src="https://p1.meituan.net/scarlett/ff1c6e33ed0ac3cd862910a83d4bf959583.png"
                width="15px"
                height="14px"
              />
            </div>
            <div class="discount-label-text">
              {{ item.promotion.cardPromotionTag }}
            </div>
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataObject: {}, // 数据存储的对象
      haveData: false, // 是否页面数据是否正在请求
      cityId: -1 // 存储城市id，进而比较存储的与现在的城市id是否相同以此判断是否需要更新keep-alive的缓存
    }
  },
  activated () {
    if (this.cityId !== this.$store.state.city.cityId) {
      this.haveData = false
      var date = new Date()
      var day = date.getFullYear() + '-' + (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' + date.getDate()
      this.axios.get('/ajax/cinemaList?token=&ci=' + this.$store.state.city.cityId + '&limit=500&day=' + day).then((res) => {
        this.dataObject = res.data
        this.haveData = true
      })
    }
  },
  methods: {
    handleToDetail () {
      console.log('handleToDetail')
    }
  }
}
</script>

<style scoped>
#content .cinema_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
}
#content .cinema_body {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.cinema_body ul {
  padding: 20px;
  padding-bottom: 0;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body ul li > div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  display: flex;
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(1) {
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
.discount-block {
  color: #999;
  margin-bottom: 4px;
}
.discount-label {
  width: 15px;
  height: 14px;
  position: relative;
  top: 3px;
  display: inline-flex;
}
.discount-label-text {
  margin-left: 0;
  font-size: 11px;
  display: inline-block;
  color: #999;
}
</style>
