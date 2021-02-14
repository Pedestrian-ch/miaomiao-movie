<template>
  <div class="city_body">
    <div class="city_list">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li v-for="item in hotCity" :key="item.id">
            {{ item.nm }}
          </li>
        </ul>
      </div>
      <div class="city_sort">
        <div v-for="(item, key) in cityList" :key="key">
          <h2 :id="key">{{ key }}</h2>
          <ul>
            <li v-for="data in item" :key="data.id">
              {{ data.nm }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(item, key) in cityList" :key="key">
          <a :href="'#' + key" style="color: fff">{{
            key
          }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      cityList: [],
      hotCity: []
    }
  },

  // 这个是之前请求的卖座的api,但是数据太少了,放弃了这个api
  // mounted () {
  //   axios({
  //     url: 'https://m.maizuo.com/gateway?k=1471170',
  //     headers: {
  //       'X-Client-Info':
  //         '{"a":"3000","ch":"1002","v":"5.0.4","e":"1608876028594277444878337"}',
  //       'X-Host': 'mall.film-ticket.city.list'
  //     }
  //   }).then((res) => {
  //     // 按拼音首字母大写分类的城市列表
  //     var cityList = []
  //     // 热门城市列表
  //     var hotCity = []

  //     // 定义一个筛选列表函数
  //     function filterList (data) {
  //       // 定义拼音首字母大写的列表变量
  //       var letters = []

  //       // 筛选数据,得到拼音首字母大写列表,并且得到热门城市列表
  //       data.forEach((item) => {
  //         var letter = item.pinyin.substring(0, 1).toUpperCase()
  //         if (letters.indexOf(letter) === -1) {
  //           letters.push(letter)
  //         }
  //         if (item.isHot === 1) {
  //           hotCity.push(item)
  //         }
  //       })

  //       // 根据拼音首字母对数据进行分类,得到按拼音首字母大写分类的城市列表
  //       letters.forEach((letter) => {
  //         var list = []
  //         data.forEach((item) => {
  //           var alphabet = item.pinyin.substring(0, 1).toUpperCase()
  //           if (alphabet === letter) {
  //             list.push(item)
  //           }
  //         })

  //         cityList.push({
  //           alphabet: letter,
  //           data: list
  //         })
  //       })
  //     }

  //     filterList(res.data.data.cities)

  //     // 将cityList按大写字母顺序进行排序
  //     cityList.sort((a, b) => {
  //       if (a.alphabet > b.alphabet) {
  //         return 1
  //       } else if (a.alphabet < b.alphabet) {
  //         return -1
  //       } else {
  //         return 0
  //       }
  //     })

  //     this.cityList = cityList
  //     this.hotCity = hotCity
  //   })
  // },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      axios.get('/data/index.json').then((res) => {
        // 城市列表
        var cityList = res.data.letterMap
        // 热门城市列表
        var hotCity = []

        // 找出属于热门城市的城市
        for (var key in cityList) {
          cityList[key].forEach(item => {
            if (item.rank === 'A' || item.rank === 'S') {
              hotCity.push(item)
            }
          })
        }

        // 根据rank值排序
        hotCity.sort((a, b) => {
          if (a.rank > b.rank) {
            return -1
          } else if (a.rank < b.rank) {
            return 1
          } else {
            return 0
          }
        })

        this.cityList = cityList
        this.hotCity = hotCity
        console.log(hotCity)
      })
    }
  }
}
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}

.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}

.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}

.city_body .city_index a {
  color: #000;
  text-decoration: none;
}
</style>
