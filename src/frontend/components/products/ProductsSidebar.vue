<template>
  <aside class="col-md-3">
    <base-card>
      <nav>
        <h4>فیلتر بر اساس</h4>
        <ul class="mainer-list">
          <hr />

          <li>
            <h5 class="filter-title">قیمت</h5>

            <ul class="nested-list">
              <li>
                <label for="max"
                  ><input type="checkbox" id="max" />
                  <span class="checkmark"></span>
                  بیشترین
                </label>
              </li>
              <li>
                <label for="min"
                  ><input type="checkbox" id="min" />
                  <span class="checkmark"></span>کمترین
                </label>
              </li>
            </ul>
          </li>

          <hr />
          <li>
            <h4 class="filter-title">ترتییب</h4>
            <ul class="nested-list">
              <li>
                <label for="new"
                  ><input type="checkbox" id="new" />
                  <span class="checkmark"></span>
                  جدیدترین
                </label>
              </li>
              <li>
                <label for="old"
                  ><input type="checkbox" id="old" />
                  <span class="checkmark"></span>قدیمی ترین
                </label>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </base-card>
  </aside>
</template>

<script>
export default {
  name: "ProductsSidebar",
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
</style>
