$(document).ready(function(){

  function addFormGroup(formGroup){
    console.log(this);
  };

  // $('.btn-add').on('click', function() {
  //   multiAdder.insertAdjacentHTML('beforeend', $('#multiAdder .multi-adder-template').html());
  // });
})

function addMultiAdderOption(objectToAdd){
  var item = $(objectToAdd).parent().closest('div').find('.l-multi-adder-group');
  console.log(item);
  item[0].insertAdjacentHTML('beforeend', $(item).find('.l-multi-adder-template').html());
};

function removeMultiAdderOption(objectToRemove){
  var item = $(objectToRemove).parent().closest('div');
  item.remove();
};
