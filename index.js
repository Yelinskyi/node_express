const express =  require ('express');
const dotenv = require('dotenv');
const app = express();
const data = require('./mockData.json');

dotenv.config();

const PORT = process.env.PORT;

app.get('/', (req, resp)=>{
  resp.send('Hello');
})

// query parms
app.get('/api/products/', (req, resp)=>{
  const { id, name } = req.query;
  let products = data;
  console.log(id, name)

  if(id && !name){
    products  = data.filter(product=>{
      return product.id == id;
    });
  } else if (!id && name){
    products  = data.filter(product=>{
      return product.name == name;
    });
  } else if (id && name){
    products = data.filter(product=>{
      return product.id == id && product.name == name;
    });
  }
  
  resp.send(products);
});

// route parms
app.get('/api/products', (req, resp)=>{
  resp.send(data);
});

app.get('/api/products/:id/:name', (req, resp)=>{
  const { id } = req.params;
  const { name } = req.params;
  const prooduct  = data.find(product=>{
    return product.id == id && product.name == name;
  });
  if (!prooduct){
    resp.status(404).send('Not FOund');
    return;
  }
  resp.send(prooduct);
});

app.get('/api/products', (req, resp)=>{
  resp.send(data);
});

app.get('*', (req, resp)=>{
  resp.status(404)
      .send(
        '<html><body><p>Sorry Page Not Found. <a href="/">Home</a></p></body></html>'
      )
});

app.listen(PORT, ()=>{
  console.log(`server starter on port ${PORT}`);
});
