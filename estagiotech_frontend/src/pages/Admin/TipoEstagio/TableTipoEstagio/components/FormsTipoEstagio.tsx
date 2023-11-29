import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "../../../../../service/api";

import { useState } from "react";


const FormsTipoEstagio = () => {
  const [tipoEstagio, setTipoEstagio] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();


    await api.post("/TipoEstagio", tipoEstagio, {headers: {"Content-Type": "application/json" }}).then((resp)=> {
        console.log(resp)
    }).catch((error) => console.log(error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ fontWeight: "600" }}>Descrição Tipo Estágio</label>
      <Input
        type="text"
        id="tipoEstagio"
        placeholder="Descreva o tipo do estágio"
        onChange={(e) => setTipoEstagio(e.target.value)}
        value={tipoEstagio}
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

export default FormsTipoEstagio;