/* eslint-disable no-param-reassign */
class GIHelper {
  /**
   * Function to sort alphabetically an array of objects by some specific key.
   *
   * @param {String} property Key of the object to sort.
   */
  static dynamicSort(property) {
    let sortOrder = 1;

    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }

    if (sortOrder === -1) {
      return function (a, b) {
        if (a[property] > b[property]) {
          return a[property].localeCompare(b[property]);
        }
        if (a[property] < b[property]) {
          return b[property].localeCompare(a[property]);
        }
        return 0;
      };
    }
    return function (a, b) {
      if (a[property] < b[property]) {
        return a[property].localeCompare(b[property]);
      }
      if (a[property] > b[property]) {
        return b[property].localeCompare(a[property]);
      }
      return 0;
    };
  }
}

module.exports = GIHelper;
