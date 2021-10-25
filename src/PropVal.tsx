import { truncateUrl, JSONValue } from "@tomic/lib";
import { useProperty } from "@tomic/react";
import React from "react";
import ValueComp from "./ValueComp";

type Props = {
  propertyURL: string;
  value: JSONValue;
};

/** A single Property / Value renderer that shows a label on the left, and the value on the right. The value is editable. */
function PropVal({ propertyURL, value }: Props) {
  // This hook converts a property URL into a full Property object with title, description and more.
  const property = useProperty(propertyURL);

  if (property == null) {
    return null;
  }

  const truncated = truncateUrl(propertyURL, 10, true);

  return (
    <div>
      <h3 title={property.description}>
        {property.error ? (
          <span>{truncated}</span>
        ) : (
          property.shortname || truncated
        )}
        :
      </h3>
      <ValueComp value={value} datatype={property.datatype} />
    </div>
  );
}

export default PropVal;
