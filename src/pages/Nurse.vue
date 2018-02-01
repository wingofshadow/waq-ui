<template>
<div class="nurse">
  <mt-header fixed title="月嫂推荐">
    <router-link to="/" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header>

  <div class="page-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange"
      :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
      :auto-fill='false'>
      <ul>
        <li v-for="item in list" class="list-item">
          <img alt="" :src="item.portrait"/>
          <div class='item-right' style="line-height:21px;margin-top:5px;">
            <div>
              <span style="color:#1f1f1f;font-size:18px;">{{item.name}}</span>
              <span style="color:#f7879d;font-size:14px;margin-left:8px;">LV{{item.level}}</span>
            </div>
            <div style="color:#c3c3c6;font-size:14px;">
              {{item.age}}岁 来自{{item.province}}
            </div>
            <div style="color:#303030;font-size:16px;">
              {{item.desc}}
            </div>
          </div>
          <div class="item-price">{{item.price}}元/26天</div>
        </li>
      </ul>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">
          <mt-spinner type="snake"></mt-spinner>
        </span>
      </div>
    </mt-loadmore>
  </div>
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nurse {
  margin-top: 48px;
}

.page-wrapper ul img {
  height:80px;
  width:auto;
  border-radius: 50%;
  margin-right: 10px;
}

.list-item:first-child {
    /*border-top: 1px solid #eee;*/
}

.list-item {
    position: relative;
    border-bottom: 1px solid #eee;
    text-align: left;
    padding: 3px 10px;
}

.list-item .item-right{
  vertical-align: top;
  display: inline-block;
}

.list-item .item-price{
  color:#ff879d;
  font-size:16px;
  position: absolute;
  top:8px;
  right:15px;
}

</style>

<script>
import RestApi from '@/common/RestApi'

const pageSize = 10;
export default {
  name: 'Nurse',
  data() {
    return {
      list: [],
      wrapperHeight: 0,
      topStatus: '',
      allLoaded: false,
      nextPage : 1,
    }
  },
  methods: {
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadTop: function(){
      this._fetchData(1).then((res)=>{
          var elems = res.data;
          this.list = elems;
          this.nextPage = 2;
          if(elems.length < pageSize){
            this.allLoaded = true;
          } else {
            this.allLoaded = false;
          }
          this.$refs.loadmore.onTopLoaded();
        }
      );
    },
    loadBottom: function(){
      this._fetchData(this.nextPage).then((res)=>{
          var elems = res.data;
          this.list = this.list.concat(elems);
          this.nextPage++;
          if(elems.length < pageSize){
            this.allLoaded = true;// 若数据已全部获取完毕
          }
          this.$refs.loadmore.onBottomLoaded();
        }
      );
    },
    _fetchData: function(pageNo){
      return RestApi.fetch({
        method: 'post',
        uri: '/api/nurse',
        data: {
          pageNo: pageNo,
          pageSize: pageSize,
        },
      });
    }

  },

  mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      this.loadBottom();
  }
}
</script>
