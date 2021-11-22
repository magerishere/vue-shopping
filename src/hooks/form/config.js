import { reactive } from "vue";

const useConfig = () => {
  const config = reactive({
    isLoading: false,
    withLoading: true,
  });
  return config;
};

export default useConfig;
