<template>
  <nav>
    <ul>
      <li><router-link to="/auth/login">ورود</router-link></li>
      <li><router-link to="/auth/register">ثبت نام</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "AuthNav",
};
</script>

<style scoped>
nav {
  margin-bottom: 1rem;
}
ul {
  display: flex;
  justify-content: space-between;
}

li {
  width: 100%;
  text-align: center;
}

li a {
  text-decoration: none;
  display: block;
  padding: 2rem 0;
  border: 1px solid black;
  color: black;
  font-size: 1.5rem;
}

li a.router-link-active {
  border-bottom: none;
  box-shadow: 0 7px 8px rgba(0, 0, 0, 0.7) inset;
}
</style>
