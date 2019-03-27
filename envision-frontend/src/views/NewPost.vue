<template>
  <div>
    <p class="display-1">创建主题帖<span class="font-weight-thin"> New Post</span></p>
    <v-layout wrap row>
      <v-flex class="px-4" xs6>
        <v-text-field label="填写帖子主题:" v-model="topic"></v-text-field>
      </v-flex>
      <v-flex class="px-4" xs6>
        <v-select :items="sectionSelects" v-model="vid" label="选择发布版块:"></v-select>
      </v-flex>
    </v-layout>
    <div class="envision-editor">
      <quill-editor ref="myTextEditor" v-model="editorContent">
      </quill-editor>
    </div>
    <v-layout row wrap>
      <v-flex class="px-4">
        <v-btn block>保存为草稿</v-btn>
      </v-flex>
      <v-flex class="px-4">
        <v-btn color="info" block @click="NewPost">发表主题</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import envisionEditor from '@/components/TextEditorFull'
  import axios from 'axios'
  import storage from '@/plugins/storage';

  export default {
    components: {
      envisionEditor
    },
    data: () => ({
      editorContent: '',
      topic: '',
      vid: null,
      sectionSelects: [
        {value: 1, text: '嵌入式技术交流区'},
        {value: 2, text: '软件技术交流区'},
        {value: 3, text: '机器人技术交流区'},
        {value: 4, text: '生活轶事交流区'},
       ],
    }),
    methods: {
      NewPost: function() {
        let self = this;
        let myDate = new Date();
        axios.post('http://127.0.0.1:8000/api/PostVieweSet/', {
          'author_id': storage.state.uid,
          'create_time': myDate.toLocaleString('chinese', {hour12: false}).replace(/\//g,"-"),
          'section_id': self.vid,
          'topic': self.topic,
          'content': self.editorContent,
        }).
        then(function(response){
        }).
        catch(function(error) {
          console.log(error);
        });     
      },
    }
  }
</script>