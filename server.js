const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/keytest", async (req, res) => {
  const domain = req.query.domain;
  const key = req.query.key;
  const token = req.query.token;
  try {
    const apiResponse = await fetch(
      "https://" +
        domain +
        ".vtexcommercestable.com.br/api/oms/pvt/orders/?page=1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-VTEX-API-AppKey": key,
          "X-VTEX-API-AppToken": token,
        },
      }
    );
    if (apiResponse.status == "200")
      res.send({ express: "Chave válida! (200)" });
    else if (apiResponse.status == "401")
      res.send({ express: "Acesso negado! (401)" });
    else
      res.send({express: "Ops! Algo deu errado... Por favor confira se a chave foi preenchida corretamente. (" + apiResponse.status + ")"});
  } catch (err) {
    console.log(err);
    res.status(500).send({ express: "Ops! Algo deu errado... Por favor confira se a chave foi preenchida corretamente. (500)" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
