

import MeiosdePagamentos from './MeiosdePagamentos';

export function calcularTotalComDesconto(total, metodoPagamento) {
  const pagamentoSelecionado = MeiosdePagamentos[metodoPagamento];
  if (pagamentoSelecionado) {
    let valorTotal = total * pagamentoSelecionado.valor;
    
    if (metodoPagamento === 'credit_card_installments') {
      valorTotal = valorTotal / 5; 
    }
    return Number(valorTotal.toFixed(2)); 
  } else {
    return Number(total.toFixed(2));
  }
}
