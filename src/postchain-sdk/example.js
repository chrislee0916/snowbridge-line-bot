const chainAPI = require('./postchainAPI')

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    };
    return result;
};

/* main() */
async function runTest() {
    const keyObj = await chainAPI.ganerateECDSAKey();
    console.log('keyObj: ', keyObj)
    // let userId = 'U892d4b4fee0599d92a0f74e2cf440ead';
    let userId = generateRandomString(33);
    console.log('userId: ', userId);

    let name = 'Andrew';
    let phone = '0988888888';
    let now = new Date();
    let createAt = now.getTime();
    let limitNumber = 0;
    let skipNumber = 0;
    let sortNumber = 0;
    let pdfContant = 'data:image/png;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4SuORXhpZgAASUkqAAgAAAAMAA8BAgAJAAAAngAAABABAgAQAAAAqAAAABIBAwABAAAAAQAAA';

    // 簽到
    await chainAPI.createSignIn(keyObj, userId, name, phone, createAt);
    const signInList = await chainAPI.getSignInList(userId, name, phone, limitNumber, skipNumber, sortNumber);
    console.log('signInList: ', signInList);

    // pdf 模板
    await chainAPI.uploadTemplate(keyObj, pdfContant, createAt);
    const pdfObj = await chainAPI.getTemplate();
    console.log('pdfObj: ', pdfObj);

    // 簽名
    await chainAPI.createSignature(keyObj, userId, pdfContant, createAt);

    userId = '';
    name = '';
    phone = '';
    limit = 0;
    skip = 0;
    sort = -1;
    const signatureList = await chainAPI.getSignatureList(userId, name, phone, limit, skip, sort);
    console.log('signatureList: ', signatureList);
}

runTest()