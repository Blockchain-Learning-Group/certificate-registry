const { sendRequest } = require('../src/utils');


async function createClass(studentAddresses) {
    const res = await sendRequest('http://localhost:3000', 'createClass', 'POST', { studentAddresses });
    console.log(res);
}


const studentAddresses = [
    '0xad72A42A278881311929DCE42D328CD1a4568Ac3',
    '0xad72A42A278881311929DCE42D328CD1a4568Ac3',
    '0xad72A42A278881311929DCE42D328CD1a4568Ac3',
    '0xad72A42A278881311929DCE42D328CD1a4568Ac3',
    '0xad72A42A278881311929DCE42D328CD1a4568Ac3',
    '0xad72A42A278881311929DCE42D328CD1a4568Ac3',
    '0xad72A42A278881311929DCE42D328CD1a4568Ac3',
    '0xad72A42A278881311929DCE42D328CD1a4568Ac3',
    '0xad72A42A278881311929DCE42D328CD1a4568Ac3',
];

createClass(studentAddresses)