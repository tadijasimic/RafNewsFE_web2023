<script>

import {endSession} from "@/config/session";
import {myRouter} from "@/config/router";

export default {
  name: 'LogoutPage',
  mounted() {
    endSession()
    myRouter.push('/')
  }
}

</script>

<template>
  <h1>?</h1>
</template>

<style scoped>

</style>