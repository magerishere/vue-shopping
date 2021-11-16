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
                <base-input
                  type="checkbox"
                  :id="catName[0]"
                  name="catNames"
                  @change-action="setFilters"
                  :text="catName[1]"
                ></base-input>
              </li>
            </ul>
          </li>

          <hr />
          <li>
            <h4 class="filter-title">ترتیب</h4>
            <ul class="nested-list">
              <li v-for="(sort, index) in BASIC_DATA.sorts" :key="sort[0]">
                <base-input
                  :label-for="sort[0]"
                  input-type="radio"
                  :input-id="sort[0]"
                  input-name="sorts"
                  :input-checked="index === 0"
                  @change-action="setSortFilters"
                  :label-text="sort[1]"
                ></base-input>
              </li>
              <li v-for="sortBy in BASIC_DATA.sortsBy" :key="sortBy[0]">
                <base-input
                  :label-for="sortBy[0]"
                  input-type="radio"
                  :input-id="sortBy[0]"
                  input-name="sorts"
                  @change-action="setSortByFilters"
                  :label-text="sortBy[1]"
                ></base-input>
              </li>

              <li
                v-for="sortByCount in BASIC_DATA.sortsByCount"
                :key="sortByCount[0]"
              >
                <base-input
                  :label-for="sortByCount[0]"
                  input-type="radio"
                  :input-id="sortByCount[0]"
                  input-name="sorts"
                  @change-action="setSortByCountFilters"
                  :label-text="sortByCount[1]"
                ></base-input>
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
  emits: ["apply-filters"],
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
      filters["orderByRelation"].val = null;
      applyFilters();
    }
    // sort filter for desc based on column
    function setSortByFilters(event) {
      const sortValue = event.target.id;
      filters["orderByColumn"].val = sortValue;
      filters["orderBy"].val = "desc";
      filters["orderByRelation"].val = null;
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
      console.log(filters);

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

.filter-title {
  margin: 0;
}
</style>
