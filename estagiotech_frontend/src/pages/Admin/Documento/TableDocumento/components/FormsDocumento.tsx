import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "../../../../../service/api";

import { useState } from "react";


const FormsDocumento = () => {
  const [documento, setdocumento] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();


    await api.post("/Documento", documento, {headers: {"Content-Type": "application/json" }}).then((resp)=> {
        console.log(resp)
    }).catch((error) => console.log(error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ fontWeight: "600" }}>Descrição do Documento</label>
      <Input
        type="text"
        id="documento"
        placeholder="Descreva o documento"
        onChange={(e) => setdocumento(e.target.value)}
        value={descricaoDocumento}
      />
    <form onSubmit={handleSubmit}>
      <label style={{ fontWeight: "600" }}>Situação do Documento</label>
      <Input
        type="text"
        id="tipoDocumento"
        placeholder="Qual a situação do documento?"
        onChange={(e) => setdocumento(e.target.value)}
        value={situacaoDocumento}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <Button variant="outline">
          Cancelar
        </Button>
        <Button type="submit" style={{ backgroundColor: "#82B440" }}>
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default FormsDocumento;