import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const tipoDocumentoSchema = z.object({
    idTipoDocumento: z.number(),
    descricaoTipoDocumento: z.string(),
});

export type tipoDocumentoProps = z.infer<typeof tipoDocumentoSchema>;