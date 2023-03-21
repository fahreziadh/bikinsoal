import {utils, writeFile } from 'xlsx';

export const exportToXLSX = (data, fileName) => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Data');
    writeFile(workbook, `${fileName}.xlsx`);
};