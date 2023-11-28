import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "../../../../../service/api";

import { useState } from "react";


const FormsTipoDocumento = () => {
  const [descricaoTipoDocumento, setDescricaoTipoDocumento] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
        descricaoTipoDocumento
    };

    await api.post("/TipoDocumento", data).then((resp)=> {
        console.log(resp)
    }).catch((error) => console.log(error));

      console.log(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ fontWeight: "600" }}>Descrição Tipo Documento</label>
      <Input
        type="text"
        id="tipoDocumento"
        placeholder="Descrição Tipo Documento"
        onChange={(e) => setDescricaoTipoDocumento(e.target.value)}
        value={descricaoTipoDocumento}
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

export default FormsTipoDocumento;