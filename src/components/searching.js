export function initSearching(searchField) {
    return (query, state, action) => {
        // @todo: #5.2 — формируем параметр поиска для сервера
        return state[searchField] ? Object.assign({}, query, {
            search: state[searchField] // устанавливаем в query параметр
        }) : query; // если поле с поиском пустое, просто возвращаем query без изменений
    }
}