import { withExpenses, withFree, withPdf, withProf, withProfRegion, withWord } from "./api"

export const profDetails = [
    {
        label: 'דוח מקצוע לפי אזורים',
        desc: withProfRegion,
        accessibilityLabel: 'prof'
        //Отчет подготовлен по профессии по региону
    },
    {
        label: 'דוח ערוך לפי מקצוע',
        desc: withProf,
        accessibilityLabel: 'prof'
        //Отчет подготовлен по профессии
    },
]

export const expDetails = [
    {
        label: 'דוח כולל עלויות',
        desc: withExpenses,
        accessibilityLabel: 'exp'
        //Отчет включает затраты
    },
    {
        label: 'דוח ללא עלויות',
        desc: withFree,
        accessibilityLabel: 'exp'
        //Отчет о бесплатной стоимости
    },
]

export const printDetails = [
    {
        label: 'PDF יצוא לקובץ',
        desc: withPdf,
        accessibilityLabel: 'print'
        //Отчет подготовлен по профессии по региону
    },
    {
        label: 'Word יצוא לקובץ',
        desc: withWord,
        accessibilityLabel: 'print'
        //Отчет подготовлен по профессии
    }
]