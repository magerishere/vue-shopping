<template>
  <base-card mode="flat">
    <ul>
      <li>
        <div class="d-flex">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Books_HD_%288314929977%29.jpg/640px-Books_HD_%288314929977%29.jpg"
            alt=""
          />

          <h6 class="w-100">
            عنوان
            <base-button mode="danger small" class="float-end"
              ><i class="fa fa-trash-o" aria-hidden="true"></i
            ></base-button>
            <p class="mt-5">
              something for this productsomething for this productsomething for
              this productsomething for this product
            </p>
          </h6>
        </div>

        <div class="">
          <base-button>مشاهده محصول</base-button>
          <div class="actions">
            <span> 3000 <small>تومان</small></span>
            <base-button mode="small">
              <i class="fa fa-plus" aria-hidden="true"></i
            ></base-button>
            <input type="text" id="qty" value="12" />
            <base-button mode="small danger-outline">
              <i class="fa fa-minus" aria-hidden="true"></i
            ></base-button>
          </div>
        </div>
      </li>
    </ul>
  </base-card>
</template>

<style scoped>
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-left: 1rem;
}
.actions {
  float: left;
}
.actions > * {
  margin: 0 0.2rem;
}

#qty {
  max-width: 40px;
  text-align: center;
}
</style>
