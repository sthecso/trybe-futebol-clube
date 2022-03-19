interface IArrayObjectWithPropertyName {
  name: string;
}

const orderArrayObjectByName = (
  a: IArrayObjectWithPropertyName,
  b: IArrayObjectWithPropertyName,
) => {
  if (a.name < b.name) return -1;
  return 1;
};

export default orderArrayObjectByName;
