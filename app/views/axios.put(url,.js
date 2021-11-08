axios.put(url,
    {
            category_id: this.state.category_id,
            name: this.state.name,//required
            description: this.state.description,
            image: this.state.prod_image,
            on_webshop: this.state.add_weshop, //Boolean 
        
  },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    }
  
  )
  .then(function (response) {

  console.log('axiso response',response);
    
  if (response.status === 'success') {
   console.log('GGGGGGGGGGG',response.data)
  
  } 
  
  })
  .catch(function (error) {
  console.log(error);
  });
}    