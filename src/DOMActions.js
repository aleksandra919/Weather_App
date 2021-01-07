const _getDOMElem = id => document.getElementById(id);

export const mapIdListToDOMElements = (listOfId) => {
    const _viewElems = {};

    listOfId.forEach((id) => {
        _viewElems[id] = _getDOMElem(id)
    });

    return _viewElems;
}
