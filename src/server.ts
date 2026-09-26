import express from 'express';

const PORT = process.env.PORT;

type Product = {
    id: number;
    name: string;
    price: number;
};

let products : Record<number, Product> = {
    1 : { id: 1, name: "Book", price: 5000 },
    2 : { id: 2, name: "Laptop", price: 25000 },
    3 : { id: 3, name: "TV", price: 20000}
}

function main() {
    const app = express();

    app.get("/", (_, res) => {
        res.json({
            info   : `Express listening on port ${PORT}`,
            status : "ok"
        })
    })

    app.get("/health", (_, res) => {
        res.json({
            status  : "ok",
            service : "backend-api"
        })
    })

    app.get("/api/products", (_, res) => {
        res.json({
            status   : "ok",
            products : products
        })
    })

    app.get("/api/products/:id", (req, res) => {
        const id : number = Number(req.params.id);
        const product : Product|undefined = products[id];
        if (product == undefined) {
            res.json({
                status : "product not found"
            })
        } else {
            res.json({
                status   : "ok",
                product  : product
            })
        }
    })

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}

main()
