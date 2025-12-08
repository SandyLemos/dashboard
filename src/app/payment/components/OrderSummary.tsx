// app/payment/components/OrderSummary.tsx
import React from 'react';
import Image from "next/image"

const EVENT_IMAGE_PATH = "/imagemEvento.png" 

const OrderSummary: React.FC = () => {
  const GRADIENT_BORDER_CLASS =
    "p-[2px] bg-gradient-to-r from-[#4D53EA] to-[#CE00AD] rounded-x1"
  const SUMMARY_BAR_CLASS =
    "bg-[#058BD3] text-white py-1 px-4 font-semibold text-lg rounded-t-lg rounded-b-none"
  const LOCATION_COLOR = "text-[#838383]"

  return (
    <div className="top-20 w-full">
      {/* ---------------------------------------------------- */}
      {/* 1. Ticket do Evento (Topo) */}
      {/* ---------------------------------------------------- */}
      <div
        className={`mb-4 rounded-xl shadow-lg bg-white ${GRADIENT_BORDER_CLASS} relative`}
      >
        {/* Content Wrapper */}
        <div className="bg-white rounded-[10px] p-4 flex items-start space-x-3">
          {/* Imagem do Evento */}
          <div className="flex-shrink-0 relative w-38 h-49 rounded-lg overflow-hidden">
            {/* 3. Colocando a imagem e ajustando o tamanho */}

            <Image
              src={EVENT_IMAGE_PATH} // <--- AQUI!
              alt="Poster do Evento"
              width={154}
              height={127}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          <div className="flex-grow">
            {/* Título */}
            <h4 className="text-base font-bold text-gray-900 leading-tight">
              RAPHAEL GHANEM - SE É QUE VOCÊ ME ENTENDE!
            </h4>

            {/* Local (com ícone Marker) */}
            <p className={`text-xs mt-1 flex items-center ${LOCATION_COLOR}`}>
              {/* Ícone Marker (Simulação W/H 12) */}
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              I. Burly Minascentro
            </p>

            {/* Tag */}
            <span className="mt-2 inline-block rounded-full bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-700">
              Stand Up Comedy
            </span>
          </div>
        </div>
      </div>

      <div
        className={`rounded-xl bg-white shadow-lg ${GRADIENT_BORDER_CLASS} p-[2px]`}
      >
        <div className="bg-white rounded-[10px] p-0">
          {/* Faixa de Título Resumo do Pedido (ajustando o formato) */}
          <h3 className={SUMMARY_BAR_CLASS}>Resumo do Pedido</h3>

          <div className="mt-4 space-y-2 px-4 pb-4">
            {/* Detalhes do Ingresso */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Quinta, 27 de Nov - 22:00</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Ingresso</span>
              <span className="font-medium text-gray-900">Entrada geral</span>
            </div>

            {/* Total (ajustado para R$ 10,00 na mesma linha) */}
            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <span className="text-gray-600">R$ 10,00</span>
            </div>

            {/* Linha Gradiente no final (simulando a barra inferior do design) */}
            <div className="w-full h-1 bg-gradient-to-r from-[#4D53EA] to-[#CE00AD] rounded-full mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary