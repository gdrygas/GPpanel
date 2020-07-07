<template>
  <div id="login">
    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
    <section>
      <div class="col1">
        <h1>Panel Głospowiatu24.pl </h1>
        <p>Witamy w <a href="https://glospowiatu24.pl/" target="_blank">GłosPowiatu24.pl</a> Aby uzysakć dostęp do panelu klienta lub narzędzi administracyjnych skontaktuj się z administartorem serwisu</p>
      </div>
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Witamy</h1>
          <div>
            <label for="email1">Email</label>
            <input v-model.trim="loginForm.email" type="text" placeholder="twój@email.com" id="email1" />
          </div>
          <div>
            <label for="password1">Hasło</label>
            <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
          </div>
          <button @click="login()" class="button">Zaloguj się</button>
          <div class="extras">
            <a @click="togglePasswordReset()">Reset hasła</a>
            <a @click="toggleForm()">Nowe konto</a>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h1>Nowe Konto</h1>
          <div>
            <label for="name">Imię i Nazwisko</label>
            <input v-model.trim="signupForm.name" type="text" placeholder="Imię i Nazwisko" id="name" />
          </div>
          <div>
            <label for="title">Rola</label>
            <input v-model.trim="signupForm.title" type="text" placeholder="Rola" id="title" />
          </div>
          <div>
            <label for="email2">Email</label>
            <input v-model.trim="signupForm.email" type="text" placeholder="twój@email.com" id="email2" />
          </div>
          <div>
            <label for="password2">Hasło</label>
            <input v-model.trim="signupForm.password" type="password" placeholder="min 6 znaków" id="password2" />
          </div>
          <button @click="signup()" class="button">Załóż konto</button>
          <div class="extras">
            <a @click="toggleForm()">Powrót do logowania</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import PasswordReset from '@/components/PasswordReset'

export default {
  components: {
    PasswordReset
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
      showPasswordReset: false
    }
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title
      })
    }
  }
}
</script>
