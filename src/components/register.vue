<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Registrierung</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon to="/login">
                  <v-icon>keyboard_arrow_left</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model="name" :rules="[v => !!v || 'Name ist notwendig']" prepend-icon="person" label="Name" type="text"></v-text-field>
                  <v-text-field v-model="vorname" :rules="[v => !!v || 'Vorname ist notwendig']" prepend-icon="face" label="Vorname" type="text"></v-text-field>
                  <v-text-field v-model="email" :rules="emailRules" prepend-icon="mail" label="E-Mail" type="text"></v-text-field>
                  <v-text-field v-model="password" :rules="[v => !!v || 'Passwort ist notwendig']" prepend-icon="lock" label="Passwort" type="password"></v-text-field>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!valid" @click="submit">Registrieren</v-btn>
                <!-- <v-btn color="primary" :disabled="!valid" @click="submit">Login</v-btn> -->
              </v-card-actions>

            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    name: '',
    vorname: '',
    email: '',
    emailRules: [
      v => !!v || 'E-mail ist notwendig',
      v => /.+@.+/.test(v) || 'E-mail muss gültig sein'
    ],
    password: ''
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('register', {
            name: this.name,
            vorname: this.vorname,
            email: this.email,
            password: this.password
          })
          .then(response => {
            this.$router.push({ name: 'login' });
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
