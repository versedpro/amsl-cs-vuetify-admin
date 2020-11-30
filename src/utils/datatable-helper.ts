import _ from "lodash";

import { defineComponent, ref, onActivated } from "@vue/composition-api";

export default defineComponent({
  name: "DatatableHelper",

  setup() {
    const defaultFooterProps = {
      showCurrentPage: true,
      showFirstLastPage: true,
      itemsPerPageOptions: [10, 25, 50, 100],
      itemsPerPageText: "每頁顯示"
    };

    function forceFileDownload(response, fileName: string) {
      var blob = new Blob([response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", fileName); //or any other extension
      document.body.appendChild(link);
      link.click();
    }

    function sortParams(options: any) {
      return _.zipWith(options.sortBy, options.sortDesc, function (by, isDesc) {
        return isDesc ? by + "|desc" : by;
      }).join(",");
    }

    function setSortOptions(options: any, sortBy: any, sortDesc: any) {
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

    return {
      defaultFooterProps,
      forceFileDownload,
      sortParams,
      setSortOptions
    };
  }
});
