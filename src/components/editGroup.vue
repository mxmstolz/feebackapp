<template>
  <v-container fluid fill-height>
    <v-layout row>
      <v-flex xs12 sm10 md10 offset-sm1>
        <v-card>
          <v-toolbar color=primary dark>
            <v-toolbar-title>Projekt {{ name }} bearbeiten</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon to="/">
              <v-icon>close</v-icon>
            </v-btn>

          </v-toolbar>
        </v-card>
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
        <v-card>
          <v-btn color=secondary @click="save">Speichern</v-btn>
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
      memberId: this.$store.state.memberId,
      filter: '',
      users: [],
      member: [],
      oldMembers: [],
      names: [],
      findId: ''
    };
  },

  created() {
    this.getAllUsers(); //get every User to select non-member User
    this.getAllMember(); //get every member of the project
    this.member = this.oldMembers;
    console.log(this.member);
  },

  methods: {
    // function to find new added or deleted users
    save: function() {
      if (this.member == this.oldMembers) {
        console.log('noch immer das selbe');
      } else {
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
      }
    },

    // add a member to the project
    addMember: function(memberId) {
      axios.defaults.headers.common['Authorization'] = this.$store.state.token;
      axios
        .post('/groups_users', {
          projectId: this.id,
          memberId: memberId
        })
        .then(v => {
          console.log(v);
        })
        .catch(error => console.log(error));
    },

    // delete a member to the project
    deleteMember: function(memberId) {
      axios.defaults.headers.common['Authorization'] = this.$store.state.token;
      this.findProject(memberId);
      setTimeout(() => {
        console.log(this.findId);
        axios
          .delete('/groups_users/' + this.findId)
          .then(v => {
            console.log(v);
          })
          .catch(error => console.log(error));
      }, 500);
    },

    // find id of a project
    findProject: function(memberId) {
      axios.defaults.headers.common['Authorization'] = this.$store.state.token;
      axios
        .get(
          '/groups_users?filter=' +
            '%7B%22where%22%3A%7B%22projectId%22%3A%22' +
            this.id +
            '%22%2C%22memberId%22%3A%22' +
            memberId +
            '%22%7D%7D'
        )
        .then(v => {
          this.findId = v.data[0].id;
        })
        .catch(error => console.log(error));
    },

    // get all Users aviable
    getAllUsers: function() {
      axios.defaults.headers.common['Authorization'] = this.$store.state.token;
      axios
        .get('/members')
        .then(v => {
          this.users = v.data;
          this.users.forEach(v => {
            if (v.id != this.memberId) {
              //don't add the own name to the lost
              this.names.push(v.name + ', ' + v.vorname);
            }
          });
        })
        .catch(error => console.log(error));
    },

    // get all members of a project
    getAllMember: function() {
      axios.defaults.headers.common['Authorization'] = this.$store.state.token;
      this.filter =
        '%7B%22include%22%3A%5B%22member%22%5D%2C%22where%22%3A%7B%22projectId%22%3A%22' +
        this.id +
        '%22%7D%7D';
      var members = [];
      axios
        .get('/groups_users?filter=' + this.filter)
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
