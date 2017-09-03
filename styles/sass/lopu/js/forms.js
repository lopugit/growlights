$('document')
    .ready(function() {

        // function addFormGroup(formGroup){   console.log(this); };
        // $('.btn-add').on('click', function() {
        // multiAdder.insertAdjacentHTML('beforeend', $('#multiAdder
        // .multi-adder-template').html()); });
    })

function addMultiAdderOption(objectToAdd, idReplaceString) {
    var item = $(objectToAdd)
        .parent()
        .closest('div')
        .find('.l-multi-adder-group');
    formTemplate = $(item)
        .find('.l-multi-adder-template')
        .html()
    console.log(formTemplate)
    formId = uuidv4()
    console.log(idReplaceString)
    var regExp = new RegExp(idReplaceString, "g")
    formTemplate = formTemplate.replace(/data-parsley-excluded="true"/g, '')
    formTemplate = formTemplate.replace(regExp, function() { return uuidv4() })
    formTemplate = formTemplate.replace(/{ignore}/g, '')
    item[0].insertAdjacentHTML('beforeend', formTemplate);
    console.log(formTemplate)
};

function removeMultiAdderOption(objectToRemove) {
    var item = $(objectToRemove)
        .parent()
        .closest('div');
    item.remove();
};