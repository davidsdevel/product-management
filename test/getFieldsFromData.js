module.exports = function getFieldsFromData(data) {
  const fieldsArrays = {}

  data.forEach(e => {
    const names = Object.keys(e);

    names.forEach(field => {
      const fieldArray = fieldsArrays[field];
        
      if (fieldArray) {
        fieldArray.push(e[field]);
      } else {
        fieldsArrays[field] = [e[field]];
      }
    });
  });

  return fieldsArrays;
}