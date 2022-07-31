const db = require('../../../config/dbConnection')
const { currencyConverter } = require('./services')

async function getAllUser(req) {
    try {
        let { currency = '', limit = 10, skip = '0', mostViewd } = req.query
        let q = ` SELECT * FROM product LIMIT ${limit} OFFSET ${skip} ;`
        if (mostViewd == 'true')
            q = `SELECT * FROM product WHERE (productViewed > 0)    
             ORDER By productViewed DESC LIMIT ${limit} OFFSET ${skip} `

        const [res] = await db.promise().query(q)
        const [[{ toalRecords = 0 }]] = await db.promise().query('SELECT COUNT(id) as toalRecords FROM test.product ;')
        const result = await Promise.all(res.map(async (e) => {
            const crn = await currencyConverter({ from: 'INR', to: currency, price: e.price })
            return { ...e, price: crn }
        }))
        return { result, toalRecords }
    } catch (error) {
        console.log('getAllUser', error);
        return { result: [], toalRecords: [] }
    }

}

async function getById(req) {
    try {
        const { id, currency = '', } = req.query
        await db.promise().query(`UPDATE product SET productViewed = productViewed +1 WHERE (id = ${id})`)
        const [result] = await db.promise().query(` SELECT * FROM product WHERE(id = ${id}); `)
        const crn = await currencyConverter({ from: 'INR', to: currency, price: result[0].price })
        return result.map(e => ({ ...e, price: crn }))
    } catch (error) {
        console.log('getById', error);
        return [{}]
    }
}


exports.getUsers = async (req, res) => {
    if (req.query.id) {
        return getById(req)
    }
    return getAllUser(req)

}


