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
              <li v-for="catName in BASIC_DATA.blogCatNames" :key="catName[0]">
                <label :for="catName[0]"
                  ><input
                    type="checkbox"
                    :id="catName[0]"
                    name="catNames"
                    @change="setFilters"
                  />
                  <span class="checkmark"></span>
                  {{ catName[1] }}
                </label>
              </li>
            </ul>
          </li>

          <hr />
          <li>
            <h4 class="filter-title">ترتیب</h4>
            <ul class="nested-list">
              <li v-for="(sort, index) in BASIC_DATA.sorts" :key="sort[0]">
                <label :for="sort[0]"
                  ><input
                    type="radio"
                    :id="sort[0]"
                    name="sorts"
                    :checked="index === 0"
                    @change="setSortFilters"
                  />
                  <span class="radio"></span>
                  {{ sort[1] }}
                </label>
              </li>
              <li v-for="sortBy in BASIC_DATA.sortsBy" :key="sortBy[0]">
                <label :for="sortBy[0]"
                  ><input
                    type="radio"
                    :id="sortBy[0]"
                    name="sorts"
                    @change="setSortByFilters"
                  />
                  <span class="radio"></span>
                  {{ sortBy[1] }}
                </label>
              </li>
              <li
                v-for="sortByCount in BASIC_DATA.sortsByCount"
                :key="sortByCount[0]"
              >
                <label :for="sortByCount[0]"
                  ><input
                    type="radio"
                    :id="sortByCount[0]"
                    name="sorts"
                    @change="setSortByCountFilters"
                  />
                  <span class="radio"></span>
                  {{ sortByCount[1] }}
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
import { reactive } from "vue";
export default {
  inject: {
    BASIC_DATA: {
      type: JSON,
      required: true,
    },
  },
  name: "BlogsSidebar",
  setup(_, context) {
    const filters = reactive({
      catNames: {
        val: [],
      },
      orderBy: {
        val: "desc",
      },
      orderByColumn: {
        val: null,
      },
      orderByRelation: {
        val: null,
      },
    });
    // any filters except sort filter
    function setFilters(event) {
      const isChecked = event.target.checked;
      const filterValue = event.target.id;
      if (isChecked) {
        filters["catNames"].val.push(filterValue);
      } else {
        const newFilters = filters["catNames"].val.slice();
        const filterIndex = newFilters.findIndex((val) => val === filterValue);
        newFilters.splice(filterIndex, 1);
        filters["catNames"].val = newFilters;
      }
      applyFilters();
    }
    // sort filter for desc or asc based on created_at
    function setSortFilters(event) {
      const sortValue = event.target.id;
      filters["orderBy"].val = sortValue;
      filters["orderByColumn"].val = null;
      applyFilters();
    }
    // sort filter for desc based on column
    function setSortByFilters(event) {
      const sortValue = event.target.id;
      filters["orderByColumn"].val = sortValue;
      filters["orderBy"].val = "desc";
      applyFilters();
    }
    // sort filter for desc based on relations count
    function setSortByCountFilters(event) {
      const sortValue = event.target.id;
      filters["orderBy"].val = "desc";
      filters["orderByColumn"].val = null;
      filters["orderByRelation"].val = sortValue;
      applyFilters();
    }

    function applyFilters() {
      context.emit("apply-filters", filters);
    }
    return {
      setFilters,
      setSortFilters,
      setSortByFilters,
      setSortByCountFilters,
    };
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
