import { format, isToday, isYesterday, isPast, isFuture } from 'date-fns';

function searchData(data, searchValue, searchProperties) {
    return !searchValue ? data : data?.filter((dato) => {
        return searchProperties?.some(propiedad => {
            const propiedades = propiedad.split('.');
            let valor = dato;
            for (let i = 0; i < propiedades.length; i++)
                valor = valor?.[propiedades[i]];
            return valor?.toLowerCase().includes(searchValue.toLowerCase());
        });
    });
};

function evaluateDate(date) {
    const now = new Date();

    if (isToday(date)) {
        return 'TODAY';
    } else if (isYesterday(date)) {
        return 'YESTERDAY';
    } else if (isPast(date) && !isToday(date)) {
        return 'EXPIRED';
    } else if (isFuture(date)) {
        return format(date, 'dd MMMM, yyyy').toUpperCase();
    }
}

const POINTS_MAP = {
    "ZERO": 0,
    "ONE": 1,
    "TWO": 2,
    "FOUR": 4,
    "EIGHT": 8
};

export { evaluateDate, searchData, POINTS_MAP };
