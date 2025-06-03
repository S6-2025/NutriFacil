import React, { useState } from "react";
import PlanSelector from "../components/PlanSelector";

export const Subscription: React.FC = () => {
  const [showPlanSelector, setShowPlanSelector] = useState(false);

  const currentPlan = "Pro";
  const paymentInfo = {
    nextBillingDate: "01/07/25",
    cardLast4: "1234",
  };

  return (
    <main className="super-container" id="super-container-plan">
      <div className="container-wrapper">
        <section className="current-plan-section">
          <h2 className="section-title">Plano Atual</h2>
          <p>
            Você está atualmente no plano{" "}
            <span className="pro">{currentPlan}</span>.
          </p>
        </section>

        <section className="payment-info-section">
          <h2 className="section-title">Informações de Pagamento</h2>
          <p>
            <span className="pro"> Próxima cobrança:</span>{" "}
            {paymentInfo.nextBillingDate}
          </p>
          <p>
            <span className="pro">Método de pagamento:</span> **** {" "}
            {paymentInfo.cardLast4}
          </p>
        </section>

        <div className="button-wrapper">
          <button
            className="change-plan-button"
            onClick={() => setShowPlanSelector(true)}
          >
            Alterar Plano
          </button>
        </div>

         <PlanSelector isOpen={showPlanSelector} onClose={() => setShowPlanSelector(false)} />
      </div>
    </main>
  );
};

export default Subscription;
