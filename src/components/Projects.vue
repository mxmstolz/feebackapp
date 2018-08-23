<template>
  <v-container fluid fill-height>
    <v-layout row>
      <v-flex xs12 sm10 md10 offset-sm1>
        <v-card>
          <v-toolbar color="blue darken-3" dark>
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

            <v-toolbar-title>Dashboard</v-toolbar-title>

            <v-spacer></v-spacer>

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
            <v-subheader v-if="header" :key="header">{{ header }}</v-subheader>
            <template v-for="(project, index) in projects">
              <v-list-tile ripple :key="project.id + 'admin'" v-show="memberId === project.memberId">
                <v-list-tile-content @click="toggle(index)">
                  <v-list-tile-title>{{ project.name }}</v-list-tile-title>
                  <keep-alive>
                    <v-list-tile-sub-title>{{ names[index] }} </v-list-tile-sub-title>
                  </keep-alive>
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
              <v-list-tile ripple :key="project.id" v-show="memberId != project.memberId">
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
      header: 'Projekte',
      index: 0,
      projects: [{ name: '' }],
      memberId: '5b7c2d0727773120d0567caa'
    };
  },
  mounted() {
    setTimeout(() => {
      this.projects.forEach(v => {
        this.users.forEach(v2 => {
          if (v2.id === v.memberId) {
            this.names.push(v2.name + ', ' + v2.vorname);
          }
        });
      });
    }, 500);
  },

  created() {
    this.getProjects();
    axios
      .get(
        'http://localhost:3000/api/members?access_token=qNKF41zqYTTDNYi5JpLAcC9fecKU62WlGf4RgKWXek9Uy6YK15eQ5pfSNYz5DUYf'
      )
      .then(v => {
        this.users = v.data;
      })
      .catch(error => console.log(error));
  },
  methods: {
    openDialog: function(index) {
      this.dialog = true;
      this.index = index;
    },

    deleteProject: function() {
      console.log('Lösche Projekt mit der ID: ' + this.projects[this.index].id);
      axios
        .delete(
          'http://localhost:3000/api/project_groups/' +
            this.projects[this.index].id +
            '/feedbackForm'
        )
        .then(() => {
          console.log('FeedbackForm gelöscht');
        })
        .catch(error => console.log(error));

      axios
        .delete(
          'http://localhost:3000/api/project_groups/' +
            this.projects[this.index].id
        )
        .then(() => {
          this.projects = [];
          this.getProjects();
          this.dialog = false;
        })
        .catch(error => console.log(error));
    },

    getProjects: function() {
      axios.get('http://localhost:3000/api/project_groups').then(v => {
        this.projects = v.data;
      });
    },

    toggle: function(index) {
      console.log(this.projects[index]);
      this.$router.push('/addFeedback/' + this.projects[index].id);
    },

    edit: function(index) {
      // this.$router.push('/edit/' + this.projects[index].id);
      this.$router.push({
        name: 'edit',
        params: {
          id: this.projects[index].id,
          title: this.projects[index].name
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
