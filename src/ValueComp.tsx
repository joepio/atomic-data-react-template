import {
  Datatype,
  valToResource,
  valToDate,
  valToString,
  valToArray,
  JSONValue
} from "@tomic/lib";

type Props = {
  // Atomic Data values are just JSON values,
  // but we have a bunch of helper functions
  // that you can use to convert them to native JS values, such as Dates
  value: JSONValue;
  datatype: Datatype;
};

/** Renders a value in a fitting way, depending on its DataType */
function ValueComp({ value, datatype }: Props) {
  switch (datatype) {
    case Datatype.ATOMIC_URL: {
      const resource = valToResource(value);
      if (typeof resource === "string") {
        return <a href={resource}>{resource}</a>;
      }
      return <div>{JSON.stringify(resource)}</div>;
    }

    case (Datatype.DATE, Datatype.TIMESTAMP):
      return <div>{valToDate(value).toLocaleDateString()}</div>;

    case Datatype.MARKDOWN:
      // This would be a great place to use a Markdown parser
      return <div>{valToString(value)}</div>;

    case Datatype.RESOURCEARRAY:
      let items = valToArray(value);
      // Arrays can get very long, so let's only render the first few
      let maxItems = 10;
      let tooMany = false;
      if (items.length > maxItems) {
        items = items.slice(0, maxItems);
        tooMany = true;
      }
      return (
        <div>
          {items.map((item) => (
            <a key={item} href={item}>
              {item + ", "}
            </a>
          ))}
          {tooMany && `over ${maxItems} items`}
        </div>
      );

    // We're not going to implement the others, to let's default to a JSON stringification
    default:
      return <div>{valToString(value)}</div>;
  }
}

export default ValueComp;
