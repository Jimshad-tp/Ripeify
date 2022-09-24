
$(document).ready(async () => {
  
  try{

    const response = await axios.get('/wishlistItemCount')
    const indexCount = response.data.indexCount ? response.data.indexCount :0
    $(".wishlist-item-count").html(indexCount)

  }catch(err){
    console.log(err);
  }
})


async function addToWishlist(id,productName){

    try {
        const response = await axios({
            method : "post",
            url : `/addtowishlist/${id}`,
            data : {
                name : productName
            }
            
        })
      console.log(response);
      if(response.status == 204){
        let indexCount =Number($(".wishlist-item-count").html())
        indexCount -= 1
        $(".wishlist-item-count").html(indexCount)
        toastr.error("Item removed from a wishlist")
        console.log("-1");
      }else if (response.status == 201){
        let indexCount = Number($(".wishlist-item-count").html())
        indexCount += 1
       
        $(".wishlist-item-count").html(indexCount)
        console.log(" +1");
  

        toastr.success("Item added to wishlist")
      console.log(success);
       
      }
   
      console.log(response);
    } catch (error) {
      window.location.replace("/login")
        console.log(error); 

        
    }
    
}

async function removeFromWishlist(id,productName){
  try{
    const response = await axios({
      method : "post",
      url : `/addtowishlist/${id}`,
      data :{
        name : productName
      }
    })
    if(response.status == 204 ){
      let indexCount =Number($(".wishlist-item-count").html())
      indexCount -= 1
      $(".wishlist-item-count").html(indexCount)
      toastr.error("Item removed from wishlist")
     
      $(`#wishlistItem-${id}`).load(location.href + ` #wishlistItem-${id}>*`, "");

    }else if (response.status == 201){
      let indexCount = Number($(".wishlist-item-count").html())
        indexCount += 1
        $(".wishlist-item-count").html(indexCount)
        console.log("plus one");
        toastr.info("good")
    }

    // {
    //   let ItemCount = Number($(".wishlist-item-count").html())
    //   ItemCount -= 1
    //   if(ItemCount != 0 ){
    //     $(".wishlist-item-count").html(ItemCount)
    //     document.getElementById(`addtowishlist-${id}`).remove()
    //     toastr.options = { "positionClass" : "toast-bottom-right"}
    //     toastr.info('Item removed from wishlist')
    //   }
      
    //   else{
    //     window.location.reload()
    //   }
    // }
  }catch(err){
    console.error(err);
  }
}

 
 function wishlist(id,productName){
  
 addToWishlist(id,productName)   
 
}