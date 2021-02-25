<template>
  <div id="detailContrainer" class="slide-enter-ative">
    <Header :title="detailMovie.nm">
      <i class="iconfont icon-right" @touchstart="toRouterBack"></i>
    </Header>
    <Loader v-if="!haveData" style="position: absolute; left: 50%; top: 50%; margin-top: -4px; margin-left: -20px"></Loader>
    <div id="content" class="contentDetail" v-else>
      <div class="detail_list">
        <div class="detail_list_bg"></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="detailMovie.img | filterImgUrl('@300w_414h_80q_1e_1c')" alt="" />
          </div>
          <div class="detail_list_info">
            <h2><b>{{detailMovie.nm}}</b></h2>
            <p>{{detailMovie.enm}}</p>
            <p>{{detailMovie.sc}}</p>
            <p>{{detailMovie.cat}}</p>
            <p>{{detailMovie.star}}</p>
            <p>{{detailMovie.pubDesc}} / {{detailMovie.dur}}</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p><b>简介</b></p>
        <p>
          {{detailMovie.dra}}
        </p>
      </div>
      <div style="margin-left: 10px"><b>剧照</b></div>
      <div class="detail_player swiper-container">
        <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="item in detailMovie.photos" :key="item">
            <div>
              <img :src="item | filterImgUrl('@420w_279h_80q_1e_1c')" alt="" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  data () {
    return {
      detailMovie: {},
      haveData: false
    }
  },
  components: {
    Header
  },
  props: ['movieId'],
  methods: {
    toRouterBack () {
      this.$router.back()
    }
  },
  activated () {
    console.log(this.movieId)
    this.haveData = false
    this.axios.get('/ajax/detailmovie?movieId=' + this.movieId).then((res) => {
      this.detailMovie = res.data.detailMovie
      this.haveData = true
      this.$nextTick(() => {
        // eslint-disable-next-line
        var swiper = new Swiper('.swiper-container', {
          direction: 'horizontal',
          width: 140,
          freeMode: true
        })
      })
    })
  }
}
</script>

<style scoped>
#content.contentDetail {
  display: block;
  margin-bottom: 0;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  background: url(/images/movie_1.jpg) 0 40%;
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 12px;
  color: #ccc;
}

#content .detail_intro {
  padding: 10px;
}
#content .detail_player {
  margin: 10px;
}
.detail_player .swiper-slide {
  width: 140px;
  margin-right: 10px;
  text-align: center;
  font-size: 14px;
}
.detail_player .swiper-slide img {
  width: 100%;
  margin-bottom: 5px;
}
.detail_player .swiper-slide p:nth-of-type(2) {
  color: #999;
}
</style>
