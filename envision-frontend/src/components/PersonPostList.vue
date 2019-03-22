<template>
  <div>
    <div class="article-list">
      <v-card v-for="item in items" :key="item.id" :to="item.link" class="mb-2">
        <v-card-title primary-title class="article-title">
          <div style="font-size:10px">{{ item.partition }} &nbsp;|&nbsp;{{ item.create_time }}</div>
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
      axios.get(`${'https://cors-anywhere.herokuapp.com/'}http://www.aait-suse.cn/api/PostVieweSet/?author_id=${pid}`
      ).
      then(function(response) {
        console.log(response.data)
        self.items=response.data.results;
        self.PersonSectionGet();
      }).
      catch(function(error) {
        console.log(error);
      });
    },
    PersonSectionGet: function() {
      let self = this;
      for(i=0 ; i<self.items.length ; i++) {
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}http://www.aait-suse.cn/api/SectionViewSet/${self.items[i].section_id}`
        ).
        then(function(response) {
          self.items[i].partition = response.data.results[0].theme;
        }).
        catch(function(error) {
          console.log(error);
        });
      }
    }
  },
  mounted() {
    this.PersonPostListGet();
  }
}
</script>
