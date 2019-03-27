<template>
  <div>
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
      axios.get(`http://127.0.0.1:8000/api/ArticleViewSet/${aid}/`
      )
      .then(function(response) {
        self.content = response.data.content;
        self.title = response.data.topic;
        self.time = response.data.create_time;
        axios.get(`http://127.0.0.1:8000/api/UserViewSet/${response.data.author_id}`
        ).
        then(function(response) {
          self.author = response.data.username;
        }).
        catch(function(error) {
          console.log(error);
        });
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
