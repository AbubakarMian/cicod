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
