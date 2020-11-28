import { zipWith } from 'lodash'
function sortParams(options) {
  return zipWith(options.sortBy, options.sortDesc, function (by, isDesc) {
    return isDesc ? by + "|desc" : by;
  }).join(",");
}

function mapOptions(options) {
  const {sortBy, sortDesc, page, itemsPerPage} = options;
  const sort = sortParams({sortBy, sortDesc});

  return {
    page,
    sort,
    per_page: itemsPerPage
  };
}

export { mapOptions }
