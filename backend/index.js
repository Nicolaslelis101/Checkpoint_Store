const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { DateTime } = require("luxon");

app.use(express.json());
app.use(cors());

// Conexão com o banco de dados MongoDB Atlas
mongoose.connect("mongodb+srv://617032:Nicolas2256@checkpointstore0.eo7uymt.mongodb.net/Checkpoint_Store", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const logSchema = new mongoose.Schema({
    user: String,
    action: String,
    timestamp: { type: Date, default: Date.now },
    ip: String,
    details: mongoose.Schema.Types.Mixed,
});

const Log = mongoose.model('Log', logSchema);

// Criação de API
app.get("/", (req, res) => {
    res.send("App Expresso está Rodando!");
});

// Engine de Armazenamento de Imagens
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage });

// Criando Ponto final para Upload de Imagens
app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`,
    });
});

// Esquema para Creating Products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    new_price: {
        type: String,
        required: true,
    },
    old_price: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        tag: req.body.tag,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Salvo!");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Criando API Para Produtos Deletados
app.post('/removeproduct', async (req, res) => {
    const product = await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    await new Log({ user: req.body.user, action: 'delete', ip: req.ip, details: product }).save();
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Criando API Para Buscar Todos os Produtos
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("Todos os Produtos Coletados!");
    res.send(products);
});

// Esquema Para Criar o Model de Usuario
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Criando Ponto final para registrar o Usuario
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Usuário com o mesmo email foi identificado!" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save();

    const data = {
        user: {
            id: user.id,
        },
    };

    const token = jwt.sign(data, 'secret_ecom');
    await new Log({ user: user.email, action: 'signup', ip: req.ip }).save();
    res.json({ success: true, token });
});

app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id,
                },
            };
            const token = jwt.sign(data, 'secret_ecom');
            await new Log({ user: user.email, action: 'login', ip: req.ip }).save();
            res.json({ success: true, token });
        } else {
            await new Log({ user: req.body.email, action: 'failed login', ip: req.ip, details: 'Incorrect password' }).save();
            res.json({ success: false, errors: "Senha Incorreta!" });
        }
    } else {
        await new Log({ user: req.body.email, action: 'failed login', ip: req.ip, details: 'Incorrect email' }).save();
        res.json({ success: false, errors: "Email Incorreto!" });
    }
});

// Criando um Ponto Final para Area de Nova Coleção
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newCollection);
});

app.get('/popular', async (req, res) => {
    let products = await Product.find({ category: "HARDWARE" });
    let popular_com_gamers = products.slice(0, 4);
    console.log("Popular com os Gamers fetched!");
    res.send(popular_com_gamers);
});

// Criando middleware para fetch usuario
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Por favor use tokens válidos para autenticação!" });
    }
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Por favor use tokens válidos para autenticação!" });
    }
};

// Criando Ponto Final para Adicionar Produtos em cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("added", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    const oldCartData = { ...userData.cartData };
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    await new Log({ user: req.user.id, action: 'add to cart', ip: req.ip, details: { itemId: req.body.itemId, oldCartData, newCartData: userData.cartData } }).save();
    res.send("Added");
});

// Criando Ponto Final para remover produto de cartData
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    const oldCartData = { ...userData.cartData };
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    await new Log({ user: req.user.id, action: 'remove from cart', ip: req.ip, details: { itemId: req.body.itemId, oldCartData, newCartData: userData.cartData } }).save();
    res.send("Removed");
});

// Criando Ponto Final para get do cartData
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("getCart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
});

// Relatórios
app.get('/report/loginsuccess', async (req, res) => {
    const logs = await Log.find({ action: 'login' });
    res.json(logs);
});

app.get('/report/loginfailures', async (req, res) => {
    const logs = await Log.find({ action: 'failed login' });
    res.json(logs);
});

app.get('/report/changes', async (req, res) => {
    const logs = await Log.find({ action: 'add to cart' });
    res.json(logs);
});

app.get('/report/deletions', async (req, res) => {
    const logs = await Log.find({ action: 'delete' });
    res.json(logs);
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Servidor Rodando na Porta: " + port);
    } else {
        console.log("Erro: " + error);
    }
});
