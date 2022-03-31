export default{
    props: ['tempProduct', 'isNew'],
    // template: `#templateForProductModal`,
    methods:{
        //建立新增產品方法
        //從addProducts改名為updateProduct讓他可以新增和編輯產品
        updateProduct(){
            //以新增方法當作預設
            //如果data.isNew裡面的布林值是ture時
            let url = `${site}api/${api_path}/admin/product`;  //新增功能的API
            let method = 'post';                                                      //新增功能的遠端傳送方法

            //如果data.isNew裡面的布林值不是ture時(編輯)
            if (!this.isNew){
                url = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;   //編輯功能的API
                method = 'put';                                                        //編輯功能的遠端傳送方法
    
            }
            //使用中括號帶變數來切換
            axios[method](url, {data: this.tempProduct})
                .then(res => {
                    this.$emit('get-products');
                    productModal.hide(); //2.使用完把modal關起來
                })
        },
    },
    template: `          <div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="productModalLabel" class="modal-title">
          <span>新增產品</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-2">
              <div class="mb-3">
                  <!-- label的for要對應input的id -->
                <label for="imageUrl" class="form-label">主圖網址</label>
                <!-- 使用v-model綁定 -->
                <input type="text" class="form-control"
                       placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
              </div>
                  <!-- 用v-bind綁定讓圖片顯示出來 -->
              <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
            </div>
            <div class="mb-3">
              <h3>多圖設置</h3>
              <!-- 用if判斷tempProduct.imagesUrl是不是陣列，如果有才跑這段 -->
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                  <!-- 如果是陣列就用v-for把資料一筆筆帶入 -->
                  <template v-for="(img, key) in tempProduct.imagesUrl" :key="key + '5487'">
                      <!-- 下面格式跟主圖網址的顯示方式一樣 -->
                      <input type="text" class="form-control"
                       placeholder="請輸入圖片連結" v-model="tempProduct.imagesUrl[key]">
                       <img class="img-fluid" :src="tempProduct.imagesUrl[key]" alt="">
                  </template>
              </div>
            </div>
            <!-- 按鈕的新增和刪除並綁定v-on:click -->
            <div>
                <!--  第一個是判斷陣列裡面有沒有內容 使用或者||串連  第二個是判斷陣列特定索引位置有沒有輸入文字 -->
              <button v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]" type="button" class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProduct.imagesUrl.push('')">
                新增圖片
              </button>
              <button v-else type="button" class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.pop()">
                  刪除圖片
              </button>
            </div>
            <div>
              <!-- 使用.pop刪除最後一個陣列內容 -->
              <!-- 原本的位置<button v-else type="button" class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.pop()">
                  刪除圖片
              </button> --> 
            </div>
          </div>
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input id="title" v-model="tempProduct.title" type="text" class="form-control" placeholder="請輸入標題">
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="category" class="form-label">分類</label>
                <input id="category" v-model="tempProduct.category" type="text" class="form-control"
                       placeholder="請輸入分類">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">單位</label>
                <input id="unit" v-model="tempProduct.unit" type="text" class="form-control" placeholder="請輸入單位">
              </div>
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">原價</label>
                <!-- 純數值要記得用.number -->
                <input id="origin_price" v-model.number="tempProduct.origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">售價</label>
                <!-- 純數值要記得用.number -->
                <input id="price" v-model.number="tempProduct.price" type="number" min="0" class="form-control"
                       placeholder="請輸入售價">
              </div>
            </div>
            <hr>

            <div class="mb-3">
              <label for="description" class="form-label">產品描述</label>
              <textarea id="description" v-model="tempProduct.description" type="text" class="form-control"
                        placeholder="請輸入產品描述">
              </textarea>
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">說明內容</label>
              <textarea id="description" v-model="tempProduct.content" type="text" class="form-control"
                        placeholder="請輸入說明內容">
              </textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                  <!-- 使用true-value和false-value做切換 -->
                <input id="is_enabled" v-model="tempProduct.is_enabled" class="form-check-input" type="checkbox"
                       :true-value="1" :false-value="0">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <!-- 綁定addProducts方法 -->
        <button type="button" class="btn btn-primary" @click="updateProduct">
          確認
        </button>
      </div>
    </div>
  </div>`
}



