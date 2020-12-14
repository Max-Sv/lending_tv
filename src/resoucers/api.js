const API = 'https://api.tvplus.by/api/admin/v2/profiles/services/'
const API_SMS = 'https://api.tvplus.by/api/admin/v2/notifications/smssend/'



export const apiCheckNumber = async (number) => {
    const response = await fetch(`https://api.tvplus.by/api/admin/v2/profiles/services/?username=${number}`, {
        method: 'GET',
        headers: {
            Authorization: "Basic bGFuZGluZ190dnA6ayFvbVcyeWJ5UHFDZw=="
        }
    })
    return await response.json();
}
export const apiActiveServiceAmediateka = async (number) => {
    const data = {
        "external_name": "S_TVPLUS_AMEDIATEKA_MONTHLY", 
        "action": "add"
    }
    const response = await fetch(`https://api.tvplus.by/api/admin/v2/profiles/services/?username=${number}`, {
        method: 'POST',
        headers: {
            Authorization: "Basic bGFuZGluZ190dnA6ayFvbVcyeWJ5UHFDZw==",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        
    })
    return await response.json();
}
export const apiSendCodeBySms = async (number, code) => {
    // const data = {
    //     "external_name": number, 
    //     "action": code
    // }
    // const response = await fetch(API_SMS, {
    //     method: 'POST',
    //     headers: {
    //         Authorization: "Basic bGFuZGluZ190dnA6ayFvbVcyeWJ5UHFDZw==",
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
        
    // })
    // return await response.json();
    return new Promise(res => {
        setTimeout(() => {
            res('dfas')
        }, 2000);
    })
}
export const apiVerifyCode = async (number, code) => {
    // const data = {
    //     "external_name": number, 
    //     "action": code
    // }
    // const response = await fetch(API_SMS, {
    //     method: 'POST',
    //     headers: {
    //         Authorization: "Basic bGFuZGluZ190dnA6ayFvbVcyeWJ5UHFDZw==",
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
        
    // })
    // return await response.json();
    return new Promise(res => {
        setTimeout(() => {
            res(0)
        }, 2000);
    })
}
