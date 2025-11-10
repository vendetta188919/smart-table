export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        // @todo: #4.1 — заполнить выпадающие списки опциями
        Object.keys(indexes).forEach((elementName) => {
            // Очищаем существующие опции (кроме первой пустой)
            while (elements[elementName].children.length > 1) {
                elements[elementName].lastChild.remove();
            }
            
            // Добавляем новые опции
            elements[elementName].append(
                ...Object.values(indexes[elementName]).map(name => {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;
                    return option;
                })
            );
        });
    }

    const applyFiltering = (query, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            
            let inputElement = null;
            Object.keys(elements).forEach(key => {
                if (elements[key] && elements[key].name === field) {
                    inputElement = elements[key];
                }
            });
            
            if (inputElement) {
                inputElement.value = '';
                
                if (field in state) {
                    state[field] = '';
                }
            }
        }

        // @todo: #4.5 — формируем параметры фильтрации для сервера
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                    // формируем в query вложенный объект фильтра
                    filter[`filter[${elements[key].name}]`] = elements[key].value;
                }
            }
        });

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    }

    return {
        updateIndexes,
        applyFiltering
    };
}