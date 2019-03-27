<template>
  <div>
    <span>
      <v-btn icon :to="'/forum'">
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      返回论坛首页
    </span>
    <v-card >
      <v-list two-line>
        <div v-for="item in items" :key="item">
          <v-list-tile :to="/postDetail/ +item.post_id">
            <v-list-tile-avatar>
              <img :src="'https://api.adorable.io/avatars/165/' + item.userAvatar" alt="avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.author_name }}</v-list-tile-title>
              <v-list-tile-sub-title style="font-size:10px">
                {{ item.create_time }}
              </v-list-tile-sub-title>
              <v-list-tile-sub-title class="text--primary" style="font-size:12px" v-html="item.content">
              </v-list-tile-sub-title>
            </v-list-tile-content>

          </v-list-tile>
          <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`">
          </v-divider>
        </div>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      items:[],
    }
  },
    methods:{
      PostListGet: function() {
      let pid = this.$route.params.id;
      let self = this;
      axios.get(`http://127.0.0.1:8000/api/PostVieweSet/?ordering=-create_time&section_id=${pid}`
      ).
      then(function(response) {
        self.items=response.data.results;
        console.log(response)
        for(let i=0 ; i<self.items.length ; i++) {
          axios.get(`http://127.0.0.1:8000/api/UserViewSet/${self.items[i].author_id}/`
          ).
          then(function(response) {
            self.items[i].author_name = response.data.username;
            self.items[i].userAvatar = response.data.user_logo;
          }).
          catch(function(error) {
            console.log(error);
          });
        }
      }).
      catch(function(error) {
        console.log(error);
      });
    }
  },
  mounted() {
    this.PostListGet();
  }
}
</script>
