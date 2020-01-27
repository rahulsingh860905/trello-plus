export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const reorderList = (list, sourceIndex, destinationIndex) => {
  let keys = [];
  let values = [];
  for (const key of list) {
    keys.push(key[0]);
    values.push(key[1]);
  }

  let obj = values.splice(sourceIndex, 1);
  values.splice(destinationIndex, 0, obj[0]);

  let reorderedList = {};
  let count = 0;
  for (const key of keys) {
    if (key.substring(key.length - 1, key.length) === "!") {
      const mkey = key.substring(0, key.length - 1);
      reorderedList[mkey] = values[count++];
    } else {
      const mkey = key + "!";
      reorderedList[mkey] = values[count++];
    }
  }

  return Object.entries(reorderedList);
};

export const reorderLists = (
  sourceList,
  destinationList,
  sourceIndex,
  destinationIndex
) => {
  const reorderedLists = [];

  let sourceKeys = [];
  let sourceValues = [];
  for (const key of sourceList) {
    sourceKeys.push(key[0]);
    sourceValues.push(key[1]);
  }

  let objValue = sourceValues.splice(sourceIndex, 1)[0];
  let objKey = sourceKeys.splice(sourceIndex, 1)[0];

  let reorderedSourceList = {};
  let count = 0;
  for (const key of sourceKeys) {
    if (key.substring(key.length - 1, key.length) === "!") {
      const mkey = key.substring(0, key.length - 1);
      reorderedSourceList[mkey] = sourceValues[count++];
    } else {
      const mkey = key + "!";
      reorderedSourceList[mkey] = sourceValues[count++];
    }
  }
  reorderedLists.push(Object.entries(reorderedSourceList));

  destinationList.push([objKey, objValue]);
  destinationList.sort(function(a, b) {
    var keyA = a[0];
    var keyB = b[0];
    if (keyA < keyB) {
      return -1;
    }
    if (keyB > keyA) {
      return 1;
    }
    return 0;
  });

  let destKeys = [];
  let destValues = [];
  for (const key of destinationList) {
    destKeys.push(key[0]);
    destValues.push(key[1]);
  }

  let placedIndex = 0;
  for (const key of destKeys) {
    if (key === objKey) {
      break;
    } else {
      placedIndex++;
    }
  }
  if (placedIndex === destinationIndex) {
    reorderedLists.push(destinationList);
  } else {
    let obj = destValues.splice(placedIndex, 1);
    destValues.splice(destinationIndex, 0, obj[0]);
    let reorderedList = {};
    let count = 0;
    for (const key of destKeys) {
      if (key.substring(key.length - 1, key.length) === "!") {
        const mkey = key.substring(0, key.length - 1);
        reorderedList[mkey] = destValues[count++];
      } else {
        const mkey = key + "!";
        reorderedList[mkey] = destValues[count++];
      }
    }
    reorderedLists.push(Object.entries(reorderedList));
  }

  return reorderedLists;
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  return isValid;
};
