<template>
<v-dialog v-model="dialog" persistent width="900px">
              <template v-slot:activator="{ on }">
                <v-btn color='primary' slot="activator" v-on="on">
                    借用登记
                  </v-btn>
                </template>
              <v-card>
            <v-card-title>
          <span class="headline">借用登记表</span>
        </v-card-title>

        <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-btn icon><v-icon>accessibility_new</v-icon></v-btn>
                  <v-flex xs8 >
                    <v-text-field label="借用人员" required>
                  </v-text-field>
                 </v-flex>
              </v-layout>

              <v-layout>
                <v-btn icon><v-icon>local_phone</v-icon></v-btn>
                  <v-flex xs8 >
                    <v-text-field label="联系方式" required></v-text-field>
                  </v-flex>
              </v-layout>

              <v-layout>
                <v-btn icon><v-icon>build</v-icon></v-btn>
                   <v-flex xs8 >
                  <v-text-field label="物品名称" required></v-text-field>
                   </v-flex>
              </v-layout>

              <v-layout>
                <v-btn icon><v-icon>playlist_add</v-icon></v-btn>
                   <v-flex xs8  >
                  <v-text-field label="借用数量" required></v-text-field>
                   </v-flex>
              </v-layout>

              <v-layout>
                <v-btn icon><v-icon>access_alarm</v-icon></v-btn>
                   <v-flex xs4>
              <v-dialog
                  ref="dialog1"
                  v-model="borrowtime"
                  :return-value.sync="date"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="借出时间"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="borrowtime = false">取消</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog1.save(date)">确认</v-btn>
                  </v-date-picker>
                </v-dialog>
             </v-flex>
              
            <v-flex xs4>
              <v-dialog
                ref="dialog2"
                v-model="returntime"
                :return-value.sync="date"
                persistent
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="归还时间"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="returntime = false">取消</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog2.save(date)">确认</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
              </v-layout>

                   </v-container>
                  </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">借用申请</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </template>
          
<script>
  export default {
    data () {
      return {
        dialog:false,
        borrowtime: false,
        returntime: false
      }
    }
  }
</script>