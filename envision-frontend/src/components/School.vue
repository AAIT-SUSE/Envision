  <template>
     <v-card raised style="max-height: 1000px;">
        <v-toolbar color="pink" dark dense height="80px">
          <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-menu :nudge-width="100">

          <template v-slot:activator="{ on }">
            <v-toolbar-title v-on="on">
                <span>学习清单</span>
                    <v-icon dark>arrow_drop_down</v-icon>
            </v-toolbar-title>
          </template>

          <v-list>
            <v-list-tile
                        v-for="item in items"
                        :key="item"
                        @click=""
            >
              <v-list-tile-title v-text="item"></v-list-tile-title>
            </v-list-tile>
            </v-list>
                  </v-menu>

          <v-spacer></v-spacer>
            <v-tooltip bottom>
                <v-btn icon slot="activator">
                    <v-icon>notifications</v-icon>
                </v-btn>
                    <span>开启“监督我”功能</span>
              </v-tooltip>
              <Addlist></Addlist> 
            </v-toolbar>
          
          <v-expansion-panel focusable>
              <v-expansion-panel-content
                v-for="(item,i) in 6"
                :key="i"
              >
            <template v-slot:header>
              <div> 
                <div>
                  <v-btn icon>
                  <v-icon>check_circle_outline</v-icon>
                  </v-btn>
                  {{topic}}
                </div>
                <span class="grey--text">截止日期：{{end_time}}</span>
              </div>

            <v-card-actions >
              <v-spacer></v-spacer>
                <v-btn icon >
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-card-actions>
            </template>

            <v-card>
              <v-card-text class="grey lighten-3">{{content}}</v-card-text>
                </v-card>
              </v-expansion-panel-content>
          </v-expansion-panel>
     </v-card>
  </template>

<script>
import Addlist from '@/components/Addlist'
import axios from 'axios'
export default {
    components: {
    Addlist
  },
  data: () => ({
    topic:'Top1',
    end_time:'2019-03-09',
    content:'(1)周一完成发现杯项目部署；（2）周二完成高等数学第二章第8小题；（3）周五完成c语言小组作业，并上传源代码到小组文件；',
  
    items: [
      '学习清单', '学习目标'
    ]
  }),
    
  methods:{
    SchoolGet: function() {
      let self = this;
      axios.get('http://127.0.0.1:8000/api/LearningTaskViewSet/')
      .then(function(response) { 
        console.log(response.data)
        self.topic = response.data.topic;
        self.end_time = response.data.end_time;
        self.content = response.data.content;             
      })
      .catch(function(error) {
        console.log(error)
      });
    }
  },
  mounted() {
    this.SchoolGet();
  }      
}
</script>
