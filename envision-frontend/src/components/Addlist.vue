<template>
<v-dialog v-model="dialog" persistent width="900px">
              <template v-slot:activator="{ on }">
                <v-btn icon slot="activator" v-on="on">
                    <v-icon>add</v-icon>
                  </v-btn>
                </template>
              <v-card>
            <v-card-title>
          <span class="headline">新建任务</span>
        </v-card-title>

        <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="标题" required></v-text-field>
                   </v-flex>
                <v-flex xs12 sm6 md4>
             <v-text-field
                    label="时间"
                    hint="开始时间-结束时间"
                    persistent-hint
                    required
          ></v-text-field>
        </v-flex>
               
        <v-flex xs11>
          <v-combobox
            v-model="select"
            :items="items"
            label="分类"
            multiple
            chips
          >
            <template v-slot:selection="data">
              <v-chip
                :key="JSON.stringify(data.item)"
                :selected="data.selected"
                :disabled="data.disabled"
                class="v-chip--select-multi"
                @input="data.parent.selectItem(data.item)"
              >
                <v-avatar
                  class="accent white--text"
                  v-text="data.item.slice(0, 1).toUpperCase()"
                ></v-avatar>
                {{ data.item }}
              </v-chip>
            </template>
          </v-combobox>
         </v-flex>   
         <envision-editor class="mt-4"></envision-editor>
          <small>做完这个任务，你们就是最亮的崽*v*</small>
          </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">取消</v-btn>
            <v-btn color="blue darken-1" flat @click="dialog = false">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </template>
          
<script>
import envisionEditor from '@/components/TextEditorFull'
  export default {
    components:{
      envisionEditor
    },
     
    data () {
      return {
        select: ['C语言学习', 'Programming'],
        items: [
          'Programming',
          'Design',
          '前端',
          'C语言学习'
        ], 
        tags: [],
        dialog:false,  
       
      }
    }
  }
</script>