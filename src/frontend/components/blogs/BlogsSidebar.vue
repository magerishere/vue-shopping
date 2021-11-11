<template>
  <aside class="col-md-3">
    <base-card>
      <nav>
        <h4>فیلتر بر اساس</h4>
        <ul class="mainer-list">
          <hr />

          <li>
            <h5 class="filter-title">دسته بندی</h5>

            <ul class="nested-list">
              <li v-for="catName in BASIC_DATA.catNames" :key="catName">
                <label :for="catName"
                  ><input
                    type="checkbox"
                    :id="catName"
                    name="catName"
                    @change="setFilters"
                  />
                  <span class="checkmark"></span>
                  {{ catName }}
                </label>
              </li>
            </ul>
          </li>

          <hr />
          <li>
            <h4 class="filter-title">ترتییب</h4>
            <ul class="nested-list">
              <li>
                <label for="desc"
                  ><input
                    type="radio"
                    id="desc"
                    name="radio"
                    checked
                    @change="setOrder"
                  />
                  <span class="radio"></span>
                  جدیدترین
                </label>
              </li>
              <li>
                <label for="asc"
                  ><input
                    type="radio"
                    id="asc"
                    name="radio"
                    @change="setOrder"
                  />
                  <span class="radio"></span>قدیمی ترین
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
import { ref } from "vue";
export default {
  inject: {
    BASIC_DATA: {
      type: JSON,
      required: true,
    },
  },
  name: "BlogsSidebar",
  setup(_, context) {
    const filters = ref([]);
    function setFilters(event) {
      const isChecked = event.target.checked;

      const filterValue = event.target.id;
      if (isChecked) {
        filters.value["catName"] = filterValue;
        // filters.value.push({[filterKey]:filterValue});
      } else {
        const arrFilters = filters.value.slice();
        const filterIndex = arrFilters.findIndex(
          (filter) => filter === filterValue
        );
        arrFilters.splice(filterIndex, 1);
        filters.value = arrFilters;
      }
      console.log(filters.value);

      // context.emit('set-filters',filters.value)
    }
    function setOrder(event) {
      const orderByValue = event.target.id;
      filters.value["orderBy"] = orderByValue;
      console.log(filters.value);
      context.emit("set-order", orderByValue);
    }
    return { setFilters, setOrder };
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

/* radio */
.nested-list li label input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio {
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 4px;
  right: 0;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
}

.radio:after {
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

.nested-list li label input[type="radio"]:checked ~ .radio:after {
  display: block;
}

.filter-title {
  margin: 0;
}
</style>
