export function dates() {
    const today = new Date();
    return Array.from({ length: 12 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return date;
    });
}

export function createGraphPoints(length: number = 9, minValue: number = 0, maxValue: number = 200): { value: number; }[] {
    return Array.from({ length }, () => ({
        value: Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
    }));
};

export interface ITimeframes {
    label: string,
    data: { value: number; }[],
    
  }
export const heuteData = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }, { value: 100 }, { value: 80 }, { value: 90 }, { value: 70 }, { value: 100 },]
export const threeTdata = [{ value: 10 }, { value: 100 }, { value: 90 }, { value: 70 }, { value: 100 }, { value: 50 }, { value: 90 }, { value: 70 }, { value: 100 },]
export const oneWdata = [{ value: 20 }, { value: 30 }, { value: 90 }, { value: 70 }, { value: 100 }, { value: 60 }, { value: 90 }, { value: 70 }, { value: 100 },]
export const oneMData = [{ value: 40 }, { value: 60 }, { value: 90 }, { value: 70 }, { value: 100 }, { value: 100 }, { value: 90 }, { value: 70 }, { value: 100 },]
export const allData = [{ value: 30 }, { value: 50 }, { value: 90 }, { value: 70 }, { value: 100 }, { value: 20 }, { value: 90 }, { value: 70 }, { value: 100 },]
export const timeframes = [{ label: 'Heute', data: heuteData }, { label: '3 T', data: threeTdata }, { label: '1 W', data: oneWdata }, { label: '1 M', data: oneMData }, { label: 'ALL', data: allData }] as ITimeframes[];

export const breakdown = [
    'Nahrungsmittel 2000€',
    'Umsatz der meist verkauften Produkte',
    'Gemüse',
    '670,89 €',
    'Brot',
    '560,67 €',
    'Süßigkeiten',
    '497,89 €',
    'Milch',
    '270,55 €'

];