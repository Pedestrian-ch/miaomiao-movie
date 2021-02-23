<template>
  <div class="movie_body">
    <Loader v-if="!haveData"></Loader>
    <Scroller :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd" v-else ref="movie_body">
      <ul>
        <li v-for="item in dataObject.coming" :key="item.id">
          <div class="pic_show"><img :src="item.img | filterImgUrl()" /></div>
          <div class="info_list">
            <h2>{{item.nm}} <span v-if="item.version" :class="'version ' + item.version"></span></h2>
            <p><span class="person">{{item.wish}}</span> 人想看</p>
            <p>主演: {{item.star}}</p>
            <p>{{item.rt}}上映</p>
          </div>
          <div class="btn_pre">预售</div>
        </li>
        <li v-if="isPrompt" style="border: none">
          <Loader v-if="isLoader"></Loader>
          <div v-else
           style="margin: 0 auto">{{ pullUpMsg }}</div>
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
      isLoader: false, // 是否正在上拉加载请求
      haveData: false, // 是否页面数据是否正在请求
      isPrompt: false, // 是否显示上拉加载提示
      pullUpMsg: '', // 显示的提示内容
      cityId: -1 // 存储城市id，进而比较存储的与现在的城市id是否相同以此判断是否需要更新keep-alive的缓存
    }
  },
  activated () {
    if (this.cityId !== this.$store.state.city.cityId) {
      this.haveData = false
      this.axios.get('/ajax/comingList?token=&ci=' + this.$store.state.city.cityId).then((res) => {
        this.dataObject = res.data
        this.haveData = true
        this.cityId = this.$store.state.city.cityId
        this.isPrompt = false
        if (this.$refs.movie_body) {
          this.$refs.movie_body.toScrollTop(0)
          setTimeout(() => {
            this.$refs.movie_body.scroll.refresh()
          }, 500)
        }
      })
    }
  },
  methods: {
    handleToDetail () {
      console.log('handleToDetail')
    },
    handleToScroll (pos, scroll) {
      if (pos.y < scroll.maxScrollY - 30) {
        this.isPrompt = true
        this.pullUpMsg = '上拉加载更多'
      }
    },
    handleToTouchEnd (pos, scroll) {
      if (pos.y < scroll.maxScrollY - 30) {
        var len = this.dataObject.coming.length
        this.isLoader = true
        scroll.refresh()
        if (len !== this.dataObject.movieIds.length) {
          this.axios
            .get(
              '/ajax/moreComingList?ci=' + this.$store.state.city.cityId + '&token=&limit=10&movieIds=' +
                encodeURI(
                  this.dataObject.movieIds.slice(len, len + 10).join(',')
                )
            )
            .then((res) => {
              this.pullUpMsg = '加载完毕'
              this.dataObject.coming.push(...res.data.coming)
              this.isLoader = false
              this.isPrompt = false
              setTimeout(() => {
                scroll.refresh()
              }, 500)
            })
        } else {
          this.pullUpMsg = '没有更多数据了'
          this.isLoader = false
        }
      }
    }
  }
}
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.version {
    background-size: contain;
    background-repeat: no-repeat;
    height: 14px;
    width: 17px;
    display: inline-block;
    margin-top: 5px;
    -webkit-box-flex: 0;
    flex: 0 0 auto;
    margin-right: 3px;
}
.version.v2d.imax {
    width: 43px;
    background-image: url(data:image/png;base64,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);
}
.version.v3d.imax {
    width: 43px;
    background-image: url(data:image/png;base64,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);
}
.version.v3d {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAcCAYAAAAEN20fAAAAAXNSR0IArs4c6QAAA0VJREFUSA3tV1tIFGEU/mZ23F11vaTrZbNs1TIxawkSuyEWIRVU2ksEvRQFRU+91EvQmw9Rb1EQRARFVCC9iCRF201MKlRCMctN3RRb23VRd9e9TecfW2XWmdEedvOh8zJzzn/+c745t39+DkRH73evEcOBqwBXJ4qihckSTRzHjQGinROMF5tP2JycBCIU6BaBnEQ7V7LPAW4uxWgTWCT+FQgGTPJNGHiWDiWkyZVxdXyyakLrwxgGisjKoP9A4vMgxAvieYHnsHe9GdacNESiIhxuH14P/kKY3hlV5JtQSmsxYuLx6Vk4J/1wzQRj4iWfmkCyjAKaDlZidaYR/lAEOo6DXuDRWGXBpZZe+EhWU7wKDcQrUdeoFzffOZYFSBPIme1WCcStdgdefpsAT0CO2YrQuNmCQ5sK8ajrx7z/y619cHh8MOh45JsM2LY2G0dI5/rhKpxv7sHUbHheV+lFtVgpI6iksA9MTKPtiwuhiIjZcBSt/eOSHUuGQWaPRcwXjMDjD6HfNY0Hn5y49uorMgwCjm8tkukqMaoRYbk+9bhr0R6bJUuS9Y5PLVqLF3QOT2KIosTSd7tjKH5ZxqsCkWkRc7pmHTaY01Gam4ann8ekVMXrKPFObwC7rDnQU8qCkaiSiiRTTU38jnyTHuZ0vVQnzCjrpuXQzJ/aMBl0murLjkjTiwHJUG1pLi7Ulklfd+/DiKZxtphHhRuk2nL7Qpq6qhEppGI8t8OK3SXyv4M3NEMmqSCrqSuWIpNeh3JKp9PrX0oVqkC8gRD2lefhZHUxpWPBTgEBZPPFG9Bux9QUHmd3liCduuZJz+iCAZU31dT4Q1G09f/E/ooCXKmvgJ3mCKuRPWVm0N8VWvrm2jhml4H2UPjZwGPRrCrMRHZqCp4PuNAx5ImpqT5VgbAddzqHwdq4fmMetlgyJSMsLTfeDqL9u1tm9AABZsSOATbi2fx5Rh/y0emV6akxXMPd93OHhpoGyfU6DgUZRgRoaP3N+aFhctGSZkRi2kGaqiN0iCWSVIs1kU6VbK8cIHP3CyWMyZMxDBQR0Z48l2qeRDvPblo0r+S9qKafADnzzTDw0nWPblo0ox4mM03Ml+STfDMMvwErHhRiC0ymfAAAAABJRU5ErkJggg==);
}
.person{
  color: #faaf00;
  font-size: 15px;
  font-weight: 600;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
</style>
