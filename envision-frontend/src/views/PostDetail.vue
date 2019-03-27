<template>
  <div>
    <v-card class="mb-3">
      <v-card-title primary-title>
        <v-avatar color="grey lighten-4" :size=40 slot="activator">
          <img :src="'https://api.adorable.io/avatars/165/' + posterAvatar" alt="avatar">
        </v-avatar>
        <v-list-tile-content style="font-size:20px">
          <v-list-tile-title>{{ author_name }}</v-list-tile-title>
          <v-list-tile-sub-title class="grey--text" style="font-size:10px">
            {{ theme }} &nbsp;|&nbsp; {{ create_time }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-card-title>
      <v-card-text v-html="content"></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small flat color="info" @click="dialog = !dialog">评论</v-btn>
      </v-card-actions>
    </v-card>      
    <v-card v-for="answer in answers" :key="answer.comment_id" class="mb-1">
      <v-card-title>
        <v-list-tile-avatar>
          <img :src="'https://api.adorable.io/avatars/165/' + answer.posterAvatar" alt="avatar">
        </v-list-tile-avatar>
        <v-list-tile-content style="font-size:20px">
          <v-list-tile-title>{{ answer.author_name }}</v-list-tile-title>
          <v-list-tile-sub-title class="grey--text" style="font-size:10px">
            第{{ answer.comment_id }}楼 &nbsp;|&nbsp; {{ answer.create_time }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-card-title>
      <v-card-text>
        <span v-html="answer.content"></span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-tooltip top>
          <v-btn flat color="success" icon slot="activator">
            <v-icon>sentiment_satisfied_alt</v-icon>
          </v-btn>
          <span>点赞</span>
        </v-tooltip>
        <span class="font-weight-bold mx-2">{{ vote }}</span>
        <v-btn outline color="grey" slot="activator" @click=";" class="mx-2">
          <v-icon>insert_comment</v-icon> 回复
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" max-width="780">
      <v-card>
        <quill-editor ref="myTextEditor" v-model="editorContent">
        </quill-editor> 
        <v-layout row wrap>
          <v-flex class="px-4">
            <v-btn block @click="PostSetPost">确认</v-btn>
          </v-flex>
          <v-flex class="px-4">
            <v-btn color="info" block @click="dialog = false">取消</v-btn>
          </v-flex>
        </v-layout>
      </v-card>  
    </v-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import envisionEditor from '@/components/TextEditorFull'
  import storage from '@/plugins/storage';

  export default {
    components: {
      envisionEditor
    },
    data: () => ({
      editorContent: '',
      posterAvatar:  '',
      author_name: '',
      theme: '',
      section_id: null,
      content: '',
      create_time: '',
      dialog: false,
      vote: 177,
      answers: []
    }),
    methods:{
      PostDetailGet: function() {
        let pid = this.$route.params.id;
        let self = this;
        axios.get(`http://127.0.0.1:8000/api/PostVieweSet/${pid}`
        ).
        then(function(response) {
          self.content = response.data.content;
          self.create_time = response.data.create_time;
          self.section_id = response.data.section_id;  
          axios.get(`http://127.0.0.1:8000/api/UserViewSet/${response.data.author_id}`
          ).
          then(function(response) {
            self.author_name = response.data.username;
            self.posterAvatar = response.data.user_logo;
          }).
          catch(function(error) {
            console.log(error)
          });
          axios.get(`http://127.0.0.1:8000/api/SectionViewSet/${self.section_id}`
          ).
          then(function(response) {
            self.theme = response.data.theme;
          }).
          catch(function(error) {
            console.log(error);
          });
        }).
        catch(function(error) {
          console.log(error);
        });
        axios.get(`http://127.0.0.1:8000/api/PostCommentViewSet/?post_id=${pid}`
        ).
        then(function(response) {
          self.answers = response.data.results;
          for(let i=0; i<self.answers.length; i++) {
            axios.get(`http://127.0.0.1:8000/api/UserViewSet/${self.answers[i].author_id}`
            ).
            then(function(response) {
              self.answers[i].author_name = response.data.username;
              self.answers[i].posterAvatar = response.data.user_logo;
            }).
            catch(function(error) {
              console.log(error);
            });
          }
        }).
        catch(function(error) {
          console.log(error);
        });
      },
      PostSetPost: function() {
        let self = this;
        let pid = this.$route.params.id;
        let myDate = new Date();
        axios.post('http://127.0.0.1:8000/api/PostCommentViewSet/', {
          'post_id': pid,
          'author_id': storage.state.uid,
          'create_time': myDate.toLocaleString('chinese', {hour12: false}).replace(/\//g,"-"),
          'content': self.editorContent.toString(),
        }).
        then(function(response){
          self.dialog = false;
          self.PostDetailGet();
        }).
        catch(function(error) {
          console.log(error);
        });
      }
    },
    mounted() {
      this.PostDetailGet();
    }
  }
</script>