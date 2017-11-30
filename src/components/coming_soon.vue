<template>
  <div>
    <div class="container">
      <h3 class="page-header">{{title}}</h3>
      <div class="row">
        <div class="col-sm-6 col-md-4 item" v-for="(item,index) in items">
          <div class="thumbnail">
            <div class="img-box">
              <img :src="item.images.large">
            </div>
            <div class="caption">
              <h4>{{item.title}}</h4>
              <p>
                导演：
                <span v-for="(director,i) in item.directors">
                  <span>{{i >= item.directors.length - 1 ? director.name : director.name + "、"}}</span>
                </span>
              </p>
              <p>
                主演：
                <span v-for="(cast,i) in item.casts">
                  <span>{{i >= item.casts.length - 1 ? cast.name : cast.name + "、"}}</span>
                </span>
              </p>
              <p>年份: {{item.year}}</p>
              <p>评分：{{item.rating.average}}</p>
            </div>
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation" class="text-center">
        <ul class="pagination">
          <li @click=getPrew()>
            <a aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li v-for="(v,i) in totalNumber" @click=getCurrent(v)>
            <a>{{v}}</a></li>
          <li>
            <a aria-label="Next" @click=getNext()>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
  const jsonp = require("jsonp")
  export default {
    props: {
      subject: {
        type: Object
      }
    },
    data() {
      return {
        items: "",
        start: 0,
        count: 10,
        page: 1,
        directors: [],
        total: 0,
        totalNumber: [],
        casts: [],
        title: "正在热映",
        totalPage: 0,
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        var str = window.location.hash;
        str = str.slice(2, str.length);
        if (str === "in_theaters") {
          this.title = "正在热映"
        } else if (str === "coming_soon") {
          this.title = "即将上映"
        } else {
          this.title = "top250"
        }
        this.start = (this.page - 1) * this.count
        jsonp("http://api.douban.com/v2/movie/" + str + "?start=" + this.start + "&count=" + this.count, null, (err, data) => {
          this.total = data.total;
          this.items = data.subjects;
          this.totalPage = Math.ceil(data.total / data.count);
          for (var i = 1; i <= this.totalPage; i++) {
            if (this.totalNumber.length < this.totalPage) {
              this.totalNumber.push(i);
            }
          }
        })
      },
      getNext() {
        this.page++;
        if (this.page > this.totalPage) {
          this.page = this.totalPage;
        }
        this.getData()
      },
      getPrew() {
        this.page--;
        if (this.page < 1) {
          this.page = 1;
        }
        this.getData()
      },
      getCurrent(idx) {
        this.page = idx;
        this.getData()
      },
    }
  }
</script>
<style>
  .page-header {
    margin-top: 25px
  }
  
  .thumbnail p {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }
  
  .thumbnail .img-box {
    width: 100%;
    height: 300px;
    text-align: center;
    vertical-align: top
  }
  
  .thumbnail .img-box img {
    max-height: 100%;
  }
</style>
