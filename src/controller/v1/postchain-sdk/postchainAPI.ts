const pcl = require('postchain-client')


/* Postchain connetion setting */
const node_api_url = 'http://203.145.222.91:7740'
const blockchainRID = '867B7599447025CBFBA7D733B1E4393315826B6F5634A90CE357F2276F188BA2'
const rest = pcl.restClient.createRestClient(node_api_url, blockchainRID, 5)
const gtx = pcl.gtxClient.createClient(rest, Buffer.from(blockchainRID, 'hex'), [])

function hashCode(PID) {
    console.log('PID: ', pcl.util.hash256(PID).toString('hex'));
};

// 寫區塊鏈必需要成對的 privKey 和 pubKey
/* 產生 橢圓曲線 key */
export function ganerateECDSAKey() {
    const makeKey = pcl.util.makeKeyPair();
    const privKey = makeKey.privKey;
    const pubKey = makeKey.pubKey;
    const ACCOUNT_TYPE_SIMPLE = 1;
    const adesc = pcl.gtx.encodeValue([ACCOUNT_TYPE_SIMPLE, blockchainRID, pubKey]);
    const aid = pcl.util.sha256(adesc);
    const keyObj = {
        privKey: privKey,
        pubKey: pubKey,
        adesc: adesc,
        aid: aid
    };
    console.log('keyObj: ', keyObj)

    console.log('privKey: ', keyObj.privKey.toString('hex'));
    console.log('pubKey: ', keyObj.pubKey.toString('hex'));
    console.log('adesc: ', keyObj.adesc.toString('hex'));
    console.log('aid: ', keyObj.aid.toString('hex'));
    return keyObj;
};

/* Operation API */
/** 建立簽到
 * userId: string
 * name: string
 * phone: string
 * createAt: number
 *
 * 200 code return Body: {status: 'confirmed'}
 * 400 code return Body: {status: 'rejected' } // 已簽到
 */
export async function createSignIn(keyObj, userId, name, phone, createAt) {
    return new Promise((resolve, reject) => {
        const request = gtx.newTransaction([keyObj.pubKey]);
        request.addOperation('createSignIn', userId, name, phone, createAt);
        request.sign(keyObj.privKey, keyObj.pubKey);
        request.postAndWaitConfirmation().then((value) => {
            return resolve({
                status: 'confirmed',
                value: value,
                userId: userId,
                name: name,
                phone: phone,
                createAt: createAt,
            });
        }).catch((err) => {
            return reject({
                status: 'rejected',
                err: err,
            });
        });
    });
};


/** 取得簽到列表
 * request:
 ** userId: string
 ** name: string
 ** phone: string
 ** limit: number
 ** skip: number
 ** sort: number
 *
 * 200 code return Body: [{
 *  userId: string
 *  name: string
 *  phone: string
 *  blockHeight: number
 *  txId: string
 *  createAt: number
 * }]
 * */
export async function getSignInList(userId, name, phone, limit, skip, sort) {
    return new Promise((resolve, reject) => {
        gtx.query('getSignInList', {
            userId: userId,
            name: name,
            phone: phone,
            limitNumber: limit,
            skipNumber: skip,
            sortNumber: sort
        }).then((value) => {
            console.log('value ', value)
            return resolve(value)
        }).catch((err) => {
            console.log('err ', err)
            return reject(err)
        });
    });
}

/** 寫入模板
 * request:
 ** pdfContant: string
 ** createAt: number
 *
 * 200 code return Body: {status: 'confirmed'}
 */
export async function uploadTemplate(keyObj, pdfContant, createAt) {
    return new Promise((resolve, reject) => {
        const request = gtx.newTransaction([keyObj.pubKey]);
        request.addOperation('uploadTemplate', pdfContant, createAt);
        request.sign(keyObj.privKey, keyObj.pubKey);
        request.postAndWaitConfirmation().then((value) => {
            return resolve({
                status: 'confirmed',
                value: value,
                pdfContant: pdfContant,
                createAt: createAt,
            });
        }).catch((err) => {
            return reject({
                status: 'rejected',
                err: err,
            });
        });
    });
};

/** 取得模板
 * request:
 *
 * 200 code return Body: {
 *  contant: string
 *  createAt: number
 *  blockHeight: number
 *  txId: string
 * }
 */
export async function getTemplate() {
    console.log('rest: ', rest)
    console.log('gtx: ', gtx)
    return new Promise((resolve, reject) => {
        gtx.query('getTemplate', {

        }).then((value) => {
            console.log('value ', value)
            return resolve(value)
        }).catch((err) => {
            console.log('err ', err)
            return reject(err)
        });
    });
}


/** 建立簽名
 * request:
 ** userId: string
 ** pdfContant: string
 ** createAt: number
 *
 * 200 code return Body: {status: 'confirmed'}
 * 400 code return Body: {status: 'rejected'} // 沒有簽到紀錄
 *  */
export async function createSignature(keyObj, userId, pdfContant, createAt) {
    return new Promise((resolve, reject) => {
        const request = gtx.newTransaction([keyObj.pubKey]);
        request.addOperation('createSignature', userId, pdfContant, createAt);
        request.sign(keyObj.privKey, keyObj.pubKey);
        request.postAndWaitConfirmation().then((value) => {
            return resolve({
                status: 'confirmed',
                value: value,
                userId: userId,
                pdfContant: pdfContant,
                createAt: createAt,
            });
        }).catch((err) => {
            return reject({
                status: 'rejected',
                err: err
            });
        });
    });
};

/** 取得簽名列表
 * request:
 ** userId: string
 ** name: string
 ** phone: string
 ** limit: number
 ** skip: number
 ** sort: number
 *
 * 200 code return Body: {
 *  userId: string
 *  pdfContant: string
 *  blockHeight: number
 *  txId: string
 *  createAt: number
 * }
 **/
export async function getSignatureList(userId, name, phone, limit, skip, sort) {
    return new Promise((resolve, reject) => {
        gtx.query('getSignatureList', {
            userId: userId,
            name: name,
            phone: phone,
            limitNumber: limit,
            skipNumber: skip,
            sortNumber: sort
        }).then((value) => {
            console.log('value ', value)
            return resolve(value)
        }).catch((err) => {
            console.log('err ', err)
            return reject(err)
        });
    });
}



module.exports = {
    ganerateECDSAKey: ganerateECDSAKey,
    createSignIn: createSignIn,
    getSignInList: getSignInList,
    uploadTemplate: uploadTemplate,
    getTemplate: getTemplate,
    createSignature: createSignature,
    getSignatureList: getSignatureList,
    pcl: pcl
};