import React from 'react';
import { useEffect, useState } from 'react';

const QUERY = `
PREFIX : <http://data-iremus.huma-num.fr/id/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX hemef: <http://data-iremus.huma-num.fr/ns/hemef#>
PREFIX schema: <http://schema.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

SELECT
  ?cote_AN_registre
  ?date_de_naissance
  ?id
  ?nom
  ?prénom
WHERE {
  GRAPH <http://localhost:3030/iremus/data/hemef> {
    OPTIONAL { ?id rdf:type hemef:Eleve . }
    OPTIONAL { ?id hemef:cote_AN_registre ?cote_AN_registre . }
    OPTIONAL { ?id hemef:date_de_naissance ?date_de_naissance . }
    OPTIONAL { ?id hemef:nom ?nom . }
    OPTIONAL { ?id hemef:prenom ?prénom . }
  }
}
`;

function App() {
  const [data, setData] = useState([]);

  async function fetchData() {
    let res = await fetch('http://data-iremus.huma-num.fr/api/sparql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      body: `query=${encodeURIComponent(QUERY)}`,
    });

    res = await res.json();
    setData(res)
  }

  useEffect(() => {
    fetchData();
  });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default App;
