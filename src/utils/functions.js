import { format, isToday, isYesterday, isPast, isFuture } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

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

function valueFromColumnPath(obj, path) {
    const pathArray = path.split('.');
    let value = obj;
    for (const key of pathArray) {
        if (value === null || value === undefined) {
            return ''; // O algún valor por defecto
        }
        value = value[key];
    }
    return value;
}

function customDateFormat({ date, type = "large" }) {
    const pattern = type.toLowerCase() === "large" ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd';
    const timeZone = 'UTC';

    const zonedDate = toZonedTime(new Date(date), timeZone);
    const outputDueDate = format(zonedDate, pattern, { timeZone });
    return outputDueDate;
}

const POINTS_MAP = {
    "ZERO": 0,
    "ONE": 1,
    "TWO": 2,
    "FOUR": 4,
    "EIGHT": 8
};

export { evaluateDate, searchData, valueFromColumnPath, customDateFormat, POINTS_MAP, };