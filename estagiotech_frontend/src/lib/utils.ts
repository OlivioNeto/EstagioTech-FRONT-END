import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// String somente number
export const numbersOnly = (value: string | undefined | null): string => {
  if (typeof value === "string") {
    return value.replace(/[^0-9]/g, "");
  }
  return "";
};

/**
 * Aplicar Mascara CPF
 */
export function cpfApplyMask(value: string) {
  return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

/**
 * Aplicar Máscara CNPJ
 */
export function cnpjApplyMask(value: string) {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

/**
 * Aplicar Máscara de CEP
 */
export function cepApplyMask(value: string) {
  const cep = numbersOnly(value);
  return cep.replace(/^(\d{2})(\d{3})(\d{3})$/, "$1.$2-$3");
}

/**
 * Aplicar mascara Telefone
 */
export function phoneApplyMask(values: string) {
  const phone = numbersOnly(values);
  return phone.replace(/(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
}

/**
 * Validar se o cpf é válido
 */
export function validarCPF(cpf: string): boolean {
  // Remover caracteres não numéricos
  cpf = cpf.replace(/\D/g, "");

  // Verificar se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calcular o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

  // Verificar se o primeiro dígito verificador está correto
  if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
    return false;
  }

  // Calcular o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

  // Verificar se o segundo dígito verificador está correto
  if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
    return false;
  }

  // CPF válido
  return true;
}
