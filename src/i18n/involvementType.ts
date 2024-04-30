import { InvolvementType } from "@/models/InvolvementModel";
import i18n from ".";

const involvementTypeEn = [
    { title: "Studied At", value: InvolvementType.STUDIED_AT },
    { title: "Completed Course At", value: InvolvementType.COMPLETED_COURSE_AT },
    { title: "Postdoc At", value: InvolvementType.POSTDOC_AT },
    { title: "Member Of", value: InvolvementType.MEMBER_OF },
    { title: "Employed At", value: InvolvementType.EMPLOYED_AT },
    { title: "Hired By", value: InvolvementType.HIRED_BY },
];

const involvementTypeSr = [
    { title: "Studije", value: InvolvementType.STUDIED_AT },
    { title: "Kompletiran kurs", value: InvolvementType.COMPLETED_COURSE_AT },
    { title: "Post-doktorske studije", value: InvolvementType.POSTDOC_AT },
    { title: "Članstvo", value: InvolvementType.MEMBER_OF },
    { title: "Zaposlenje", value: InvolvementType.EMPLOYED_AT },
    { title: "Angažovanje", value: InvolvementType.HIRED_BY },
];

export const getTitleFromValue = (value: InvolvementType, resourceTypeArray: {title: string, value: InvolvementType}[]) => {
    return (resourceTypeArray.find(item => item.value === value.toString()) || {}).title;
};

export const getInvolvementTypeTitleFromValueAutoLocale = (value: InvolvementType) => {
    const locale = i18n.vueI18n.global.locale;

    let resourceTypeArray = involvementTypeEn;
    if (locale == "sr") {
        resourceTypeArray = involvementTypeSr;
    }

    return (resourceTypeArray.find(item => item.value === value) || {}).title;
};

export const getInvolvementTypesForGivenLocale = () => {
    switch(i18n.vueI18n.global.locale) {
        case "sr":
            return involvementTypeSr;
        case "en":
            return involvementTypeEn;
    }
}

export const getSimilarInvolvementTypes = (type: InvolvementType) => {
    let resourceTypeArray;
    switch(i18n.vueI18n.global.locale) {
        case "sr":
            resourceTypeArray = involvementTypeSr;
            break;
        case "en":
            resourceTypeArray = involvementTypeEn;
            break;
    }

    if(type == InvolvementType.MEMBER_OF) {
        return resourceTypeArray?.filter(involvementType => involvementType.value === InvolvementType.MEMBER_OF);
    } 
    else if(type == InvolvementType.HIRED_BY ||
            type == InvolvementType.EMPLOYED_AT) {
        return resourceTypeArray?.filter(involvementType => involvementType.value === InvolvementType.HIRED_BY || involvementType.value === InvolvementType.EMPLOYED_AT);
    } 
    else if(type == InvolvementType.STUDIED_AT ||
            type == InvolvementType.POSTDOC_AT ||
            type == InvolvementType.COMPLETED_COURSE_AT) {
        return resourceTypeArray?.filter(involvementType => involvementType.value === InvolvementType.STUDIED_AT || involvementType.value === InvolvementType.POSTDOC_AT || involvementType.value === InvolvementType.COMPLETED_COURSE_AT);
    }
}
