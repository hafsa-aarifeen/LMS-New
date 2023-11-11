import React from "react";

import DynamicLabelledSelect from "../DynamicLabelledSelect";

const LabelledSelect = (props) => {
  return (
    <DynamicLabelledSelect
      {...props}
      isNextPageLoading={false}
      hasNextPage={false}
      loadMore={() => {}}
    />
  );
};

export default LabelledSelect;
