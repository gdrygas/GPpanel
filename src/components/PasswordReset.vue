<template>
  <div class="modal">
    <div class="modal-content">
      <div @click="$emit('close')" class="close">X</div>
      <h3>Odzyskiwanie hasła</h3>
      <div v-if="!showSuccess">
        <p>Wprowadź swój email</p>
        <form @submit.prevent>
          <input v-model.trim="email" type="email" placeholder="twój@email.com" />
        </form>
        <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
        <button @click="resetPassword()" class="button">Reset</button>
      </div>
      <p v-else>Sprawdź swój email aby zresetować hasło</p>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase'

export default {
  data() {
    return {
      email: '',
      showSuccess: false,
      errorMsg: ''
    }
  },
  methods: {
    async resetPassword() {
      this.errorMsg = ''

      try {
        await auth.sendPasswordResetEmail(this.email)
        this.showSuccess = true
      } catch (err) {
        this.errorMsg = err.message
      }
    }
  }
}
</script>
