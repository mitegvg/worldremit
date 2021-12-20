export const expandUser = (id, expanded, setExpanded) => {
  const expandedNew = {...expanded};
  expandedNew[id] = !expanded[id];
  setExpanded(expandedNew);
};
