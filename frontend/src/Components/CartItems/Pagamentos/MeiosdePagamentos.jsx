import React from 'react';

const MeiosdePagamentos = {
  pix: {
    nome: 'PIX (5% de desconto)',
    valor: 0.95, 
  },
  debit_card: {
    nome: 'Cartão de Débito (sem desconto)',
    valor: 1, 
  },
  credit_card_installments: {
    nome: 'Cartão de Crédito Parcelado(5x com 10% de juros)',
    valor: 1.1, 
  },
};

export default MeiosdePagamentos;
