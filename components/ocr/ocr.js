// const request = require('request')
const AK = "oQAisqELmdywRfl665oClGF3"
const SK = "blZ6gRKBcLeCHmylgh1kMfO6LT8PPGbG"

function runOCRFn(imageData) {
    // const options = {
    //     'method': 'POST',
    //     'url': 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=' + await getAccessToken(),
    //     'headers': {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Accept': 'application/json'
    //     },
    //     form: {
    //             'detect_direction': 'false',
    //             'detect_language': 'false',
    //             'paragraph': 'false',
    //             'probability': 'false',
    //             'image': imageData
    //     }
    // };
    return new Promise(async (resolve, reject) => {
        wx.request({
            url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=' + await getAccessToken(),
            method: 'POST',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            data: {
                'detect_direction': 'false',
                'detect_language': 'false',
                'paragraph': 'false',
                'probability': 'false',
                'image': imageData
            },
            // header: {
            //   'content-type': 'application/json' // 默认值
            // },
            success(res) {
                console.log(res.data)
                resolve(res.data)
            },
            fail() {
                reject()
            }
        })
    })

    // request(options, function (error, response) {
    //     if (error) throw new Error(error);
    //     console.log(response.body);
    // });
}

/**
 * 使用 AK，SK 生成鉴权签名（Access Token）
 * @return string 鉴权签名信息（Access Token）
 */
function getAccessToken() {
    return new Promise((resolve, reject) => {
        wx.request({
            url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + AK + '&client_secret=' + SK,
            method: 'POST',
            // data: {
            //   x: '',
            //   y: ''
            // },
            // header: {
            //   'content-type': 'application/json' // 默认值
            // },
            success(res) {
                // console.log(res.data.access_token)
                resolve(res.data.access_token)
            },
            fail() {
                reject()
            }
        })

        // request(options, (error, response) => {
        //     if (error) { reject(error) }
        //     else { resolve(JSON.parse(response.body).access_token) }
        // })
    })
}
// main();

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        codeResult: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onScanCode() {
            wx.chooseMedia({
                count: 1,
                mediaType: ['image'],
                sourceType: ['album', 'camera'],
                maxDuration: 30,
                camera: 'back',
                success: async (res) => {
                    console.log(res)
                    console.log(res.tempFiles[0].tempFilePath)
                    console.log(res.tempFiles[0].size)

                    const tempFilePaths = res.tempFiles[0].tempFilePath
                    const fileManager = wx.getFileSystemManager();
                    const base64 = fileManager.readFileSync(tempFilePaths, 'base64');
                    console.log('=============================', base64);

                    runOCRFn(base64)
                }
            })


        },
        onCopyText() {
            wx.setClipboardData({
                data: this.data.codeResult,
                success: res => {
                    wx.getClipboardData({
                        success: res => {
                            wx.showToast({
                                title: '复制成功'
                            })
                        }
                    })
                }
            })
        }
    }
})