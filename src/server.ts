import express from 'express';

const PORT = process.env.PORT;
if(!PORT || Number.isNaN(Number(PORT))) {
    console.error("La variable de entorno PORT no está definida o no es válida");
    process.exit(1);
}

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

    app.get("/health_redis", async (_, res) => {
        const response = await fetch("http://redis:4000/health");
        const server2Data = await response.json();

        res.json({
            status  : server2Data.status,
            service : "redis"
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

        if(Number.isNaN(id)) {
            res.status(400).json({
                status : "invalid product id"
            })
            return;
        }

        const product : Product|undefined = products[id];
        if (product == undefined) {
            res.status(404).json({
                status : "product not found"
            })
        } else {
            res.json({
                status   : "ok",
                product  : product
            })
        }
    })

    app.use((_, res) => {
        res.status(404).json({ status: "not found" });
    });

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}

main()
