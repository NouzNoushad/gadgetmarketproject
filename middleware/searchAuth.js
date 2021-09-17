const Product = require('../models/Product');

const handleSearchOptions = (search, ...args) => {
    
    args.reduce((acc, curr) => {

        if (!acc.includes(curr)) {
                    
            acc.push(curr);
            return acc;

        } else {
            return acc;
        }

    }, search);

    return search;
}

const searchAuth = async (req, res, next) => {

     //dynamic search options
    let searchCategory = [];
    let searchCompany = [];
    let products = await Product.find();

    let categories = products.map(product => product.category);
    let companies = products.map(product => product.company);

    const category = handleSearchOptions(searchCategory, ...categories);
    const company = handleSearchOptions(searchCompany, ...companies);
   
    req.category = category;
    req.company = company;
    next();

}

module.exports = searchAuth;