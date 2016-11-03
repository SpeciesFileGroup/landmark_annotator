function isValidCollectionId(collection, id) {
    if (!id)
        return false;

    return collection.findIndex(l => l.id === id) !== -1;
}

module.exports = isValidCollectionId;