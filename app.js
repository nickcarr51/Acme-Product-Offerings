const app = document.querySelector('#app');

const createNode = (type, className) => {
    let newNode = document.createElement(type);
    if (className) {
        newNode.classList.add(className);
    }
    return newNode;
}

const append = (parent, child) => {
    parent.appendChild(child);
}

let fetchedInformation = [];

const fetchData = () => {
    const products = fetch(`https://acme-users-api-rev.herokuapp.com/api/products`);
    const offerings = fetch(`https://acme-users-api-rev.herokuapp.com/api/offerings`);
    const companies = fetch(`https://acme-users-api-rev.herokuapp.com/api/companies`);

    const allResponses = Promise.all([products, offerings, companies]);

    return allResponses
        .then(response => {
            const productResponse = response[0];
            const offeringResponse = response[1];
            const companyResponse = response[2];

            return Promise.all([productResponse.json(), offeringResponse.json(), companyResponse.json()])
        })
        .then(data => {
            const productJSON = data[0];
            const offeringJSON = data[1];
            const companyJSON = data[2];
            // console.log([productJSON, offeringJSON, companyJSON])
            render();
            return [productJSON, offeringJSON, companyJSON];
        })
}


// fetchData()
//     .then(arr => fetchedInformation.push(arr));



const createHeader = () => {
    const headerContainer = createNode('div', 'headerContainer');

    const header = createNode('h1', 'header');
    header.innerHTML = 'Acme Product Offerings';

    append(headerContainer, header);
    return headerContainer;
}

const createBody = () => {
    const bodyDiv = createNode('div', 'bodyDiv');
    bodyDiv.id = 'bodyDiv';
    return bodyDiv;
}

// const createProductCards = () => {
//     console.log(fetchedInformation);
// }

const render = () => {
    app.innerHTML = '';
    append(app, createHeader());
    append(app, createBody());
    // createProductCards();
    // console.log(fetchData());
    // fetchData();
    // console.log(fetchedInformation)
}
fetchData();
// render();