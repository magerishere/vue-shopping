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
                <BaseInputCheckbox
                  :id="catName[0]"
                  name="catNames"
                  v-model="filters.catNames.val"
                  :text="catName[1]"
                />
              </li>
            </ul>
          </li>

          <hr />
          <li>
            <h4 class="filter-title">ترتیب</h4>
            <ul class="nested-list">
              <li v-for="sort in BASIC_DATA.sorts" :key="sort[0]">
                <BaseInputRadio
                  :id="sort[0]"
                  name="sorts"
                  v-model="filters.sort.val"
                  :text="sort[1]"
                />
              </li>
              <li v-for="sortBy in BASIC_DATA.sortsBy" :key="sortBy[0]">
                <BaseInputRadio
                  :id="sortBy[0]"
                  name="sorts"
                  v-model="filters.sort.val"
                  :text="sortBy[1]"
                />
              </li>

              <li
                v-for="sortByCount in BASIC_DATA.sortsByCount"
                :key="sortByCount[0]"
              >
                <BaseInputRadio
                  :id="sortByCount[0]"
                  name="sorts"
                  v-model="filters.sort.val"
                  :text="sortByCount[1]"
                />
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </base-card>
  </aside>
</template>

<script>
import { reactive, watch } from "vue";
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
      sort: { val: "desc" },
    });

    watch(filters, () => {
      console.log("changed");
      applyFilters();
    });

    function applyFilters() {
      context.emit("apply-filters", filters);
    }
    return {
      filters,
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
