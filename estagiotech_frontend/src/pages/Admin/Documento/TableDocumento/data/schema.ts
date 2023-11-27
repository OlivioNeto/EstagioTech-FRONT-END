import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const documentoSchema = z.object({
    documentoId: z.number(),
    descricaoDocumento: z.string(),
    situacaoDocumento: z.string(),
});

export type documentoProps = z.infer<typeof documentoSchema>;