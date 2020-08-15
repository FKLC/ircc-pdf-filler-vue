<template>
  <div>
    <div class="container">
      <nav>
        <router-link to="/" class="button" active-class="button-primary" exact>Applications</router-link>
        <router-link to="/users" class="button" active-class="button-primary" exact>Users</router-link>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
nav {
  margin-top: 20px;
}

nav * {
  margin-right: 1em;
}
</style>