<template>
  <v-container fluid fill-height>
    <v-layout row>
      <v-flex xs12 sm10 md10 offset-sm1>
        <v-card>
          <v-toolbar color=primary dark>
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

            <v-toolbar-title>Projekte</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn color=secondary @click="logout">
              Logout
            </v-btn>
            <v-btn icon to="/add">
              <v-icon>add</v-icon>
            </v-btn>
            <!-- <v-btn icon @click="add()">
              <v-icon>code</v-icon>
            </v-btn> -->
          </v-toolbar>
          <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-title class="headline">Wollen Sie das Projekt wirklich löschen?</v-card-title>

              <v-card-text>
                Gelöschte Projekte können später nicht wieder hergestellt werden!!!
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" flat="flat" @click="dialog = false">
                  Nein
                </v-btn>

                <v-btn color="green darken-1" flat="flat" @click="deleteProject()">
                  Ja
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-list two-line>
            <v-subheader>Projektleiter</v-subheader>
            <template v-for="(project, index) in myProjects">
              <v-list-tile ripple :key="project.id + 'admin'">
                <v-list-tile-content @click="showStatistic(index)">
                  <v-list-tile-title>{{ project.name }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon @click="edit(index)">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action>
                  <v-btn icon @click="openDialog(index)">
                    <v-icon color="red darken-1">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
            <v-divider></v-divider>
            <v-subheader>Projektmitglied</v-subheader>
            <template v-for="(project, index) in otherProjects2" v-if="namesLoaded">
              <v-list-tile ripple :key="project.id">
                <v-list-tile-content @click="toggle(index)">
                  <v-list-tile-title>{{ project.name }}</v-list-tile-title>
                  <keep-alive>
                    <v-list-tile-sub-title>{{ names[index] }} </v-list-tile-sub-title>
                  </keep-alive>
                </v-list-tile-content>
              </v-list-tile>

            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      names: [],
      users: [],
      dialog: false,
      index: 0,
      myProjects: [{ name: '' }],
      otherProjects: [],
      otherProjects2: [],
      memberId: this.$store.state.memberId,
      namesLoaded: false
    };
  },

  created() {
    this.getMyProjects();
    this.getOtherProjects();
    this.getUsers();
    // this.getNames();
    console.log('created');
  },

  methods: {
    getNames: function() {
      this.otherProjects2 = [];
      this.names = [];
      this.otherProjects.forEach(v => {
        this.otherProjects2.push(v[0]);
      });
      this.otherProjects2.forEach((v, k) => {
        this.users.forEach(v2 => {
          if (v2.id === v.managerId) {
            this.names.push(v2.name + ', ' + v2.vorname);
          }
        });
        if (k == this.otherProjects2.length - 1) {
          this.namesLoaded = true;
        }
      });
    },

    openDialog: function(index) {
      this.dialog = true;
      this.index = index;
    },

    logout: function() {
      this.$store.dispatch('destroyToken').then(response => {
        this.$router.push({ name: 'login' });
      });
    },

    showStatistic: function(index) {
      // this.$router.push('/statistic/' + this.myProjects[index].id);
      this.$router.push({
        name: 'statistic',
        params: {
          id: this.myProjects[index].id,
          title: this.myProjects[index].name
        }
      });
    },

    deleteProject: function() {
      console.log(
        'Lösche Projekt mit der ID: ' + this.myProjects[this.index].id
      );
      axios
        .delete(
          '/project_groups/' + this.myProjects[this.index].id + '/feedbackForm'
        )
        .then(() => {
          console.log('FeedbackForm gelöscht');
        })
        .catch(error => console.log(error));

      axios
        .delete('/project_groups/' + this.myProjects[this.index].id)
        .then(() => {
          this.myProjects = [];
          this.getMyProjects();
          this.dialog = false;
        })
        .catch(error => console.log(error));
    },

    getMyProjects: function() {
      axios
        .get(
          '/project_groups?filter=%7B%22where%22%3A%7B%22managerId%22%3A%22' +
            this.memberId +
            '%22%7D%7D'
        )
        .then(v => {
          this.myProjects = v.data;
          console.log(v.data);
        })
        .catch(error => console.log(error));
    },

    getOtherProjects: function() {
      axios.defaults.headers.common['Authorization'] = this.$store.state.token;
      var otherProjects = [];
      this.otherProjects = [];
      axios
        .get(
          '/groups_users?filter=%7B%22where%22%3A%7B%22memberId%22%3A%22' +
            this.memberId +
            '%22%7D%7D'
        )
        .then(v => {
          otherProjects = v.data;
          otherProjects.forEach(v => {
            axios
              .get(
                '/project_groups?filter=%7B%22where%22%3A%7B%22id%22%3A%22' +
                  v.projectId +
                  '%22%7D%7D'
              )
              .then(v => {
                this.otherProjects.push(v.data);
                this.getNames();
              })
              .catch(error => console.log(error));
          });
        })
        .catch(error => console.log(error));
    },

    getUsers: function() {
      axios.defaults.headers.common['Authorization'] = this.$store.state.token;
      axios
        .get('/members')
        .then(v => {
          this.users = v.data;
        })
        .catch(error => console.log(error));
    },

    toggle: function(index) {
      // console.log(this.otherProjects2[index]);
      this.$router.push('/addFeedback/' + this.otherProjects2[index].id);
    },

    edit: function(index) {
      // this.$router.push('/edit/' + this.myProjects[index].id);
      this.$router.push({
        name: 'edit',
        params: {
          id: this.myProjects[index].id,
          title: this.myProjects[index].name
        }
      });
    }
  }
};
</script>

<style scoped>
.v-subheader {
  font-size: 18px;
  color: rgba(0, 150, 136, 0.53);
}
</style>
