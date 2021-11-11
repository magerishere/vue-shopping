<template>
  <aside class="col-md-3">
    <base-card>
      <h4>اطلاعات جانبی</h4>
      <hr />
      <h5>
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> {{ user.name }}
      </h5>
      <h6><i class="fa fa-eye" aria-hidden="true"></i> {{ views }}</h6>
      <h6>
        <i class="fa fa-comments-o" aria-hidden="true"></i> {{ commentsCount }}
      </h6>
      <h6>
        <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> {{ likesCount }}
      </h6>
      <h6>
        <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
        {{ dislikesCount }}
      </h6>
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
    views: {
      type: Number,
      required: true,
    },
    commentsCount: {
      type: Number,
      required: true,
    },
    likesCount: {
      type: Number,
      required: true,
    },
    dislikesCount: {
      type: Number,
      required: true,
    },
  },
};
</script>
