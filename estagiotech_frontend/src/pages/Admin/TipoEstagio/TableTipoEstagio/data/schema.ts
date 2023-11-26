import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const tipoEstagioSchema = z.object({
  tipoestagioid: z.number(),
  descricao: z.string(),
});

export type tipoEstagioProps = z.infer<typeof tipoEstagioSchema>;