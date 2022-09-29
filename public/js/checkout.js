

async function deleteAddress(id) {
    try {
      const response = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      if (response.isConfirmed) {

        const respose = await axios({
          method: "delete",
          url: `/deleteAddress/${id}`
        })
        if (respose.status == 201) {
          $(`#userAddress`).load(location.href + ` #userAddress>*`, "");
          const swal = await Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

