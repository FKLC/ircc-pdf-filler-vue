<template>
  <div class="container">
    <table class="u-full-width">
      <thead>
        <tr>
          <th class="u-full-width">Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(_, index) in store.users" :key="index">
          <td>{{ getUsername(index) }}</td>
          <td>
            <button @click="deleteUser(index)" class="button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import store from "@/store.js";

export default {
  name: "Users",
  data() {
    return { store };
  },
  methods: {
    getUsername(userKey) {
      var givenName = store.getCommonUserField(userKey, "GIVEN_NAME");
      var familyName = store.getCommonUserField(userKey, "FAMILY_NAME");
      if (givenName || familyName) {
        return `${familyName} ${givenName}`.trim();
      } else {
        return "Unnamed";
      }
    },
    deleteUser(index) {
      this.$delete(store.users, index);
      store.savePermanent("users");
    },
  },
};
</script>
