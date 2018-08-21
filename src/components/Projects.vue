<template>
  <v-layout row>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
         <v-toolbar color="blue darken-3" dark>
          <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

          <v-toolbar-title>Dashboard</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon to="/add">
            <v-icon>add</v-icon>
          </v-btn>
          <v-btn icon @click="add()">
            <v-icon>code</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list two-line>
          <v-subheader v-if="header" :key="header">{{ header }}</v-subheader>
            <template v-for="(project, index) in projects">
              <v-list-tile avatar ripple :key="project.id" @click="toggle(index)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ project.name }}</v-list-tile-title>
                  <keep-alive>
                  <v-list-tile-sub-title>{{ getProjectLeader(project.memberId) }} </v-list-tile-sub-title>
                  </keep-alive>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon @click="deleteProject(index)">
                    <v-icon color="red darken-1">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      header: 'Projekte',
      projects: []
    };
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    add: function() {
      axios
        .post('http://localhost:3000/api/project_groups', {
          name: 'Vue.js',
          memberId: '5b7c2d0727773120d0567caa'
        })
        .then(() => {
          this.projects = [];
          this.getProjects();
        })
        .catch(error => console.log(error));
    },

    getProjectLeader: function(id) {
      console.log(id);

      axios
        .get(
          'http://localhost:3000/api/members/5b7c2d0727773120d0567caa?access_token=qNKF41zqYTTDNYi5JpLAcC9fecKU62WlGf4RgKWXek9Uy6YK15eQ5pfSNYz5DUYf'
        )
        .then(v => {
          name = v.data.name + ', ' + v.data.vorname;
        })
        .catch(error => {
          console.log(error);
        });
      return name;
    },

    deleteProject: function(index) {
      // alert(index);
      console.log('Lösche Projekt mit der ID: ' + this.projects[index].id);
      axios
        .delete(
          'http://localhost:3000/api/project_groups/' + this.projects[index].id
        )
        .then(() => {
          this.projects = [];
          this.getProjects();
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
    }
  }
};
</script>

<style scoped>
</style>
