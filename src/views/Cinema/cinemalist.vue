<template>
  <div class="cinema_body">
    <ul>
      <li v-for="item in cinemaList" :key="item.id">
        <div>
          <span>{{item.nm}}</span>
          <span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
        </div>
        <div class="address">
          <span>{{item.addr}}</span>
          <span>{{item.distance}}</span>
        </div>
        <div class="card">
          <div v-if="item.tag.allowRefund" class="bl">退</div>
          <div v-if="item.tag.endorse" class="bl">改签</div>
          <div v-if="item.tag.snack" class="or">小吃</div>
          <div v-if="item.tag.vipTag" class="or">折扣卡</div>
          <div v-for="(data, index) in item.tag.hallType" :key="index" class="bl">{{data}}</div>
        </div>
        <div v-if="item.promotion.cardPromotionTag" class="address">
          <div class="discount-label normal"><img src="https://p1.meituan.net/scarlett/ff1c6e33ed0ac3cd862910a83d4bf959583.png" width="15px" height="14px"></div>
          <div class="discount-label-text">{{item.promotion.cardPromotionTag}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      cinemaList: []
    }
  },
  mounted () {
    axios.get('/ajax/cinemaList').then(res => {
      console.log(res)
      this.cinemaList = res.data.cinemas
    })
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
}
.cinema_body ul {
  padding: 20px;
  padding-bottom: 0;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body ul li>div {
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
.cinema_body .address span:nth-of-type(1){
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
.discount-block{
  color: #999;
  margin-bottom: 4px;
}
.discount-label{
  width: 15px;
  height: 14px;
  position: relative;
  top: 3px;
  display: inline-flex;
}
.discount-label-text{
  margin-left: 0;
  font-size: 11px;
  display: inline-block;
  color: #999;
}
</style>
