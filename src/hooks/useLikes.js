import { ref, onMounted, computed } from "vue";
import useForm from "@/hooks/form/useForm";

// likes
function likesAndDislikes(props, data, likeDispatch, dislikeDispatch) {
  const userId = localStorage.getItem("userId");
  const form = useForm();
  const likesCount = ref(props.likes.length);
  const isLike = ref(null);
  onMounted(() => {
    isLike.value = props.likes.findIndex((like) => like.user_id == userId) >= 0;
  });

  const like = () => {
    form.submit(likeDispatch, data, { withLoading: false });
    if (isLike.value) {
      likesCount.value--;
    } else {
      likesCount.value++;
      if (isDislike.value) {
        isDislike.value = false;
        dislikesCount.value--;
      }
    }
    isLike.value = !isLike.value;
  };
  const likeIconClass = computed(() => {
    return isLike.value ? "fa fa-thumbs-up" : "fa fa-thumbs-o-up";
  });

  // dislikes
  const dislikesCount = ref(props.dislikes.length);
  const isDislike = ref(null);
  onMounted(() => {
    isDislike.value =
      props.dislikes.findIndex((like) => like.user_id == userId) >= 0;
  });
  const dislike = () => {
    form.submit(dislikeDispatch, data, { withLoading: false });
    if (isDislike.value) {
      dislikesCount.value--;
    } else {
      dislikesCount.value++;
      if (isLike.value) {
        isLike.value = false;
        likesCount.value--;
      }
    }
    isDislike.value = !isDislike.value;
  };

  const dislikeIconClass = computed(() => {
    return isDislike.value ? "fa fa-thumbs-down" : "fa fa-thumbs-o-down";
  });
  return {
    likesCount,
    isLike,
    like,
    likeIconClass,
    dislikesCount,
    isDislike,
    dislike,
    dislikeIconClass,
    form,
  };
}

export default likesAndDislikes;
