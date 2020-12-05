import { zipWith } from "lodash";
import { DataOptions } from "vuetify";

const defaultFooterProps = {
  showCurrentPage: true,
  showFirstLastPage: true,
  itemsPerPageOptions: [5, 10, 25, 50, 100],
  itemsPerPageText: "每頁顯示"
};

function sortParams(options) {
  return zipWith(options.sortBy, options.sortDesc, function (by, isDesc) {
    return isDesc ? by + "|desc" : by;
  }).join(",");
}

function mapOptions(options) {
  const { sortBy, sortDesc, page, itemsPerPage } = options;
  const sort = sortParams({ sortBy, sortDesc });

  return {
    page,
    sort,
    per_page: itemsPerPage
  };
}

function setSortOptions(options: DataOptions, sortBy: any, sortDesc: any) {
  if (sortBy.length > 0 && options.sortBy[0] != sortBy[0]) {
    options.sortBy = sortBy;
  }
  if (sortDesc.length > 0 && options.sortDesc[0] != sortDesc[0]) {
    options.sortDesc = sortDesc;
  } else if (sortBy.length <= 0) {
    options.sortDesc = options.sortDesc ? [false] : [true];
    options.sortBy = sortBy;
    options.sortDesc = sortDesc;
  }

  //return options;
}

export { defaultFooterProps, mapOptions, sortParams, setSortOptions };
