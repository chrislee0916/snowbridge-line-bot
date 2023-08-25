import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const pcl = require('postchain-client')

@Injectable()
export class PostchainSdkService {
    node_api_url: string = 'http://203.145.222.91:7740';
    blockchainRID: string = '867B7599447025CBFBA7D733B1E4393315826B6F5634A90CE357F2276F188BA2';
    rest = pcl.restClient.createRestClient(this.node_api_url, this.blockchainRID, 5);
    gtx = pcl.gtxClient.createClient(this.rest, Buffer.from(this.blockchainRID, 'hex'),  []);
    keyObj: any = {}

    constructor(
        private readonly configService: ConfigService
    ){
        const privateKey: string = this.configService.get('POSTCHAIN_PRIVATE_KEY');
        const publicKey: string = this.configService.get('POSTCHAIN_PUBLIC_KEY');
        this.keyObj.privKey = Buffer.from(privateKey, 'hex');
        this.keyObj.pubKey = Buffer.from(publicKey, 'hex');
    }

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
    async createSignIn(keyObj, userId: string, name: string, phone: string, createAt: number): Promise<unknown> {
        return new Promise((resolve, reject) => {
            const request = this.gtx.newTransaction([keyObj.pubKey]);
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

    async getSignInList(userId: string, name: string, phone: string, limit: number, skip: number, sort: number): Promise<unknown> {
        return new Promise((resolve, reject) => {
            this.gtx.query('getSignInList', {
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
    async uploadTemplate(keyObj, pdfContant: string, createAt: number) {
        return new Promise((resolve, reject) => {
            const request = this.gtx.newTransaction([keyObj.pubKey]);
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
    async getTemplate() {
        return new Promise((resolve, reject) => {
            this.gtx.query('getTemplate', {

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
    async createSignature(keyObj, userId: string, pdfContant: string, createAt: number): Promise<unknown> {
        return new Promise((resolve, reject) => {
            const request = this.gtx.newTransaction([keyObj.pubKey]);
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
    async getSignatureList(userId: string, name: string, phone: string, limit: number, skip: number, sort: number): Promise<unknown> {
        return new Promise((resolve, reject) => {
            this.gtx.query('getSignatureList', {
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
}
