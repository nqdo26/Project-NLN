const data = [
    {
        type: 'pdf',
        color: 'red',
    },
    {
        type: 'docx',
        color: 'blue',
    },
    {
        type: 'doc',
        color: 'blue',
    },
    {
        type: 'xlsx',
        color: 'green',
    },
    {
        type: 'xls',
        color: 'green',
    },
    {
        type: 'pptx',
        color: 'orange',
    },
    {
        type: 'ppt',
        color: 'orange',
    },
];

export function getColorByFileType(fileType) {
    const item = data.find((d) => d.type === fileType);
    return item ? item.color : 'black';
}
