<template>
    <v-container fluid fill-height>
        <v-layout row>
            <v-flex xs12 sm10 md10 offset-sm1>
                <v-card>
                    <v-toolbar color="blue darken-3" dark>
                        <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

                        <v-toolbar-title>Projekt {{ name }} bearbeiten</v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-btn icon to="/">
                            <v-icon>close</v-icon>
                        </v-btn>

                    </v-toolbar>
                </v-card>
                <!-- // hier beginnt das einfügen -->
                <v-card>
                    <v-card-text>
                        <v-autocomplete v-model="member" :items="names" box chips color="blue-grey lighten-2" label="Projektteilnehmer" item-text="name" item-value="name" multiple>
                            <template slot="selection" slot-scope="data">
                                <v-chip :selected="data.selected" close class="chip--select-multi" @input="data.parent.selectItem(data.item)">

                                    {{ data.item}}
                                </v-chip>
                            </template>
                            <template slot="item" slot-scope="data">
                                <template v-if="typeof data.item !== 'object'">
                                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                                </template>
                                <template v-else>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                    </v-list-tile-content>
                                </template>
                            </template>
                        </v-autocomplete>
                    </v-card-text>

                </v-card>
                <!-- // Hier endet das Einfügen -->
                <v-card>
                    <v-btn @click="text">Zeig herr</v-btn>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      name: this.$route.params.title,
      filter: '',
      users: [],
      member: [],
      oldMembers: [],
      names: [],
      findId: ''
    };
  },

  created() {
    this.getAllUsers();
    this.getAllMember();
    this.member = this.oldMembers;
    console.log(this.member);
  },

  methods: {
    text: function() {
      this.member.forEach(v => {
        if (this.oldMembers.findIndex(f => f === v) < 0) {
          var name = v.split(', ');
          var user = this.users.find(
            fi => fi.name == name[0] && fi.vorname == name[1]
          );
          console.log(user.id);
          this.addMember(user.id);
        }
      });
      this.oldMembers.forEach(v => {
        if (this.member.findIndex(f => f === v) < 0) {
          console.log('Mitglied gelöscht' + v);
          var name = v.split(', ');
          var user = this.users.find(
            fi => fi.name == name[0] && fi.vorname == name[1]
          );
          console.log(user.id);
          this.deleteMember(user.id);
        }
      });
    },

    addMember: function(memberId) {
      axios
        .post(
          'http://localhost:3000/api/groups_users?access_token=qNKF41zqYTTDNYi5JpLAcC9fecKU62WlGf4RgKWXek9Uy6YK15eQ5pfSNYz5DUYf',
          {
            projectId: this.id,
            memberId: memberId
          }
        )
        .then(v => {
          console.log(v);
        })
        .catch(error => console.log(error));
    },

    deleteMember: function(memberId) {
      this.findProject(memberId);
      setTimeout(() => {
        console.log(this.findId);
        axios
          .delete(
            'http://localhost:3000/api/groups_users/' +
              this.findId +
              '?access_token=qNKF41zqYTTDNYi5JpLAcC9fecKU62WlGf4RgKWXek9Uy6YK15eQ5pfSNYz5DUYf'
          )
          .then(v => {
            console.log(v);
          })
          .catch(error => console.log(error));
      }, 500);
    },

    findProject: function(memberId) {
      axios
        .get(
          'http://localhost:3000/api/groups_users?filter=' +
            '%7B%22where%22%3A%7B%22projectId%22%3A%22' +
            this.id +
            '%22%2C%22memberId%22%3A%22' +
            memberId +
            '%22%7D%7D&' +
            'access_token=qNKF41zqYTTDNYi5JpLAcC9fecKU62WlGf4RgKWXek9Uy6YK15eQ5pfSNYz5DUYf'
        )
        .then(v => {
          this.findId = v.data[0].id;
          //   console.log(v.data[0].id);
        })
        .catch(error => console.log(error));
    },

    getAllUsers: function() {
      axios
        .get(
          'http://localhost:3000/api/members?access_token=qNKF41zqYTTDNYi5JpLAcC9fecKU62WlGf4RgKWXek9Uy6YK15eQ5pfSNYz5DUYf'
        )
        .then(v => {
          this.users = v.data;
          this.users.forEach(v => {
            // this.names.push(v.name + ', ' + v.vorname);
            this.names.push(v.name + ', ' + v.vorname);
          });
        })
        .catch(error => console.log(error));
    },

    getAllMember: function() {
      this.filter =
        '%7B%22include%22%3A%5B%22member%22%5D%2C%22where%22%3A%7B%22projectId%22%3A%22' +
        this.id +
        '%22%7D%7D&';
      //   console.log(this.filter);
      var members = [];
      axios
        .get(
          'http://localhost:3000/api/groups_users?filter=' +
            this.filter +
            'access_token=qNKF41zqYTTDNYi5JpLAcC9fecKU62WlGf4RgKWXek9Uy6YK15eQ5pfSNYz5DUYf'
        )
        .then(v => {
          members = v.data;
          members.forEach(v => {
            this.oldMembers.push(v.member.name + ', ' + v.member.vorname);
          });
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>
</style>
