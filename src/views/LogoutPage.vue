<script>

import {endSession} from "@/config/session";

export default {
  name: 'LogoutPage',
  mounted() {
    endSession()
  }
}

</script>

<template>
  <h1>JESJE LI SIGURAN ?</h1>
</template>

<style scoped>

</style>