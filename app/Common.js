export function upsert(array, item) { // (1)
    let foundindex = -1;
    for(let i=0;i<array.length;i++){
      if(array[i].key == item.key){
        foundindex = i;
        break;
      }
    }
    if (foundindex == -1){
      array.push(item)
    }
    else{
      array[foundindex].value = item.value;
    }
    return array;
  }


  export function upsertAtttributes(array, item) { 
    let foundindex = -1;
    for(let i=0;i<array.length;i++){
      if(array[i].key == item.key){
        foundindex = i;
        break;
      }
    }
    if (foundindex == -1){
      let new_value_arr = [];
      new_value_arr.push(item.value);
      array.push({
        key:item.key,
        value:new_value_arr,
        selected_attributes:[]
      })
    }
    else{
      array[foundindex].value.push(item.value);
    }
    return array;
  }
