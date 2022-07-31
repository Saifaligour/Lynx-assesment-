

const Axios = require('axios')
const { apikey } = require('../../../config/constant')

exports.currencyConverter = async ({ from = "", to = '', price = 0 }) => {
    try {
        if (to) {

            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: {
                    apikey
                }
            };

            const res = await Axios.get(`https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${price}`,
                requestOptions)
            return res?.data?.result ? `${res?.data?.result} ${to}` : price
        }
        return price
    } catch (error) {
        console.log('currencyConverter', error.response.data.message);
        return price
    }

}

