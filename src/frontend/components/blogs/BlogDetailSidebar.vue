<template>
  <aside class="col-md-3">
    <base-card>
      <h4>اطلاعات جانبی</h4>
      <hr />
      <h5>
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> {{ user.name }}
      </h5>
      <h6><i class="fa fa-eye" aria-hidden="true"></i> 35</h6>
      <h6><i class="fa fa-comments-o" aria-hidden="true"></i> 45</h6>
      <h6><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> 30</h6>
      <h6><i class="fa fa-thumbs-o-down" aria-hidden="true"></i> 12</h6>
    </base-card>
  </aside>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
