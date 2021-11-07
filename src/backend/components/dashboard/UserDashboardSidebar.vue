<template>
  <aside class="col-md-3">
    <base-card>
      <nav>
        <h4>
          <base-button link mode="outline" :to="dashBoardLink"
            >داشبورد</base-button
          >
        </h4>
        <ul class="mainer-list">
          <hr />

          <li>
            <h5 class="filter-title">
              <base-button link mode="outline" :to="userBlogsLink"
                >مطالب من</base-button
              >
            </h5>
          </li>
          <li>
            <h5 class="filter-title">
              <base-button link mode="outline" :to="blogCreateLink"
                >ایجاد مطلب</base-button
              >
            </h5>
          </li>
          <hr />
        </ul>
      </nav>
    </base-card>
  </aside>
</template>

<script>
export default {
  name: "BlogsSidebar",

  computed: {
    dashBoardLink() {
      return { name: "dashboard" };
    },
    userBlogsLink() {
      return { name: "userBlogs" };
    },
    blogCreateLink() {
      return { name: "blogCreate" };
    },
  },
};
</script>

<style scoped>
nav {
  padding: 1rem;
}

.nested-list {
  border-right: 1px solid black;
}

.nested-list li {
  margin: 0.5rem 1rem;
  position: relative;
}

.nested-list li label {
  cursor: pointer;
  margin-right: 1.5rem;
  font-size: 1rem;
}

.nested-list li label input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 4px;
  right: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: -7px;
  width: 10px;
  height: 19px;
  border: solid darkviolet;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.nested-list li label input[type="checkbox"]:checked ~ .checkmark:after {
  display: block;
}

.filter-title {
  margin: 0;
}
a {
  text-decoration: none;
  color: #000;
  display: block;
  padding: 0.5rem;
}
a:hover,
a:active,
a.router-link-exact-active {
  background-color: rgba(148, 0, 211, 1);
  color: #fff;
}
</style>
