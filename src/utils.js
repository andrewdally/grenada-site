export function filteredItems (array, column, columns) {
  return array.filter(item =>  array.indexOf(item) % columns === column - 1 )
}
