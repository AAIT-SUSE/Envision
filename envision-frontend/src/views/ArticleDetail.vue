<template>
  <div>
    <span>
      <v-btn icon :to="'/explore/articlelist'">
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      返回文章列表
    </span>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ title }}</h3>
              <div>作者 {{ author }} , 发表于 {{ time }}</div>
            </div>
          </v-card-title>
          <v-card-text v-html="content"></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  data() {
    return {
      title: '',
      author: '',
      content: '',
      time: '',
    }
  },
  methods: {
    GetArticleContent: function() {
      let aid = this.$route.params.id;
      let self = this;
      axios.get(`${'https://cors-anywhere.herokuapp.com/'}http://www.aait-suse.cn/api/ArticleViewSet/${aid}/`
      )
      .then(function(response) {
        self.content = response.data.content;
        self.author = response.data.anthor_name;
        self.title = response.data.topic;
        self.time = response.data.create_time;
      })
      .catch(function(error) {
        console.log(erro);
        
      });
    }
  },
  mounted() {
    this.GetArticleContent();
  }
}
</script>
