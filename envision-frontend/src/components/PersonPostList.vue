<template>
  <div>
    <div class="post-list">
      <v-card v-for="item in items" :key="item" :to="item.link" class="mb-2">
        <v-card-title primary-title class="post-title">
          <div style="font-size:10px">{{ item.theme }} &nbsp;|&nbsp;{{ item.create_time }}</div>
        </v-card-title>
        <v-card-text v-html="item.content">
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" flat :to="/postdetail/ + item.post_id">阅读</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import storage from '@/plugins/storage';

export default {
  data() {
    return {
      items:[],
    }
  },
  methods: {
    PersonPostListGet: function() {
      let self = this;
      let pid = storage.state.uid;
      axios.get(`http://127.0.0.1:8000/api/PostVieweSet/?ordering=-create_time&author_id=${pid}`
      ).
      then(function(response) {      
        self.items=response.data.results;
        for(let i=0 ; i<self.items.length ; i++) {
          axios.get(`http://127.0.0.1:8000/api/SectionViewSet/${self.items[i].section_id}/`
          ).
          then(function(response) {
            self.items[i].theme = response.data.theme;
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
    this.PersonPostListGet();
  }
}
</script>
