<template>
  <div>
    <p class="display-1">创建文章<span class="font-weight-thin"> New Article</span></p>
    <v-text-field label="填写文章标题:" v-model="articleTitle"></v-text-field>
    <v-combobox
      color="success"
      flat
      v-model="tags"
      label="输入文章所属的标签，每输入一个标签后按下Enter键确认"
      append-icon=""
      messages="为你的文章添加合适的话题标签，有助于更多对该话题感兴趣的人浏览到文章"
      chips
      clearable
      multiple
    >
      <template slot="selection" slot-scope="data">
        <v-chip
          :selected="data.selected"
          close
          @input="remove(data.item)"
        >
          <strong>{{ data.item }}</strong>&nbsp;
        </v-chip>
      </template>
    </v-combobox>
    <div class="envision-editor mt-4">
      <quill-editor ref="myTextEditor" v-model="editorContent">
    </quill-editor>
  </div>
    <v-layout row wrap>
      <v-flex class="px-4">
        <v-btn block>保存为草稿</v-btn>
      </v-flex>
      <v-flex class="px-4">
        <v-btn color="info" block @click="NewArticle()">发表文章</v-btn>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" max-width="300px" dark>
      <v-card>
        <v-card-text>发布成功，请点击确认返回。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="green" @click="dialog = false">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      tags: [],
      dialog: false,
      articleTitle: '',
      editorContent: '',
    }),
    methods: {
      NewArticle: function() {
        let self = this;
        let myDate = new Date();
        axios.post('http://127.0.0.1:8000/api/ArticleViewSet/', {
          'author_id': storage.state.uid,
          'create_time': myDate.toLocaleString('chinese', {hour12: false}).replace(/\//g,"-"),
          'tag': self.tags.join(),
          'topic': self.articleTitle,
          'content': self.editorContent,
        }).
        then(function(response){
          self.dialog = true;
        }).
        catch(function(error) {
          console.log(error);
        });     
      },
    }
  }
</script>