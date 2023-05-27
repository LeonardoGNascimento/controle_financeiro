export function formatarDinheiro(valor: number) {
  return Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}
