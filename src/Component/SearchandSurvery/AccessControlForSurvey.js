export const surveyAccessControl = {
    Region: {
        region: 1,
        circle: 1,
        division: 1,
        subDivision: 1,
    },
    Circle:{
        region: 0,
        circle: 1,
        division: 1,
        subDivision: 1,
    },
    Division:{
        region: 0,
        circle: 0,
        division: 1,
        subDivision: 1,
    },
    SubDivision:{
        region: 0,
        circle: 0,
        division: 0,
        subDivision: 1,
    }

};
